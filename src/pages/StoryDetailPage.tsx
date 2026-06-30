import { useState, useEffect } from 'react';
import '../styles/StoryDetailPage.css';
import { NewsService, type NewsArticle } from '../services/newsService';

interface StoryDetailPageProps {
  storyId: string;
  onBack: () => void;
}

export default function StoryDetailPage({ storyId, onBack }: StoryDetailPageProps) {
  const [story, setStory] = useState<NewsArticle | null>(null);
  const [relatedStories, setRelatedStories] = useState<NewsArticle[]>([]);
  const [activeTab, setActiveTab] = useState<'comparison' | 'analysis'>('comparison');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStory();
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

  if (loading) {
    return (
      <div className="story-detail-page">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="loading">Loading story...</div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="story-detail-page">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="error">Story not found</div>
      </div>
    );
  }

  const getSourceColor = (category: string) => {
    return category === 'establishment' ? '#e74c3c' : '#27ae60';
  };

  const getPerspectiveLabel = (category: string) => {
    return category === 'establishment' ? 'Establishment View' : 'Opposition View';
  };

  return (
    <div className="story-detail-page">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="story-header">
        <span className="topic-badge">{story.topic}</span>
        <h1>{story.headline}</h1>
        <p className="summary">{story.summary}</p>
        <div className="story-meta">
          <span className="source" style={{ color: getSourceColor(story.category) }}>
            {getPerspectiveLabel(story.category)} • {story.source}
          </span>
          <span className="date">{new Date(story.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          Perspectives
        </button>
        <button
          className={`tab ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          Analysis
        </button>
      </div>

      <div className="content">
        {activeTab === 'comparison' ? (
          <div className="comparison-view">
            <div className="primary-perspective">
              <div
                className={`perspective ${story.category}`}
                style={{ borderLeftColor: getSourceColor(story.category) }}
              >
                <h3>{getPerspectiveLabel(story.category)}</h3>
                <p className="source">{story.source}</p>
                <p className="content">{story.summary}</p>
                {story.content && <p className="full-content">{story.content}</p>}
              </div>
            </div>

            {relatedStories.length > 0 && (
              <div className="opposing-perspectives">
                <h3>Opposing Perspectives</h3>
                {relatedStories.map((relatedStory) => (
                  <div
                    key={relatedStory.id}
                    className={`perspective ${relatedStory.category}`}
                    style={{ borderLeftColor: getSourceColor(relatedStory.category) }}
                  >
                    <h4>{getPerspectiveLabel(relatedStory.category)}</h4>
                    <p className="source">{relatedStory.source}</p>
                    <p className="content">{relatedStory.summary}</p>
                  </div>
                ))}
              </div>
            )}

            {relatedStories.length === 0 && (
              <div className="no-opposing">
                <p>No opposing perspectives available for this topic yet.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="analysis-view">
            <div className="analysis-card">
              <h3>Bias Assessment</h3>
              <div className="bias-info">
                <p>
                  This story is from a <strong>{story.category === 'establishment' ? 'pro-government' : 'opposition'}</strong> source.
                </p>
                <div className="source-details">
                  <p>
                    <strong>Source:</strong> {story.source}
                  </p>
                  <p>
                    <strong>Category:</strong> {story.category === 'establishment' ? 'Establishment-aligned' : 'Opposition-aligned'}
                  </p>
                </div>
              </div>
            </div>

            <div className="analysis-card">
              <h3>Comparison Insight</h3>
              {relatedStories.length > 0 ? (
                <p>
                  This topic has coverage from both perspectives. The{' '}
                  <strong>{story.category === 'establishment' ? 'opposition' : 'establishment'}</strong> sources present
                  different viewpoints and emphasis on this issue. Compare the perspectives above to understand the full
                  picture.
                </p>
              ) : (
                <p>
                  This topic currently has coverage from only the{' '}
                  <strong>{story.category === 'establishment' ? 'establishment' : 'opposition'}</strong> perspective. To
                  get a balanced view, look for coverage from other sources.
                </p>
              )}
            </div>

            <div className="analysis-card">
              <h3>How to Verify</h3>
              <ul>
                <li>Compare coverage from both establishment and opposition sources</li>
                <li>Check facts against international news agencies</li>
                <li>Look for primary sources and official statements</li>
                <li>Consider the timing and context of the reporting</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
