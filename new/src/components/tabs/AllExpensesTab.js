import React from 'react';

function AllExpensesTab({ expenses, onDeleteExpense, currentLanguage }) {
  if (expenses.length === 0) {
    return (
      <div className="tab-pane active">
        <div className="content-card">
          <div className="empty-state">
            <i className="fas fa-inbox"></i>
            <h3>No expenses yet</h3>
            <p>Add your first expense to get started</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-pane active">
      <div className="content-card">
        <div className="card-header">
          <h2>All Expenses</h2>
        </div>
        <div className="expenses-list">
          {expenses.map((expense, index) => (
            <div key={expense.id} className="expense-item">
              <div className="expense-left">
                <div className="expense-icon">
                  <i className="fas fa-receipt"></i>
                </div>
                <div className="expense-details">
                  <h4>{expense.description}</h4>
                  <p className="expense-paid">Paid by: {expense.paidBy}</p>
                  <p className="expense-shared">Shared with: {expense.sharedAmong.join(', ')}</p>
                  <small className="expense-date">{expense.date}</small>
                </div>
              </div>
              <div className="expense-right">
                <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
                <button 
                  className="btn-delete"
                  onClick={() => onDeleteExpense(index)}
                  title="Delete"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllExpensesTab;
