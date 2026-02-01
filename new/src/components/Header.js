import React from 'react';
import { getTranslation } from '../utils/translations';

function Header({ expenses, currentLanguage }) {
  const getTotalExpenses = () => expenses.length;
  
  const getTotalAmount = () => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2);
  };

  const getTotalPeople = () => {
    const people = new Set();
    expenses.forEach(exp => {
      people.add(exp.paidBy);
      if (exp.sharedAmong) {
        exp.sharedAmong.forEach(person => people.add(person));
      }
    });
    return people.size;
  };

  return (
    <header className="app-header">
      <div className="logo">
        <i className="fas fa-coins"></i>
        <h1>{getTranslation(currentLanguage, 'title')}</h1>
      </div>
      <div className="summary-bar">
        <div className="summary-item">
          <i className="fas fa-receipt"></i>
          <div>
            <span className="summary-label">{getTranslation(currentLanguage, 'totalExpensesLabel')}</span>
            <span className="summary-value">{getTotalExpenses()}</span>
          </div>
        </div>
        <div className="summary-item">
          <i className="fas fa-rupee-sign"></i>
          <div>
            <span className="summary-label">{getTranslation(currentLanguage, 'totalAmountLabel')}</span>
            <span className="summary-value">₹{getTotalAmount()}</span>
          </div>
        </div>
        <div className="summary-item">
          <i className="fas fa-users"></i>
          <div>
            <span className="summary-label">{getTranslation(currentLanguage, 'totalPeopleLabel')}</span>
            <span className="summary-value">{getTotalPeople()}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
