import React, { useMemo } from 'react';

function SettlementsTab({ expenses, currentLanguage }) {
  const settlements = useMemo(() => {
    if (expenses.length === 0) return [];

    // Calculate who owes whom
    const balances = {};
    
    expenses.forEach(expense => {
      if (!balances[expense.paidBy]) {
        balances[expense.paidBy] = 0;
      }
      balances[expense.paidBy] += expense.amount;

      const perPersonAmount = expense.amount / expense.sharedAmong.length;
      expense.sharedAmong.forEach(person => {
        if (!balances[person]) {
          balances[person] = 0;
        }
        balances[person] -= perPersonAmount;
      });
    });

    // Create settlement transactions
    const settles = [];
    const debtors = [];
    const creditors = [];

    Object.entries(balances).forEach(([person, balance]) => {
      if (balance > 0.01) creditors.push({ person, balance });
      if (balance < -0.01) debtors.push({ person, balance: Math.abs(balance) });
    });

    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const amount = Math.min(debtors[i].balance, creditors[j].balance);
      settles.push({
        from: debtors[i].person,
        to: creditors[j].person,
        amount: amount.toFixed(2)
      });

      debtors[i].balance -= amount;
      creditors[j].balance -= amount;

      if (debtors[i].balance < 0.01) i++;
      if (creditors[j].balance < 0.01) j++;
    }

    return settles;
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <div className="tab-pane active">
        <div className="content-card">
          <div className="empty-state">
            <i className="fas fa-exchange-alt"></i>
            <h3>No settlements needed</h3>
            <p>Add expenses to see settlement recommendations</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-pane active">
      <div className="content-card">
        <div className="card-header">
          <h2>Settlements</h2>
        </div>
        {settlements.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-check-circle"></i>
            <h3>All settled!</h3>
            <p>Everyone has paid their share</p>
          </div>
        ) : (
          <div className="settlements-list">
            {settlements.map((settlement, index) => (
              <div key={index} className="settlement-item">
                <div className="settlement-info">
                  <span className="settlement-from">{settlement.from}</span>
                  <span className="settlement-arrow">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                  <span className="settlement-to">{settlement.to}</span>
                </div>
                <span className="settlement-amount">₹{settlement.amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SettlementsTab;
