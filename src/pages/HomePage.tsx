import { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import { NewsService, type NewsArticle } from '../services/newsService';
import { TranslationService, type Language } from '../services/translationService';

interface HomePageProps {
  onSelectStory: (id: string) => void;
}

export default function HomePage({ onSelectStory }: HomePageProps) {
  const [stories, setStories] = useState<NewsArticle[]>([]);
  const [trendingStories, setTrendingStories] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTrending, setShowTrending] = useState(true);
  const [language, setLanguage] = useState<Language>(() => TranslationService.getLanguage());

  useEffect(() => {
    loadStories();
  }, []);

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

  const t = (key: keyof typeof TranslationService) => {
    return TranslationService.t(key as any);
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
    };
    return colors[topic] || '#6b7280';
  };

  const getSourceBadgeColor = (category: string) => {
    return category === 'establishment' ? '#e74c3c' : '#27ae60';
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return '#27ae60'; // Green - High confidence
    if (score >= 60) return '#f39c12'; // Orange - Medium confidence
    return '#e74c3c'; // Red - Low confidence
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
        <h2>{t('appTitle' as any)}</h2>
        <p>{t('appSubtitle' as any)}</p>
        <p className="sources-info">
          <strong>{t('establishmentSources' as any)}:</strong> {t('imeditv' as any)}, {t('publicBroadcaster' as any)} |{' '}
          <strong>{t('oppositionSources' as any)}:</strong> {t('mtavaritv' as any)}, {t('netgazeti' as any)},{' '}
          {t('formulatv' as any)}
        </p>
      </div>

      <div className="view-toggle">
        <button
          className={`toggle-btn ${showTrending ? 'active' : ''}`}
          onClick={() => setShowTrending(true)}
        >
          {t('trending' as any)}
        </button>
        <button
          className={`toggle-btn ${!showTrending ? 'active' : ''}`}
          onClick={() => setShowTrending(false)}
        >
          {t('allNews' as any)}
        </button>
      </div>

      {loading ? (
        <div className="loading">{t('loading' as any)}</div>
      ) : (
        <div className="stories-grid">
          {displayStories.map((story) => (
            <div
              key={story.id}
              className="story-card"
              onClick={() => onSelectStory(story.id)}
            >
              {story.imageUrl && (
                <div className="story-image">
                  <img src={story.imageUrl} alt={getHeadline(story)} />
                  {story.trending && <span className="trending-badge">{t('trending' as any)}</span>}
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
                    {story.confidenceScore !== undefined && (
                      <div className="confidence-score">
                        <div className="confidence-bar">
                          <div
                            className="confidence-fill"
                            style={{
                              width: `${story.confidenceScore}%`,
                              backgroundColor: getConfidenceColor(story.confidenceScore),
                            }}
                          />
                        </div>
                        <span
                          className="confidence-text"
                          style={{ color: getConfidenceColor(story.confidenceScore) }}
                        >
                          {story.confidenceScore}% {t('confidenceScore' as any)}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="view-comparison">{t('viewComparison' as any)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
