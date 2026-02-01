import React, { useMemo } from 'react';

function BalanceSheetTab({ expenses, currentLanguage }) {
  const balanceSheet = useMemo(() => {
    if (expenses.length === 0) return {};

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

    return balances;
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <div className="tab-pane active">
        <div className="content-card">
          <div className="empty-state">
            <i className="fas fa-balance-scale"></i>
            <h3>No balance data</h3>
            <p>Add expenses to see the balance sheet</p>
          </div>
        </div>
      </div>
    );
  }

  const entries = Object.entries(balanceSheet).sort((a, b) => b[1] - a[1]);

  return (
    <div className="tab-pane active">
      <div className="content-card">
        <div className="card-header">
          <h2>Balance Sheet</h2>
        </div>
        <div className="balance-sheet">
          <table className="balance-table">
            <thead>
              <tr>
                <th>Person</th>
                <th>Balance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([person, balance], index) => (
                <tr key={index} className={balance > 0 ? 'positive' : balance < 0 ? 'negative' : 'neutral'}>
                  <td>{person}</td>
                  <td>₹{Math.abs(balance).toFixed(2)}</td>
                  <td>
                    {balance > 0.01 ? (
                      <span className="badge badge-positive">
                        <i className="fas fa-arrow-up"></i> Owed
                      </span>
                    ) : balance < -0.01 ? (
                      <span className="badge badge-negative">
                        <i className="fas fa-arrow-down"></i> Owes
                      </span>
                    ) : (
                      <span className="badge badge-neutral">Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BalanceSheetTab;
