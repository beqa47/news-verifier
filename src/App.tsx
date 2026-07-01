import { useState, useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import StoryDetailPage from './pages/StoryDetailPage';
import SettingsPage from './pages/SettingsPage';

type Page = 'home' | 'story' | 'settings';

interface AppState {
  currentPage: Page;
  selectedStoryId?: string;
}

function App() {
  const [appState, setAppState] = useState<AppState>({ currentPage: 'home' });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleNavigate = (page: Page, storyId?: string) => {
    setAppState({ currentPage: page, selectedStoryId: storyId });
    window.scrollTo(0, 0);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h1>News Verifier</h1>
            <p className="subtitle">Compare establishment & opposition views</p>
          </div>
          <div className="navbar-menu">
            <button
              className={`nav-button ${appState.currentPage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavigate('home')}
            >
              Home
            </button>
            <button
              className={`nav-button ${appState.currentPage === 'settings' ? 'active' : ''}`}
              onClick={() => handleNavigate('settings')}
            >
              Settings
            </button>
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {appState.currentPage === 'home' && (
          <HomePage onSelectStory={(id) => handleNavigate('story', id)} />
        )}
        {appState.currentPage === 'story' && appState.selectedStoryId && (
          <StoryDetailPage
            storyId={appState.selectedStoryId}
            onBack={() => handleNavigate('home')}
          />
        )}
        {appState.currentPage === 'settings' && (
          <SettingsPage darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        )}
      </main>

      <footer className="footer">
        <p>Georgian News Verifier © 2024</p>
        <p>Comparing establishment and opposition perspectives</p>
        <p>Build: AI confidence core v2</p>
      </footer>
    </div>
  );
}

export default App;
