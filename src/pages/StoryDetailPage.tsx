import { useState, useEffect } from 'react';
import '../styles/StoryDetailPage.css';
import { NewsService, type NewsArticle } from '../services/newsService';
import { TranslationService, type Language, type TranslationKey } from '../services/translationService';
import {
  AiVerificationService,
  type AiVerificationResult,
} from '../services/aiVerificationService';

interface StoryDetailPageProps {
  storyId: string;
  onBack: () => void;
}

export default function StoryDetailPage({ storyId, onBack }: StoryDetailPageProps) {
  const [story, setStory] = useState<NewsArticle | null>(null);
  const [relatedStories, setRelatedStories] = useState<NewsArticle[]>([]);
  const [activeTab, setActiveTab] = useState<'comparison' | 'analysis'>('analysis');
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>(() => TranslationService.getLanguage());
  const [aiResult, setAiResult] = useState<AiVerificationResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab('analysis');
    loadStory();
    const handleLanguageChange = () => {
      setLanguage(TranslationService.getLanguage());
    };
    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, [storyId]);

  const loadStory = async () => {
    setLoading(true);
    setAiResult(null);
    setAiError(null);
    try {
      const allNews = await NewsService.fetchNews();
      const selectedStory = allNews.find((s) => s.id === storyId);

      if (selectedStory) {
        const related = allNews.filter(
          (s) =>
            s.topic === selectedStory.topic &&
            s.category !== selectedStory.category &&
            s.id !== selectedStory.id
        );

        setStory(selectedStory);
        setRelatedStories(related);
        void runAiVerification(selectedStory, related);
      }
    } catch (error) {
      console.error('Failed to load story:', error);
    } finally {
      setLoading(false);
    }
  };

  const t = (key: TranslationKey) => {
    return TranslationService.t(key);
  };

  const getHeadline = (s: NewsArticle) => {
    return language === 'ka' ? s.headlineKa : s.headline;
  };

  const getSummary = (s: NewsArticle) => {
    return language === 'ka' ? s.summaryKa : s.summary;
  };

  const getSourceLabel = (category: string) => {
    return category === 'establishment' ? t('establishmentView') : t('oppositionView');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ka' ? 'ka-GE' : 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const runAiVerification = async (
    targetStory: NewsArticle = story as NewsArticle,
    targetRelatedStories: NewsArticle[] = relatedStories
  ) => {
    if (!targetStory) return;

    setAiLoading(true);
    setAiError(null);
    try {
      const result = await AiVerificationService.verifyStory(targetStory, targetRelatedStories);
      setAiResult(result);
    } catch (error) {
      setAiError(error instanceof Error ? error.message : t('aiUnavailable'));
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="story-detail-page">
        <button className="back-button" onClick={onBack}>
          {t('back')}
        </button>
        <div className="loading">{t('loading')}</div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="story-detail-page">
        <button className="back-button" onClick={onBack}>
          {t('back')}
        </button>
        <div className="error">{t('error')}</div>
      </div>
    );
  }

  return (
    <div className="story-detail-page">
      <button className="back-button" onClick={onBack}>
        {t('back')}
      </button>

      <div className="story-header">
        {story.imageUrl && <img src={story.imageUrl} alt={getHeadline(story)} className="story-hero-image" />}

        <div className="story-meta">
          <span className="source-label">{getSourceLabel(story.category)}</span>
          <span className="source-name">{story.source}</span>
          <span className="date">{formatDate(story.publishedAt)}</span>
          {story.originalUrl && (
            <a href={story.originalUrl} target="_blank" rel="noopener noreferrer" className="original-link">
              {t('readOriginal')}
            </a>
          )}
        </div>

        <h1 className="story-title">{getHeadline(story)}</h1>
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          {t('analysis')}
        </button>
        <button
          className={`tab-button ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          {t('perspectives')}
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'analysis' && (
          <div className="analysis-view">
            <div className="analysis-section ai-verification-section">
              <div className="ai-section-header">
                <div>
                  <h3>{t('aiVerification')}</h3>
                  <p>
                    {language === 'ka'
                      ? 'AI ადარებს ორივე მხარის ტექსტს და იყენებს ქართული კონსტიტუციური პრინციპების საწყის კონტექსტს.'
                      : 'AI compares both perspectives and checks them against starter Georgian constitutional context.'}
                  </p>
                </div>
                <button className="ai-button" onClick={() => runAiVerification()} disabled={aiLoading}>
                  {aiLoading ? t('aiVerifying') : t('runAiVerification')}
                </button>
              </div>

              {aiError && <p className="ai-error">{aiError}</p>}

              {aiResult && (
                <div className="ai-result">
                  <div className="ai-verdict-row">
                    <div>
                      <span className="ai-label">{t('verdict')}</span>
                      <strong>{aiResult.verdict.replaceAll('_', ' ')}</strong>
                    </div>
                    <div>
                      <span className="ai-label">{t('confidenceScore')}</span>
                      <strong>{aiResult.confidence}%</strong>
                    </div>
                    <div>
                      <span className="ai-label">{t('model')}</span>
                      <strong>{aiResult.model}</strong>
                    </div>
                  </div>

                  <p className="ai-summary">{aiResult.summary}</p>

                  {aiResult.claims.length > 0 && (
                    <div className="ai-subsection">
                      <h4>{t('claimsChecked')}</h4>
                      <ul>
                        {aiResult.claims.map((claim, index) => (
                          <li key={`${claim.status}-${index}`}>
                            <strong>{claim.status}:</strong> {claim.text}
                            <span>{claim.reasoning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {aiResult.legalConsiderations.length > 0 && (
                    <div className="ai-subsection">
                      <h4>{t('legalContext')}</h4>
                      <ul>
                        {aiResult.legalConsiderations.map((consideration, index) => (
                          <li key={`${consideration}-${index}`}>{consideration}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {aiResult.questionsToVerify.length > 0 && (
                    <div className="ai-subsection">
                      <h4>{t('questionsToVerify')}</h4>
                      <ul>
                        {aiResult.questionsToVerify.map((question, index) => (
                          <li key={`${question}-${index}`}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="ai-sources">
                    {aiResult.legalContext.map((item) => (
                      <a key={item.id} href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    ))}
                  </div>

                  <p className="ai-disclaimer">{aiResult.disclaimer}</p>
                </div>
              )}
            </div>

            <div className="analysis-section">
              <h3>{t('biasAssessment')}</h3>
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
              <h3>{t('howToVerify')}</h3>
              <ul>
                <li>{language === 'ka' ? 'შეადაროთ სხვადსხვა წყაროებიდან გამოქვეყნებული ახალი ამბები' : 'Compare news from multiple sources'}</li>
                <li>{language === 'ka' ? 'მოძებნეთ ფაქტობრივი მტკიცებულება და წყაროები' : 'Look for factual evidence and sources'}</li>
                <li>{language === 'ka' ? 'გაითვალისწინეთ, თუ რა შეიძლება იყოს ჟურნალისტის მიკერძოება' : 'Consider potential journalist bias'}</li>
                <li>{language === 'ka' ? 'გადამოწმეთ ინფორმაცია დამოუკიდებელი წყაროებით' : 'Verify information with independent sources'}</li>
              </ul>
            </div>

            <div className="analysis-section">
              <h3>{t('comparisonInsight')}</h3>
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

        {activeTab === 'comparison' && (
          <div className="comparison-view">
            <div className="perspective-card primary">
              <h3>{getSourceLabel(story.category)}</h3>
              <p className="source-name">{story.source}</p>
              <p className="summary">{getSummary(story)}</p>
              {story.originalUrl && (
                <a href={story.originalUrl} target="_blank" rel="noopener noreferrer" className="source-button">
                  {t('viewOnSource')} →
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
                    {t('viewOnSource')} →
                  </a>
                )}
              </div>
            ) : (
              <div className="perspective-card opposite empty">
                <p>{t('noOpposing')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
