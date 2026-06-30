import { useState, useEffect } from 'react';
import '../styles/StoryDetailPage.css';
import { NewsService, type NewsArticle } from '../services/newsService';
import { TranslationService, type Language } from '../services/translationService';

interface StoryDetailPageProps {
  storyId: string;
  onBack: () => void;
}

export default function StoryDetailPage({ storyId, onBack }: StoryDetailPageProps) {
  const [story, setStory] = useState<NewsArticle | null>(null);
  const [relatedStories, setRelatedStories] = useState<NewsArticle[]>([]);
  const [activeTab, setActiveTab] = useState<'comparison' | 'analysis'>('comparison');
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>(() => TranslationService.getLanguage());

  useEffect(() => {
    loadStory();
    // Listen for language changes
    const handleStorageChange = () => {
      setLanguage(TranslationService.getLanguage());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [storyId]);

  const loadStory = async () => {
    setLoading(true);
    try {
      const allNews = await NewsService.fetchNews();
      const selectedStory = allNews.find((s) => s.id === storyId);

      if (selectedStory) {
        setStory(selectedStory);

        // Find related stories from the opposite perspective
        const related = allNews.filter(
          (s) =>
            s.topic === selectedStory.topic &&
            s.category !== selectedStory.category &&
            s.id !== selectedStory.id
        );
        setRelatedStories(related);
      }
    } catch (error) {
      console.error('Failed to load story:', error);
    } finally {
      setLoading(false);
    }
  };

  const t = (key: keyof typeof TranslationService) => {
    return TranslationService.t(key as any);
  };

  const getHeadline = (s: NewsArticle) => {
    return language === 'ka' ? s.headlineKa : s.headline;
  };

  const getSummary = (s: NewsArticle) => {
    return language === 'ka' ? s.summaryKa : s.summary;
  };

  const getSourceLabel = (category: string) => {
    return category === 'establishment' ? t('establishmentView' as any) : t('oppositionView' as any);
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return '#27ae60';
    if (score >= 60) return '#f39c12';
    return '#e74c3c';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ka' ? 'ka-GE' : 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="story-detail-page">
        <button className="back-button" onClick={onBack}>
          {t('back' as any)}
        </button>
        <div className="loading">{t('loading' as any)}</div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="story-detail-page">
        <button className="back-button" onClick={onBack}>
          {t('back' as any)}
        </button>
        <div className="error">{t('error' as any)}</div>
      </div>
    );
  }

  return (
    <div className="story-detail-page">
      <button className="back-button" onClick={onBack}>
        {t('back' as any)}
      </button>

      <div className="story-header">
        {story.imageUrl && <img src={story.imageUrl} alt={getHeadline(story)} className="story-hero-image" />}

        <div className="story-meta">
          <span className="source-label">{getSourceLabel(story.category)}</span>
          <span className="source-name">{story.source}</span>
          <span className="date">{formatDate(story.publishedAt)}</span>
          {story.originalUrl && (
            <a href={story.originalUrl} target="_blank" rel="noopener noreferrer" className="original-link">
              {t('readOriginal' as any)}
            </a>
          )}
        </div>

        <h1 className="story-title">{getHeadline(story)}</h1>

        {story.confidenceScore !== undefined && (
          <div className="confidence-section">
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{
                  width: `${story.confidenceScore}%`,
                  backgroundColor: getConfidenceColor(story.confidenceScore),
                }}
              />
            </div>
            <span className="confidence-label" style={{ color: getConfidenceColor(story.confidenceScore) }}>
              {story.confidenceScore}% {t('confidenceScore' as any)}
            </span>
          </div>
        )}
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          {t('perspectives' as any)}
        </button>
        <button
          className={`tab-button ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          {t('analysis' as any)}
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'comparison' && (
          <div className="comparison-view">
            <div className="perspective-card primary">
              <h3>{getSourceLabel(story.category)}</h3>
              <p className="source-name">{story.source}</p>
              <p className="summary">{getSummary(story)}</p>
              {story.originalUrl && (
                <a href={story.originalUrl} target="_blank" rel="noopener noreferrer" className="source-button">
                  {t('viewOnSource' as any)} →
                </a>
              )}
            </div>

            {relatedStories.length > 0 ? (
              <div className="perspective-card opposite">
                <h3>{getSourceLabel(relatedStories[0].category)}</h3>
                <p className="source-name">{relatedStories[0].source}</p>
                <p className="summary">{getSummary(relatedStories[0])}</p>
                {relatedStories[0].originalUrl && (
                  <a href={relatedStories[0].originalUrl} target="_blank" rel="noopener noreferrer" className="source-button">
                    {t('viewOnSource' as any)} →
                  </a>
                )}
              </div>
            ) : (
              <div className="perspective-card opposite empty">
                <p>{t('noOpposing' as any)}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="analysis-view">
            <div className="analysis-section">
              <h3>{t('biasAssessment' as any)}</h3>
              <p>
                {story.category === 'establishment'
                  ? language === 'ka'
                    ? 'ეს სტატია ხელისუფლების პერსპექტივიდან გამოქვეყნებული ახალი ამბია. გთხოვთ, შეადაროთ ოპოზიციის მხრიდან გამოქვეყნებულ ახალი ამბებს სრული სურათის მისაღებად.'
                    : 'This article is published from the establishment perspective. Please compare with opposition coverage for a complete picture.'
                  : language === 'ka'
                    ? 'ეს სტატია ოპოზიციის პერსპექტივიდან გამოქვეყნებული ახალი ამბია. გთხოვთ, შეადაროთ ხელისუფლების მხრიდან გამოქვეყნებულ ახალი ამბებს სრული სურათის მისაღებად.'
                    : 'This article is published from the opposition perspective. Please compare with establishment coverage for a complete picture.'}
              </p>
            </div>

            <div className="analysis-section">
              <h3>{t('howToVerify' as any)}</h3>
              <ul>
                <li>
                  {language === 'ka'
                    ? 'შეადაროთ სხვადსხვა წყაროებიდან გამოქვეყნებული ახალი ამბები'
                    : 'Compare news from multiple sources'}
                </li>
                <li>
                  {language === 'ka'
                    ? 'მოძებნეთ ფაქტობრივი მტკიცებულება და წყაროები'
                    : 'Look for factual evidence and sources'}
                </li>
                <li>
                  {language === 'ka'
                    ? 'გაითვალისწინეთ, თუ რა შეიძლება იყოს ჟურნალისტის მიკერძოება'
                    : 'Consider potential journalist bias'}
                </li>
                <li>
                  {language === 'ka'
                    ? 'გადამოწმეთ ინფორმაცია დამოუკიდებელი წყაროებით'
                    : 'Verify information with independent sources'}
                </li>
              </ul>
            </div>

            <div className="analysis-section">
              <h3>{t('comparisonInsight' as any)}</h3>
              <p>
                {relatedStories.length > 0
                  ? language === 'ka'
                    ? `ეს თემა დაფარულია როგორც ხელისუფლებისა, ასევე ოპოზიციის მხრიდან. თითოეული პერსპექტივა ხაზს უსვამს სხვადსხვა ასპექტებს. ზემოთ იხილეთ ორივე მხრის თვალსაზრისი.`
                    : `This topic is covered by both establishment and opposition sources. Each perspective highlights different aspects. See both viewpoints above.`
                  : language === 'ka'
                    ? 'ამ თემაზე ოპოზიციის მხრიდან გამოქვეყნებული ახალი ამბი ხელმისაწვდომი არ არის.'
                    : 'No opposing perspective is available for this topic yet.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
