import React from 'react';
import { getTranslation } from '../utils/translations';

function TabNavigation({ currentTab, onTabChange, currentLanguage }) {
  const tabs = [
    { id: 'add', icon: 'plus-circle', label: 'addExpenseTab' },
    { id: 'expenses', icon: 'list', label: 'allExpensesTab' },
    { id: 'settlements', icon: 'exchange-alt', label: 'settlementsTab' },
    { id: 'balance', icon: 'balance-scale', label: 'balanceTab' },
  ];

  return (
    <nav className="tab-navigation">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn ${currentTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <i className={`fas fa-${tab.icon}`}></i>
          <span>{getTranslation(currentLanguage, tab.label)}</span>
        </button>
      ))}
    </nav>
  );
}

export default TabNavigation;
