import React from 'react';
import { getTranslation } from '../utils/translations';

function Navbar({ onAboutClick, onContactClick, onThemeToggle, onLanguageToggle, currentTheme, currentLanguage }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="nav-btn" onClick={onAboutClick}>
          <i className="fas fa-info-circle"></i>
          <span>{getTranslation(currentLanguage, 'about')}</span>
        </button>
        <button className="nav-btn" onClick={onContactClick}>
          <i className="fas fa-envelope"></i>
          <span>{getTranslation(currentLanguage, 'contact')}</span>
        </button>
      </div>
      <div className="nav-right">
        <button className="nav-btn" id="themeToggle" onClick={onThemeToggle}>
          <i className={`fas fa-${currentTheme === 'dark' ? 'sun' : 'moon'}`}></i>
          <span>{getTranslation(currentLanguage, currentTheme === 'dark' ? 'theme' : 'themeLight')}</span>
        </button>
        <button className="nav-btn" id="languageToggle" onClick={onLanguageToggle}>
          <i className="fas fa-language"></i>
          <span id="currentLang">{currentLanguage === 'en' ? 'English' : 'हिंदी'}</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
