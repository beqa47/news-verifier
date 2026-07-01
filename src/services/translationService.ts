// Georgian Language Translations
export const translations = {
  en: {
    // Header & Navigation
    appTitle: 'Georgian News Verifier',
    appSubtitle: 'Real news from establishment and opposition sources',
    establishmentSources: 'Establishment',
    oppositionSources: 'Opposition',
    
    // Buttons & Actions
    viewComparison: 'View Comparison →',
    back: '← Back',
    trending: '🔥 Trending',
    allNews: '📰 All News',
    perspectives: 'Perspectives',
    analysis: 'Analysis',
    
    // Settings
    settings: 'Settings',
    language: 'Language',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    about: 'About',
    
    // News Categories
    economy: 'Economy',
    politics: 'Politics',
    healthcare: 'Healthcare',
    education: 'Education',
    infrastructure: 'Infrastructure',
    technology: 'Technology',
    
    // News Source Labels
    establishmentView: 'Establishment View',
    oppositionView: 'Opposition View',
    
    // Analysis
    biasAssessment: 'Bias Assessment',
    comparisonInsight: 'Comparison Insight',
    howToVerify: 'How to Verify',
    confidenceScore: 'confidence',
    aiVerification: 'AI Verification',
    runAiVerification: 'Run AI Verification',
    aiVerifying: 'Checking with AI...',
    aiUnavailable: 'AI verification is unavailable.',
    verdict: 'Verdict',
    model: 'Model',
    legalContext: 'Legal Context',
    claimsChecked: 'Claims Checked',
    questionsToVerify: 'Questions to Verify',
    
    // Messages
    loading: 'Loading stories from Georgian news sources...',
    noOpposing: 'No opposing perspectives available for this topic yet.',
    
    // Source Names
    imeditv: 'Imedi TV',
    publicBroadcaster: 'Georgian Public Broadcaster',
    mtavaritv: 'Mtavari TV',
    netgazeti: 'Netgazeti',
    formulatv: 'Formula TV',
    
    // Links & Sources
    readOriginal: 'Read Original →',
    viewOnSource: 'View on Source',
    sourceLink: 'Source Link',
    
    // Additional UI Elements
    home: 'Home',
    search: 'Search',
    noResults: 'No results found',
    error: 'Error',
    tryAgain: 'Try Again',
    close: 'Close',
    share: 'Share',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    cancel: 'Cancel',
    confirm: 'Confirm',
    yes: 'Yes',
    no: 'No',
    openInNewTab: 'Open in new tab',
  },
  ka: {
    // Header & Navigation
    appTitle: 'ქართული ახალი ამბების გადამოწმებელი',
    appSubtitle: 'რეალური ახალი ამბები ხელისუფლებისა და ოპოზიციის წყაროებიდან',
    establishmentSources: 'ხელისუფლება',
    oppositionSources: 'ოპოზიცია',
    
    // Buttons & Actions
    viewComparison: 'შედარების ხედვა →',
    back: '← უკან',
    trending: '🔥 ტრენდი',
    allNews: '📰 ყველა ახალი ამბი',
    perspectives: 'პერსპექტივები',
    analysis: 'ანალიზი',
    
    // Settings
    settings: 'პარამეტრები',
    language: 'ენა',
    darkMode: 'მუქი რეჟიმი',
    lightMode: 'ღია რეჟიმი',
    about: 'შესახებ',
    
    // News Categories
    economy: 'ეკონომიკა',
    politics: 'პოლიტიკა',
    healthcare: 'ჯანდაცვა',
    education: 'განათლება',
    infrastructure: 'ინფრასტრუქტურა',
    technology: 'ტექნოლოგია',
    
    // News Source Labels
    establishmentView: 'ხელისუფლების თვალსაზრისი',
    oppositionView: 'ოპოზიციის თვალსაზრისი',
    
    // Analysis
    biasAssessment: 'მიკერძოების შეფასება',
    comparisonInsight: 'შედარების შინაარსი',
    howToVerify: 'როგორ გადამოწმოთ',
    confidenceScore: 'სანდოობა',
    aiVerification: 'AI გადამოწმება',
    runAiVerification: 'AI გადამოწმების გაშვება',
    aiVerifying: 'AI ამოწმებს...',
    aiUnavailable: 'AI გადამოწმება მიუწვდომელია.',
    verdict: 'დასკვნა',
    model: 'მოდელი',
    legalContext: 'სამართლებრივი კონტექსტი',
    claimsChecked: 'შემოწმებული მტკიცებები',
    questionsToVerify: 'გადასამოწმებელი კითხვები',
    
    // Messages
    loading: 'ქართული ახალი ამბების ჩატვირთვა...',
    noOpposing: 'ამ თემაზე ოპოზიციის პერსპექტივა ხელმისაწვდომი არ არის.',
    
    // Source Names
    imeditv: 'იმედი',
    publicBroadcaster: 'ქართული საზოგადოებრივი მაუწყებელი',
    mtavaritv: 'მთავარი',
    netgazeti: 'ნეტგაზეთი',
    formulatv: 'ფორმულა',
    
    // Links & Sources
    readOriginal: 'ორიგინალის წაკითხვა →',
    viewOnSource: 'წყაროზე ხედვა',
    sourceLink: 'წყაროს ბმული',
    
    // Additional UI Elements
    home: 'მთავარი',
    search: 'ძებნა',
    noResults: 'შედეგი არ მოიძებნა',
    error: 'შეცდომა',
    tryAgain: 'ხელახლა სცადეთ',
    close: 'დახურვა',
    share: 'გაზიარება',
    save: 'შენახვა',
    delete: 'წაშლა',
    edit: 'რედაქტირება',
    cancel: 'გაუქმება',
    confirm: 'დადასტურება',
    yes: 'დიახ',
    no: 'არა',
    openInNewTab: 'ახალ ჩანართში გახსნა',
  },
};

export type Language = 'en' | 'ka';
export type TranslationKey = keyof typeof translations.en;

export class TranslationService {
  private static isLanguage(value: string | null): value is Language {
    return value === 'en' || value === 'ka';
  }

  static setLanguage(lang: Language) {
    localStorage.setItem('language', lang);
    window.dispatchEvent(new Event('languagechange'));
  }

  static getLanguage(): Language {
    const saved = localStorage.getItem('language');
    return this.isLanguage(saved) ? saved : 'en';
  }

  static t(key: TranslationKey): string {
    const lang = this.getLanguage();
    return translations[lang][key] || translations.en[key] || key;
  }

  static getAvailableLanguages(): Array<{ code: Language; name: string }> {
    return [
      { code: 'en', name: 'English' },
      { code: 'ka', name: 'ქართული' },
    ];
  }
}
