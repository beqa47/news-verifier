const GEORGIAN_NEWS_SOURCES = {
  establishment: [
    {
      name: 'Georgian Public Broadcaster',
      url: 'https://1tv.ge/lang/en/',
      apiEndpoint: 'https://1tv.ge/lang/en/',
      category: 'establishment',
    },
    {
      name: 'Government / Official Sources',
      url: 'https://www.gov.ge',
      apiEndpoint: 'https://www.gov.ge',
      category: 'establishment',
    },
  ],
  opposition: [
    {
      name: 'Civil.ge',
      url: 'https://civil.ge',
      apiEndpoint: 'https://civil.ge',
      category: 'opposition',
    },
    {
      name: 'OC Media',
      url: 'https://oc-media.org',
      apiEndpoint: 'https://oc-media.org',
      category: 'opposition',
    },
  ],
};

export interface NewsArticle {
  id: string;
  headline: string;
  headlineKa: string;
  summary: string;
  summaryKa: string;
  content?: string;
  contentKa?: string;
  source: string;
  sourceUrl: string;
  originalUrl?: string;
  category: 'establishment' | 'opposition';
  publishedAt: string;
  imageUrl?: string;
  topic: string;
  topicKa: string;
  trending?: boolean;
}

const MOCK_NEWS_DATA: NewsArticle[] = [
  {
    id: 'pace-democracy-warning',
    headline: 'PACE warns of a continuing breakdown of democracy in Georgia',
    headlineKa: 'PACE საქართველოში დემოკრატიის გაუარესებაზე აფრთხილებს',
    summary:
      'AI summary: The Parliamentary Assembly of the Council of Europe said conditions for genuinely democratic elections currently do not exist in Georgia and linked the warning to the country’s Council of Europe obligations.',
    summaryKa:
      'AI შეჯამება: ევროპის საბჭოს საპარლამენტო ასამბლეამ განაცხადა, რომ საქართველოში სრულად დემოკრატიული არჩევნებისთვის პირობები ამჟამად არ არსებობს და ეს საკითხი ქვეყნის ვალდებულებებს დაუკავშირა.',
    source: 'Civil.ge',
    sourceUrl: 'https://civil.ge',
    originalUrl: 'https://civil.ge/archives/742301',
    category: 'opposition',
    publishedAt: '2026-06-24T12:00:00.000Z',
    topic: 'Democracy',
    topicKa: 'დემოკრატია',
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&h=520&fit=crop',
    trending: true,
  },
  {
    id: 'kobakhidze-annual-report',
    headline: 'Prime Minister Irakli Kobakhidze delivers annual report to parliament',
    headlineKa: 'ირაკლი კობახიძემ პარლამენტს წლიური ანგარიში წარუდგინა',
    summary:
      'AI summary: The prime minister presented the government’s annual report at the end of the spring session, with ruling party MPs and government officials in attendance.',
    summaryKa:
      'AI შეჯამება: პრემიერ-მინისტრმა საგაზაფხულო სესიის ბოლოს მთავრობის წლიური ანგარიში წარადგინა; სხდომას მმართველი გუნდის დეპუტატები და მთავრობის წევრები ესწრებოდნენ.',
    source: 'Civil.ge',
    sourceUrl: 'https://civil.ge',
    originalUrl: 'https://civil.ge/archives/742679',
    category: 'establishment',
    publishedAt: '2026-06-26T12:00:00.000Z',
    topic: 'Democracy',
    topicKa: 'დემოკრატია',
    imageUrl: 'https://images.unsplash.com/photo-1541872705-1f73c6400ec9?w=900&h=520&fit=crop',
    trending: true,
  },
  {
    id: 'gaza-stabilisation-force',
    headline: 'Reports say talks are underway on Georgian troops for Gaza stabilisation force',
    headlineKa: 'ვრცელდება ცნობები ღაზის სტაბილიზაციის ძალებში ქართველი სამხედროების მონაწილეობაზე',
    summary:
      'AI summary: OC Media reports that discussions are underway about Georgia potentially contributing troops to a US-backed stabilisation force in Gaza, a topic that would require official confirmation and parliamentary scrutiny.',
    summaryKa:
      'AI შეჯამება: OC Media წერს, რომ მიმდინარეობს მოლაპარაკებები ღაზაში აშშ-ის მხარდაჭერილი სტაბილიზაციის ძალებისთვის ქართველი სამხედროების შესაძლო მონაწილეობის შესახებ.',
    source: 'OC Media',
    sourceUrl: 'https://oc-media.org',
    originalUrl: 'https://oc-media.org/talks-reportedly-underway-to-deploy-georgian-troops-in-gaza-stabilisation-force/',
    category: 'opposition',
    publishedAt: '2026-06-26T12:00:00.000Z',
    topic: 'Foreign Policy',
    topicKa: 'საგარეო პოლიტიკა',
    imageUrl: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=900&h=520&fit=crop',
    trending: true,
  },
  {
    id: 'us-house-georgia-influence-report',
    headline: 'U.S. House passes bill seeking reports on Russian and Chinese influence in Georgia',
    headlineKa: 'აშშ-ის წარმომადგენელთა პალატამ საქართველოში რუსულ და ჩინურ გავლენაზე ანგარიშის მოთხოვნას მხარი დაუჭირა',
    summary:
      'AI summary: A U.S. House bill would require reporting on Russian and Chinese influence and a five-year strategy for bilateral ties with Georgia if it clears the Senate and becomes law.',
    summaryKa:
      'AI შეჯამება: აშშ-ის წარმომადგენელთა პალატის კანონპროექტი ითხოვს ანგარიშს საქართველოში რუსულ და ჩინურ გავლენაზე და ორმხრივი ურთიერთობების ხუთწლიან სტრატეგიას.',
    source: 'Civil.ge',
    sourceUrl: 'https://civil.ge',
    originalUrl: 'https://civil.ge/archives/737708',
    category: 'opposition',
    publishedAt: '2026-06-09T09:04:00.000Z',
    topic: 'Foreign Policy',
    topicKa: 'საგარეო პოლიტიკა',
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&h=520&fit=crop',
    trending: true,
  },
  {
    id: 'may-economic-growth',
    headline: 'Georgia reports 6.4% economic growth for May 2026',
    headlineKa: 'საქართველომ 2026 წლის მაისში 6.4%-იანი ეკონომიკური ზრდა დააფიქსირა',
    summary:
      'AI summary: GPB/1TV reports that Georgia posted 6.4% economic growth in May, adding to year-to-date economic activity figures. Users should compare this with inflation, wages, and sector-level data.',
    summaryKa:
      'AI შეჯამება: GPB/1TV-ის ცნობით, მაისში საქართველოს ეკონომიკამ 6.4%-ით გაიზარდა. სრული სურათისთვის საჭიროა ინფლაციის, ხელფასებისა და სექტორების მონაცემების შედარება.',
    source: '1TV / GPB',
    sourceUrl: 'https://1tv.ge/lang/en/',
    originalUrl: 'https://1tv.ge/lang/en/',
    category: 'establishment',
    publishedAt: '2026-06-30T12:00:00.000Z',
    topic: 'Economy',
    topicKa: 'ეკონომიკა',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=520&fit=crop',
    trending: true,
  },
  {
    id: 'unemployment-q1-2026',
    headline: 'GeoStat says unemployment fell to 14.4% in Q1 2026',
    headlineKa: 'GeoStat-ის ცნობით, 2026 წლის პირველ კვარტალში უმუშევრობა 14.4%-მდე შემცირდა',
    summary:
      'AI summary: 1TV cites GeoStat data showing lower unemployment, while the same report points to changes in labour force participation and employment rates that should be checked before drawing broad conclusions.',
    summaryKa:
      'AI შეჯამება: 1TV GeoStat-ის მონაცემებს ეყრდნობა და უმუშევრობის შემცირებაზე წერს, თუმცა დასკვნამდე საჭიროა სამუშაო ძალის მონაწილეობისა და დასაქმების მაჩვენებლების შემოწმებაც.',
    source: '1TV / GPB',
    sourceUrl: 'https://1tv.ge/lang/en/',
    originalUrl: 'https://1tv.ge/lang/en/news/geostat-unemployment-rate-in-georgia-falls-to-14-4-in-q1-2026/',
    category: 'establishment',
    publishedAt: '2026-05-19T12:00:00.000Z',
    topic: 'Economy',
    topicKa: 'ეკონომიკა',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&h=520&fit=crop',
  },
  {
    id: 'migration-rules-civil',
    headline: 'Georgia announces stricter migration rules and student requirements',
    headlineKa: 'საქართველო მიგრაციის წესებისა და სტუდენტური მოთხოვნების გამკაცრებას გეგმავს',
    summary:
      'AI summary: Civil.ge reports that the Interior Ministry announced amendments tightening migration rules, including language requirements for international students and measures against migration-related sham marriages.',
    summaryKa:
      'AI შეჯამება: Civil.ge-ის ცნობით, შინაგან საქმეთა სამინისტრომ მიგრაციის წესების გამკაცრება, უცხოელი სტუდენტებისთვის ენობრივი მოთხოვნები და ფიქტიურ ქორწინებებთან დაკავშირებული ზომები გამოაცხადა.',
    source: 'Civil.ge',
    sourceUrl: 'https://civil.ge',
    originalUrl: 'https://civil.ge/archives/737538',
    category: 'establishment',
    publishedAt: '2026-06-08T12:00:00.000Z',
    topic: 'Migration',
    topicKa: 'მიგრაცია',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&h=520&fit=crop',
  },
  {
    id: 'sham-marriages-oc',
    headline: 'Draft law would criminalise sham marriages and change foreign student rules',
    headlineKa: 'კანონპროექტი ფიქტიურ ქორწინებებს დასჯადს გახდის და უცხოელი სტუდენტების წესებს შეცვლის',
    summary:
      'AI summary: OC Media says the draft would criminalise marriages used to obtain citizenship or residence documents and could bring fines, house arrest, imprisonment, deportation, or entry bans.',
    summaryKa:
      'AI შეჯამება: OC Media წერს, რომ კანონპროექტი მოქალაქეობის ან ბინადრობის მისაღებად გამოყენებულ ფიქტიურ ქორწინებებს დასჯადს გახდის და შესაძლოა გამოიწვიოს ჯარიმა, შინაპატიმრობა, პატიმრობა, დეპორტაცია ან ქვეყანაში შესვლის აკრძალვა.',
    source: 'OC Media',
    sourceUrl: 'https://oc-media.org',
    originalUrl: 'https://oc-media.org/georgia-to-criminalise-sham-marriages-revises-rules-for-foreign-students/',
    category: 'opposition',
    publishedAt: '2026-06-10T12:00:00.000Z',
    topic: 'Migration',
    topicKa: 'მიგრაცია',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&h=520&fit=crop',
  },
];

export class NewsService {
  static async fetchNews(): Promise<NewsArticle[]> {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return MOCK_NEWS_DATA;
  }

  static async getTrendingNews(): Promise<NewsArticle[]> {
    const allNews = await this.fetchNews();
    return allNews.filter((article) => article.trending).sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });
  }

  static async getNewsByTopic(topic: string): Promise<NewsArticle[]> {
    const allNews = await this.fetchNews();
    return allNews.filter((article) => article.topic.toLowerCase() === topic.toLowerCase());
  }

  static async getEstablishmentNews(topic?: string): Promise<NewsArticle[]> {
    const allNews = await this.fetchNews();
    return allNews.filter(
      (article) =>
        article.category === 'establishment' &&
        (!topic || article.topic.toLowerCase() === topic.toLowerCase())
    );
  }

  static async getOppositionNews(topic?: string): Promise<NewsArticle[]> {
    const allNews = await this.fetchNews();
    return allNews.filter(
      (article) =>
        article.category === 'opposition' &&
        (!topic || article.topic.toLowerCase() === topic.toLowerCase())
    );
  }

  static async getTopics(): Promise<string[]> {
    const allNews = await this.fetchNews();
    const topics = new Set(allNews.map((article) => article.topic));
    return Array.from(topics);
  }

  static getSourcesConfig() {
    return GEORGIAN_NEWS_SOURCES;
  }
}
