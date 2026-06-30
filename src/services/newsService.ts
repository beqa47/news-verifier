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
  headlineKa: string; // Georgian headline
  summary: string;
  summaryKa: string; // Georgian summary
  content?: string;
  contentKa?: string; // Georgian content
  source: string;
  sourceUrl: string;
  category: 'establishment' | 'opposition';
  publishedAt: string;
  imageUrl?: string;
  topic: string;
  topicKa: string; // Georgian topic
  confidenceScore?: number; // 0-100 percentage
  trending?: boolean;
}

// Mock data for demonstration - in production, this would fetch from real APIs
const MOCK_NEWS_DATA: NewsArticle[] = [
  {
    id: '1',
    headline: 'Government announces new economic development program',
    headlineKa: 'მთავრობა ახალი ეკონომიკური განვითარების პროგრამას აცხადებს',
    summary: 'The government has unveiled a comprehensive economic development initiative aimed at attracting foreign investment and creating jobs.',
    summaryKa: 'მთავრობამ წარმოადგინა ყოვლისმომცველი ეკონომიკური განვითარების ინიციატივა, რომელიც მიზნად ისახავს უცხო ინვესტიციების привлечение და სამუშაო ადგილების შექმნას.',
    source: 'Imedi TV',
    sourceUrl: 'https://www.imedi.ge',
    category: 'establishment',
    publishedAt: new Date().toISOString(),
    topic: 'Economy',
    topicKa: 'ეკონომიკა',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
    confidenceScore: 72,
    trending: true,
  },
  {
    id: '2',
    headline: 'Opposition criticizes economic program as insufficient',
    headlineKa: 'ოპოზიცია ეკონომიკურ პროგრამას არასაკმარისად აფასებს',
    summary: 'Opposition parties argue the new economic program lacks transparency and fails to address the needs of small businesses and ordinary citizens.',
    summaryKa: 'ოპოზიციის პარტიები ამტკიცებენ, რომ ახალი ეკონომიკური პროგრამა მოკლებულია გამჭვირვალობას და არ პასუხობს მცირე ბიზნესის და ჩვეულებრივი მოქალაქეების საჭიროებებს.',
    source: 'Mtavari TV',
    sourceUrl: 'https://mtavari.tv',
    category: 'opposition',
    publishedAt: new Date().toISOString(),
    topic: 'Economy',
    topicKa: 'ეკონომიკა',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    confidenceScore: 68,
    trending: true,
  },
  {
    id: '3',
    headline: 'Healthcare system modernization begins',
    headlineKa: 'ჯანდაცვის სისტემის მოდერნიზაცია იწყება',
    summary: 'The government launches a major healthcare infrastructure modernization project with investment from international partners.',
    summaryKa: 'მთავრობა ხელმძღვანელობს ჯანდაცვის ინფრასტრუქტურის მოდერნიზაციის დიდ პროექტს საერთაშორისო პარტნიორების ინვესტიციებით.',
    source: 'Georgian Public Broadcaster',
    sourceUrl: 'https://1tv.ge',
    category: 'establishment',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    topic: 'Healthcare',
    topicKa: 'ჯანდაცვა',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=300&fit=crop',
    confidenceScore: 75,
    trending: true,
  },
  {
    id: '4',
    headline: 'Healthcare reforms raise concerns about rural areas',
    headlineKa: 'ჯანდაცვის რეფორმები სოფლის მხარეში შეშფოთებას იწვევს',
    summary: 'Healthcare advocates warn that the modernization program may neglect rural regions and increase costs for patients.',
    summaryKa: 'ჯანდაცვის ადვოკატები გაფრთხილებენ, რომ მოდერნიზაციის პროგრამა შეიძლება უგულებელი ტოვოს სოფლის რეგიონებს და გაზარდოს პაციენტების ხარჯები.',
    source: 'Netgazeti',
    sourceUrl: 'https://netgazeti.ge',
    category: 'opposition',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    topic: 'Healthcare',
    topicKa: 'ჯანდაცვა',
    imageUrl: 'https://images.unsplash.com/photo-1631217314831-c6227db76b6e?w=500&h=300&fit=crop',
    confidenceScore: 70,
    trending: true,
  },
  {
    id: '5',
    headline: 'Education ministry launches new curriculum initiative',
    headlineKa: 'განათლების სამინისტრო ახალი სასწავლო გეგმის ინიციატივას ხელმძღვანელობს',
    summary: 'The education ministry introduces a new national curriculum aligned with international standards to prepare students for modern economy.',
    summaryKa: 'განათლების სამინისტრო წარმოადგენს ახალ ეროვნულ სასწავლო გეგმას, რომელიც შეესაბამება საერთაშორისო სტანდარტებს და მოამზადებს მოსწავლეებს თანამედროვე ეკონომიკისთვის.',
    source: 'Imedi TV',
    sourceUrl: 'https://www.imedi.ge',
    category: 'establishment',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    topic: 'Education',
    topicKa: 'განათლება',
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-cdae8dfb7d5b?w=500&h=300&fit=crop',
    confidenceScore: 73,
  },
  {
    id: '6',
    headline: 'Educators question new curriculum changes',
    headlineKa: 'პედაგოგები ახალი სასწავლო გეგმის ცვლილებებს კითხვის ნიშნის ქვეშ აყენებენ',
    summary: 'Teachers and education experts express concerns about the rapid implementation of curriculum changes without adequate preparation.',
    summaryKa: 'მასწავლებლები და განათლების ექსპერტები გამოთქვამენ შეშფოთებას სასწავლო გეგმის ცვლილებების სწრაფი დანერგვის შესახებ ადეკვატური подготовки გარეშე.',
    source: 'Formula TV',
    sourceUrl: 'https://formula.ge',
    category: 'opposition',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    topic: 'Education',
    topicKa: 'განათლება',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=300&fit=crop',
    confidenceScore: 69,
  },
  {
    id: '7',
    headline: 'Infrastructure development accelerates',
    headlineKa: 'ინფრასტრუქტურის განვითარება აჩქარდება',
    summary: 'Major infrastructure projects across Georgia show progress with government support and international cooperation.',
    summaryKa: 'საქართველოს მასშტაბით მსხვილი ინფრასტრუქტურის პროექტები აჩვენებენ პროგრესს მთავრობის მხარდამჭერობით და საერთაშორისო თანამშრომლობით.',
    source: 'Georgian Public Broadcaster',
    sourceUrl: 'https://1tv.ge',
    category: 'establishment',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    topic: 'Infrastructure',
    topicKa: 'ინფრასტრუქტურა',
    imageUrl: 'https://images.unsplash.com/photo-1581092916056-0c4c3acd3789?w=500&h=300&fit=crop',
    confidenceScore: 74,
    trending: true,
  },
  {
    id: '8',
    headline: 'Infrastructure projects face implementation challenges',
    headlineKa: 'ინფრასტრუქტურის პროექტები განხორციელების გამოწვევებს აწყდება',
    summary: 'Reports indicate delays and budget overruns in several major infrastructure projects across the country.',
    summaryKa: 'ანგარიშები მიუთითებენ დაგვიანებებსა და ბიუჯეტის გადაჭარბებებზე ქვეყნის რამდენიმე მსხვილ ინფრასტრუქტურის პროექტში.',
    source: 'Mtavari TV',
    sourceUrl: 'https://mtavari.tv',
    category: 'opposition',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    topic: 'Infrastructure',
    topicKa: 'ინფრასტრუქტურა',
    imageUrl: 'https://images.unsplash.com/photo-1581092916550-e323b3c69dfa?w=500&h=300&fit=crop',
    confidenceScore: 71,
    trending: true,
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
      // 3. Extract headlines, summaries, images, and categorize by source
      // 4. Calculate confidence scores based on cross-source verification
      return MOCK_NEWS_DATA;
    } catch (error) {
      console.error('Failed to fetch news:', error);
      return MOCK_NEWS_DATA; // Fallback to mock data
    }
  }

  /**
   * Get trending news
   */
  static async getTrendingNews(): Promise<NewsArticle[]> {
    const allNews = await this.fetchNews();
    return allNews.filter((article) => article.trending).sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });
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

  /**
   * Calculate confidence score based on cross-source verification
   * Higher score = more sources covering the story, more agreement
   */
  static calculateConfidenceScore(article: NewsArticle, allArticles: NewsArticle[]): number {
    // Find related articles from other sources on the same topic
    const relatedArticles = allArticles.filter(
      (a) =>
        a.topic === article.topic &&
        a.id !== article.id &&
        a.category !== article.category // From opposite perspective
    );

    // Base score
    let score = 65;

    // Increase score if multiple sources cover the topic
    if (relatedArticles.length > 0) {
      score += relatedArticles.length * 5;
    }

    // Cap at 100
    return Math.min(score, 100);
  }
}
