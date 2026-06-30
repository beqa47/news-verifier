import { useState } from 'react';
import '../styles/SettingsPage.css';
import { TranslationService, type Language } from '../services/translationService';

interface SettingsPageProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function SettingsPage({ darkMode, onToggleDarkMode }: SettingsPageProps) {
  const [language, setLanguage] = useState<Language>(() => TranslationService.getLanguage());
  const [notifications, setNotifications] = useState(true);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    TranslationService.setLanguage(lang);
    // Trigger a storage event to notify other components
    window.dispatchEvent(new Event('storage'));
  };

  const t = (key: keyof typeof TranslationService) => {
    return TranslationService.t(key as any);
  };

  return (
    <div className="settings-page">
      <h2>{t('settings' as any)}</h2>

      <div className="settings-section">
        <h3>{language === 'ka' ? 'გარეგნობა' : 'Appearance'}</h3>
        <div className="setting-item">
          <div className="setting-label">
            <span>{t('darkMode' as any)}</span>
            <span className="setting-value">{darkMode ? (language === 'ka' ? 'ჩართული' : 'On') : language === 'ka' ? 'გამორთული' : 'Off'}</span>
          </div>
          <button className="toggle-button" onClick={onToggleDarkMode}>
            <div className={`toggle-switch ${darkMode ? 'on' : 'off'}`}></div>
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>{t('language' as any)}</h3>
        <div className="language-options">
          <button
            className={`language-button ${language === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            <span className="language-name">English</span>
            {language === 'en' && <span className="checkmark">✓</span>}
          </button>
          <button
            className={`language-button ${language === 'ka' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('ka')}
          >
            <span className="language-name">ქართული</span>
            {language === 'ka' && <span className="checkmark">✓</span>}
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>{language === 'ka' ? 'შეტყობინებები' : 'Notifications'}</h3>
        <div className="setting-item">
          <div className="setting-label">
            <span>{language === 'ka' ? 'Push შეტყობინებები' : 'Push Notifications'}</span>
            <span className="setting-value">{notifications ? (language === 'ka' ? 'ჩართული' : 'On') : language === 'ka' ? 'გამორთული' : 'Off'}</span>
          </div>
          <button
            className="toggle-button"
            onClick={() => setNotifications(!notifications)}
          >
            <div className={`toggle-switch ${notifications ? 'on' : 'off'}`}></div>
          </button>
        </div>
        <p className="setting-description">
          {language === 'ka'
            ? 'მიიღეთ შეტყობინებები ახალი ახალი ამბებისა და მნიშვნელოვანი განახლებების შესახებ'
            : 'Get notified about new news stories and important updates'}
        </p>
      </div>

      <div className="settings-section">
        <h3>{t('about' as any)}</h3>
        <div className="about-item">
          <span>{language === 'ka' ? 'ვერსია' : 'Version'}</span>
          <span>1.0.0</span>
        </div>
        <div className="about-item">
          <span>{language === 'ka' ? 'აპლიკაციის სახელი' : 'App Name'}</span>
          <span>{t('appTitle' as any)}</span>
        </div>
      </div>

      <div className="settings-section">
        <h3>{language === 'ka' ? 'ინფორმაცია' : 'Information'}</h3>
        <button className="info-button">
          {language === 'ka' ? 'კონფიდენციალურობის პოლიტიკა' : 'Privacy Policy'}
        </button>
        <button className="info-button">
          {language === 'ka' ? 'მომსახურების პირობები' : 'Terms of Service'}
        </button>
        <button className="info-button">
          {language === 'ka' ? 'დახმარება და მხარდამჭერი' : 'Help & Support'}
        </button>
      </div>

      <div className="settings-footer">
        <p>{t('appTitle' as any)} © 2024</p>
        <p>
          {language === 'ka'
            ? 'ხელისუფლებისა და ოპოზიციის პერსპექტივების შედარება'
            : 'Comparing establishment and opposition perspectives'}
        </p>
      </div>
    </div>
  );
}
