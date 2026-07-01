import { useState, useEffect, useRef } from 'react';
import '../styles/HomePage.css';
import { NewsService, type NewsArticle } from '../services/newsService';
import { TranslationService, type Language, type TranslationKey } from '../services/translationService';
import { AiVerificationService } from '../services/aiVerificationService';

interface HomePageProps {
  onSelectStory: (id: string) => void;
}

export default function HomePage({ onSelectStory }: HomePageProps) {
  const [stories, setStories] = useState<NewsArticle[]>([]);
  const [trendingStories, setTrendingStories] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTrending, setShowTrending] = useState(true);
  const [language, setLanguage] = useState<Language>(() => TranslationService.getLanguage());
  const [aiConfidence, setAiConfidence] = useState<Record<string, number>>({});
  const [checkingConfidence, setCheckingConfidence] = useState<Record<string, boolean>>({});
  const preloadedStoryIds = useRef(new Set<string>());

  useEffect(() => {
    loadStories();
  }, []);

  useEffect(() => {
    if (stories.length === 0) return;

    const visibleStories = showTrending ? trendingStories : stories;
    preloadConfidence(visibleStories);
  }, [stories, trendingStories, showTrending]);

  const loadStories = async () => {
    setLoading(true);
    try {
      const news = await NewsService.fetchNews();
      const trending = await NewsService.getTrendingNews();
      setStories(news);
      setTrendingStories(trending);
    } catch (error) {
      console.error('Failed to load stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    TranslationService.setLanguage(lang);
  };

  const getRelatedStories = (story: NewsArticle) => {
    return stories
      .filter(
        (candidate) =>
          candidate.topic === story.topic &&
          candidate.category !== story.category &&
          candidate.id !== story.id
      )
      .slice(0, 3);
  };

  const preloadConfidence = async (visibleStories: NewsArticle[]) => {
    for (const story of visibleStories) {
      if (preloadedStoryIds.current.has(story.id)) continue;
      preloadedStoryIds.current.add(story.id);

      const relatedStories = getRelatedStories(story);
      const cached = AiVerificationService.getCachedVerification(story, relatedStories);
      if (cached) {
        setAiConfidence((current) => ({ ...current, [story.id]: cached.confidence }));
        continue;
      }

      setCheckingConfidence((current) => ({ ...current, [story.id]: true }));
      try {
        const result = await AiVerificationService.verifyStory(story, relatedStories);
        setAiConfidence((current) => ({ ...current, [story.id]: result.confidence }));
      } catch (error) {
        console.warn('AI confidence preload failed:', error);
      } finally {
        setCheckingConfidence((current) => ({ ...current, [story.id]: false }));
      }
    }
  };

  const t = (key: TranslationKey) => {
    return TranslationService.t(key);
  };

  const getTopicColor = (topic: string) => {
    const colors: { [key: string]: string } = {
      Economy: '#3b82f6',
      ეკონომიკა: '#3b82f6',
      Politics: '#ef4444',
      პოლიტიკა: '#ef4444',
      Healthcare: '#10b981',
      ჯანდაცვა: '#10b981',
      Education: '#f59e0b',
      განათლება: '#f59e0b',
      Infrastructure: '#8b5cf6',
      ინფრასტრუქტურა: '#8b5cf6',
      Technology: '#ec4899',
      ტექნოლოგია: '#ec4899',
      Democracy: '#0071e3',
      დემოკრატია: '#0071e3',
      'Foreign Policy': '#5856d6',
      'საგარეო პოლიტიკა': '#5856d6',
      Migration: '#af52de',
      მიგრაცია: '#af52de',
    };
    return colors[topic] || '#6b7280';
  };

  const getSourceBadgeColor = (category: string) => {
    return category === 'establishment' ? '#ff3b30' : '#34c759';
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return '#34c759';
    if (score >= 60) return '#ff9500';
    return '#ff3b30';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ka' ? 'ka-GE' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getHeadline = (story: NewsArticle) => {
    return language === 'ka' ? story.headlineKa : story.headline;
  };

  const getSummary = (story: NewsArticle) => {
    return language === 'ka' ? story.summaryKa : story.summary;
  };

  const getTopic = (story: NewsArticle) => {
    return language === 'ka' ? story.topicKa : story.topic;
  };

  const getDisplayConfidence = (story: NewsArticle) => {
    return aiConfidence[story.id];
  };

  const displayStories = showTrending ? trendingStories : stories;

  return (
    <div className="home-page">
      <div className="language-selector">
        <button
          className={`lang-btn ${language === 'en' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('en')}
        >
          English
        </button>
        <button
          className={`lang-btn ${language === 'ka' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('ka')}
        >
          ქართული
        </button>
      </div>

      <div className="hero-section">
        <h2>{t('appTitle')}</h2>
        <p>{t('appSubtitle')}</p>
        <p className="sources-info">
          <strong>{t('establishmentSources')}:</strong> {t('imeditv')}, {t('publicBroadcaster')} |{' '}
          <strong>{t('oppositionSources')}:</strong> {t('mtavaritv')}, {t('netgazeti')},{' '}
          {t('formulatv')}
        </p>
      </div>

      <div className="view-toggle">
        <button
          className={`toggle-btn ${showTrending ? 'active' : ''}`}
          onClick={() => setShowTrending(true)}
        >
          {t('trending')}
        </button>
        <button
          className={`toggle-btn ${!showTrending ? 'active' : ''}`}
          onClick={() => setShowTrending(false)}
        >
          {t('allNews')}
        </button>
      </div>

      {loading ? (
        <div className="loading">{t('loading')}</div>
      ) : (
        <div className="stories-grid">
          {displayStories.map((story) => {
            const displayConfidence = getDisplayConfidence(story);
            const isChecking = checkingConfidence[story.id] || displayConfidence === undefined;
            const confidenceText = isChecking
              ? language === 'ka'
                ? 'AI ამოწმებს...'
                : 'AI checking...'
              : `${displayConfidence}% ${t('confidenceScore')}`;

            return (
              <div
                key={story.id}
                className="story-card"
                onClick={() => onSelectStory(story.id)}
              >
                {story.imageUrl && (
                  <div className="story-image">
                    <img src={story.imageUrl} alt={getHeadline(story)} />
                    {story.trending && <span className="trending-badge">{t('trending')}</span>}
                  </div>
                )}

                <div className="story-content">
                  <div className="story-header">
                    <span
                      className="topic-badge"
                      style={{
                        backgroundColor: `${getTopicColor(getTopic(story))}20`,
                        color: getTopicColor(getTopic(story)),
                      }}
                    >
                      {getTopic(story)}
                    </span>
                    <span className="date">{formatDate(story.publishedAt)}</span>
                  </div>

                  <h3 className="story-headline">{getHeadline(story)}</h3>
                  <p className="story-summary">{getSummary(story)}</p>

                  <div className="story-footer">
                    <div className="story-meta">
                      <span
                        className="source-badge"
                        style={{
                          backgroundColor: `${getSourceBadgeColor(story.category)}20`,
                          color: getSourceBadgeColor(story.category),
                        }}
                      >
                        {story.source}
                      </span>
                      <div className="confidence-score">
                        <div className="confidence-bar">
                          <div
                            className="confidence-fill"
                            style={{
                              width: displayConfidence === undefined ? '100%' : `${displayConfidence}%`,
                              backgroundColor:
                                displayConfidence === undefined
                                  ? 'rgba(118, 118, 128, 0.28)'
                                  : getConfidenceColor(displayConfidence),
                            }}
                          />
                        </div>
                        <span
                          className="confidence-text"
                          style={{
                            color:
                              displayConfidence === undefined
                                ? '#8e8e93'
                                : getConfidenceColor(displayConfidence),
                          }}
                        >
                          {confidenceText}
                        </span>
                      </div>
                    </div>
                    <span className="view-comparison">{t('viewComparison')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
