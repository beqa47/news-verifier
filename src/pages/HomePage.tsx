import { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import { NewsService, type NewsArticle } from '../services/newsService';

interface HomePageProps {
  onSelectStory: (id: string) => void;
}

export default function HomePage({ onSelectStory }: HomePageProps) {
  const [stories, setStories] = useState<NewsArticle[]>([]);
  const [trendingStories, setTrendingStories] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTrending, setShowTrending] = useState(true);

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

  const getTopicColor = (topic: string) => {
    const colors: { [key: string]: string } = {
      Economy: '#3b82f6',
      Politics: '#ef4444',
      Healthcare: '#10b981',
      Education: '#f59e0b',
      Infrastructure: '#8b5cf6',
      Technology: '#ec4899',
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
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const displayStories = showTrending ? trendingStories : stories;

  return (
    <div className="home-page">
      <div className="hero-section">
        <h2>Georgian News Verifier</h2>
        <p>Real news from establishment and opposition sources</p>
        <p className="sources-info">
          <strong>Establishment:</strong> Imedi TV, Georgian Public Broadcaster | <strong>Opposition:</strong> Mtavari
          TV, Netgazeti, Formula TV
        </p>
      </div>

      <div className="view-toggle">
        <button
          className={`toggle-btn ${showTrending ? 'active' : ''}`}
          onClick={() => setShowTrending(true)}
        >
          🔥 Trending
        </button>
        <button
          className={`toggle-btn ${!showTrending ? 'active' : ''}`}
          onClick={() => setShowTrending(false)}
        >
          📰 All News
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading stories from Georgian news sources...</div>
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
                  <img src={story.imageUrl} alt={story.headline} />
                  {story.trending && <span className="trending-badge">🔥 Trending</span>}
                </div>
              )}

              <div className="story-content">
                <div className="story-header">
                  <span
                    className="topic-badge"
                    style={{ backgroundColor: `${getTopicColor(story.topic)}20`, color: getTopicColor(story.topic) }}
                  >
                    {story.topic}
                  </span>
                  <span className="date">{formatDate(story.publishedAt)}</span>
                </div>

                <h3 className="story-headline">{story.headline}</h3>
                <p className="story-summary">{story.summary}</p>

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
                          {story.confidenceScore}% True
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="view-comparison">View Comparison →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
