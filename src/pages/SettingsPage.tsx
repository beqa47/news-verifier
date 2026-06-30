import { useState } from 'react';
import '../styles/SettingsPage.css';

interface SettingsPageProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function SettingsPage({ darkMode, onToggleDarkMode }: SettingsPageProps) {
  const [language, setLanguage] = useState<'en' | 'ka'>('en');
  const [notifications, setNotifications] = useState(true);

  const handleLanguageChange = (lang: 'en' | 'ka') => {
    setLanguage(lang);
    // TODO: Implement language switching
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      <div className="settings-section">
        <h3>Appearance</h3>
        <div className="setting-item">
          <div className="setting-label">
            <span>Dark Mode</span>
            <span className="setting-value">{darkMode ? 'On' : 'Off'}</span>
          </div>
          <button className="toggle-button" onClick={onToggleDarkMode}>
            <div className={`toggle-switch ${darkMode ? 'on' : 'off'}`}></div>
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Language</h3>
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
            <span className="language-name">ქართული (Georgian)</span>
            {language === 'ka' && <span className="checkmark">✓</span>}
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Notifications</h3>
        <div className="setting-item">
          <div className="setting-label">
            <span>Push Notifications</span>
            <span className="setting-value">{notifications ? 'On' : 'Off'}</span>
          </div>
          <button
            className="toggle-button"
            onClick={() => setNotifications(!notifications)}
          >
            <div className={`toggle-switch ${notifications ? 'on' : 'off'}`}></div>
          </button>
        </div>
        <p className="setting-description">Get notified about new news stories and important updates</p>
      </div>

      <div className="settings-section">
        <h3>About</h3>
        <div className="about-item">
          <span>Version</span>
          <span>1.0.0</span>
        </div>
        <div className="about-item">
          <span>App Name</span>
          <span>Georgian News Verifier</span>
        </div>
      </div>

      <div className="settings-section">
        <h3>Information</h3>
        <button className="info-button">Privacy Policy</button>
        <button className="info-button">Terms of Service</button>
        <button className="info-button">Help & Support</button>
      </div>

      <div className="settings-footer">
        <p>Georgian News Verifier © 2024</p>
        <p>Comparing establishment and opposition perspectives</p>
      </div>
    </div>
  );
}
