import React, { useState } from 'react';
import { getTranslation } from '../../utils/translations';

function AddExpenseTab({ onAddExpense, currentLanguage }) {
  const [paidBy, setPaidBy] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [sharedAmong, setSharedAmong] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!paidBy || !amount || !description) {
      alert('Please fill all fields');
      return;
    }

    const sharedList = sharedAmong
      .split(',')
      .map(name => name.trim())
      .filter(name => name);

    if (sharedList.length === 0) {
      sharedList.push(paidBy);
    }

    const newExpense = {
      id: Date.now(),
      paidBy,
      amount: parseFloat(amount),
      description,
      sharedAmong: sharedList,
      date: new Date().toLocaleDateString()
    };

    onAddExpense(newExpense);
    
    // Reset form
    setPaidBy('');
    setAmount('');
    setDescription('');
    setSharedAmong('');
  };

  return (
    <div id="add-tab" className="tab-pane active">
      <div className="content-card">
        <div className="card-header">
          <h2>Add New Expense</h2>
        </div>
        <form className="expense-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Paid By</label>
            <input
              type="text"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          
          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              step="0.01"
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What was this for?"
            />
          </div>
          
          <div className="form-group">
            <label>Shared Among (comma-separated names)</label>
            <textarea
              value={sharedAmong}
              onChange={(e) => setSharedAmong(e.target.value)}
              placeholder="Enter names separated by commas"
              rows="3"
            ></textarea>
            <small>Leave empty to assign only to the person who paid</small>
          </div>
          
          <button type="submit" className="btn-primary">
            <i className="fas fa-plus"></i> Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseTab;
