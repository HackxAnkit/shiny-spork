import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import AddExpenseTab from './components/tabs/AddExpenseTab';
import AllExpensesTab from './components/tabs/AllExpensesTab';
import SettlementsTab from './components/tabs/SettlementsTab';
import BalanceSheetTab from './components/tabs/BalanceSheetTab';
import Modal from './components/Modal';
import BackgroundSection from './components/BackgroundSection';
import { getTranslation } from './utils/translations';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [currentTab, setCurrentTab] = useState('add');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadExpenses();
    loadPreferences();
  }, []);

  const loadExpenses = () => {
    const stored = localStorage.getItem('expenses');
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  };

  const loadPreferences = () => {
    const theme = localStorage.getItem('theme') || 'dark';
    const language = localStorage.getItem('language') || 'en';
    setCurrentTheme(theme);
    setCurrentLanguage(language);
    applyTheme(theme);
  };

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const openModal = (type) => {
    setModalContent(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addExpense = (expense) => {
    const newExpenses = [...expenses, expense];
    setExpenses(newExpenses);
    localStorage.setItem('expenses', JSON.stringify(newExpenses));
  };

  const deleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
    localStorage.setItem('expenses', JSON.stringify(newExpenses));
  };

  return (
    <div className="App">
      <BackgroundSection />
      <Navbar 
        onAboutClick={() => openModal('about')}
        onContactClick={() => openModal('contact')}
        onThemeToggle={toggleTheme}
        onLanguageToggle={toggleLanguage}
        currentTheme={currentTheme}
        currentLanguage={currentLanguage}
      />
      
      <div className="app-container">
        <Header expenses={expenses} currentLanguage={currentLanguage} />
        
        <TabNavigation 
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          currentLanguage={currentLanguage}
        />

        <div className="tab-content">
          {currentTab === 'add' && (
            <AddExpenseTab 
              onAddExpense={addExpense}
              currentLanguage={currentLanguage}
            />
          )}
          {currentTab === 'expenses' && (
            <AllExpensesTab 
              expenses={expenses}
              onDeleteExpense={deleteExpense}
              currentLanguage={currentLanguage}
            />
          )}
          {currentTab === 'settlements' && (
            <SettlementsTab 
              expenses={expenses}
              currentLanguage={currentLanguage}
            />
          )}
          {currentTab === 'balance' && (
            <BalanceSheetTab 
              expenses={expenses}
              currentLanguage={currentLanguage}
            />
          )}
        </div>
      </div>

      {showModal && (
        <Modal 
          type={modalContent}
          onClose={closeModal}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
}

export default App;
