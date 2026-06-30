import { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import { NewsService, type NewsArticle } from '../services/newsService';

interface HomePageProps {
  onSelectStory: (id: string) => void;
}

export default function HomePage({ onSelectStory }: HomePageProps) {
  const [stories, setStories] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    setLoading(true);
    try {
      const news = await NewsService.fetchNews();
      setStories(news);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

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

      {loading ? (
        <div className="loading">Loading stories from Georgian news sources...</div>
      ) : (
        <div className="stories-grid">
          {stories.map((story) => (
            <div
              key={story.id}
              className="story-card"
              onClick={() => onSelectStory(story.id)}
            >
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
                <span
                  className="source-badge"
                  style={{
                    backgroundColor: `${getSourceBadgeColor(story.category)}20`,
                    color: getSourceBadgeColor(story.category),
                  }}
                >
                  {story.source}
                </span>
                <span className="view-comparison">View Comparison →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
