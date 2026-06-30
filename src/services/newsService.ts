// Georgian News Sources Configuration
const GEORGIAN_NEWS_SOURCES = {
  establishment: [
    {
      name: 'Imedi TV',
      url: 'https://www.imedi.ge',
      apiEndpoint: 'https://www.imedi.ge/ge/news',
      category: 'establishment',
    },
    {
      name: 'Georgian Public Broadcaster',
      url: 'https://1tv.ge',
      apiEndpoint: 'https://1tv.ge/news',
      category: 'establishment',
    },
  ],
  opposition: [
    {
      name: 'Mtavari TV',
      url: 'https://mtavari.tv',
      apiEndpoint: 'https://mtavari.tv/news',
      category: 'opposition',
    },
    {
      name: 'Netgazeti',
      url: 'https://netgazeti.ge',
      apiEndpoint: 'https://netgazeti.ge/news',
      category: 'opposition',
    },
    {
      name: 'Formula TV',
      url: 'https://formula.ge',
      apiEndpoint: 'https://formula.ge/news',
      category: 'opposition',
    },
  ],
};

export interface NewsArticle {
  id: string;
  headline: string;
  summary: string;
  content?: string;
  source: string;
  sourceUrl: string;
  category: 'establishment' | 'opposition';
  publishedAt: string;
  imageUrl?: string;
  topic: string;
}

// Mock data for demonstration - in production, this would fetch from real APIs
const MOCK_NEWS_DATA: NewsArticle[] = [
  {
    id: '1',
    headline: 'Government announces new economic development program',
    summary: 'The government has unveiled a comprehensive economic development initiative aimed at attracting foreign investment and creating jobs.',
    source: 'Imedi TV',
    sourceUrl: 'https://www.imedi.ge',
    category: 'establishment',
    publishedAt: new Date().toISOString(),
    topic: 'Economy',
  },
  {
    id: '2',
    headline: 'Opposition criticizes economic program as insufficient',
    summary: 'Opposition parties argue the new economic program lacks transparency and fails to address the needs of small businesses and ordinary citizens.',
    source: 'Mtavari TV',
    sourceUrl: 'https://mtavari.tv',
    category: 'opposition',
    publishedAt: new Date().toISOString(),
    topic: 'Economy',
  },
  {
    id: '3',
    headline: 'Healthcare system modernization begins',
    summary: 'The government launches a major healthcare infrastructure modernization project with investment from international partners.',
    source: 'Georgian Public Broadcaster',
    sourceUrl: 'https://1tv.ge',
    category: 'establishment',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    topic: 'Healthcare',
  },
  {
    id: '4',
    headline: 'Healthcare reforms raise concerns about rural areas',
    summary: 'Healthcare advocates warn that the modernization program may neglect rural regions and increase costs for patients.',
    source: 'Netgazeti',
    sourceUrl: 'https://netgazeti.ge',
    category: 'opposition',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    topic: 'Healthcare',
  },
  {
    id: '5',
    headline: 'Education ministry launches new curriculum initiative',
    summary: 'The education ministry introduces a new national curriculum aligned with international standards to prepare students for modern economy.',
    source: 'Imedi TV',
    sourceUrl: 'https://www.imedi.ge',
    category: 'establishment',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    topic: 'Education',
  },
  {
    id: '6',
    headline: 'Educators question new curriculum changes',
    summary: 'Teachers and education experts express concerns about the rapid implementation of curriculum changes without adequate preparation.',
    source: 'Formula TV',
    sourceUrl: 'https://formula.ge',
    category: 'opposition',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    topic: 'Education',
  },
  {
    id: '7',
    headline: 'Infrastructure development accelerates',
    summary: 'Major infrastructure projects across Georgia show progress with government support and international cooperation.',
    source: 'Georgian Public Broadcaster',
    sourceUrl: 'https://1tv.ge',
    category: 'establishment',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    topic: 'Infrastructure',
  },
  {
    id: '8',
    headline: 'Infrastructure projects face implementation challenges',
    summary: 'Reports indicate delays and budget overruns in several major infrastructure projects across the country.',
    source: 'Mtavari TV',
    sourceUrl: 'https://mtavari.tv',
    category: 'opposition',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    topic: 'Infrastructure',
  },
];

export class NewsService {
  /**
   * Fetch news from Georgian sources
   * In production, this would make real API calls to news sources
   */
  static async fetchNews(): Promise<NewsArticle[]> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Return mock data for now
      // In production, you would:
      // 1. Fetch from RSS feeds using a CORS proxy
      // 2. Parse XML/JSON responses
      // 3. Extract headlines, summaries, and categorize by source
      return MOCK_NEWS_DATA;
    } catch (error) {
      console.error('Failed to fetch news:', error);
      return MOCK_NEWS_DATA; // Fallback to mock data
    }
  }

  /**
   * Get news by topic
   */
  static async getNewsByTopic(topic: string): Promise<NewsArticle[]> {
    const allNews = await this.fetchNews();
    return allNews.filter((article) => article.topic.toLowerCase() === topic.toLowerCase());
  }

  /**
   * Get establishment perspective on a topic
   */
  static async getEstablishmentNews(topic?: string): Promise<NewsArticle[]> {
    const allNews = await this.fetchNews();
    return allNews.filter(
      (article) =>
        article.category === 'establishment' &&
        (!topic || article.topic.toLowerCase() === topic.toLowerCase())
    );
  }

  /**
   * Get opposition perspective on a topic
   */
  static async getOppositionNews(topic?: string): Promise<NewsArticle[]> {
    const allNews = await this.fetchNews();
    return allNews.filter(
      (article) =>
        article.category === 'opposition' &&
        (!topic || article.topic.toLowerCase() === topic.toLowerCase())
    );
  }

  /**
   * Get all unique topics
   */
  static async getTopics(): Promise<string[]> {
    const allNews = await this.fetchNews();
    const topics = new Set(allNews.map((article) => article.topic));
    return Array.from(topics);
  }

  /**
   * Get news sources configuration
   */
  static getSourcesConfig() {
    return GEORGIAN_NEWS_SOURCES;
  }
}
