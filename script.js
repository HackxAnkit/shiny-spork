// Client-side expense tracker with advanced UI
let expenses = [];
let currentLanguage = 'en';
let currentTheme = 'dark';

const translations = {
  en: {
    title: 'Cash Flow Minimizer',
    about: 'About',
    contact: 'Contact',
    theme: 'Dark Mode',
    themeLight: 'Light Mode',
    totalExpensesLabel: 'Total Expenses',
    totalAmountLabel: 'Total Amount',
    totalPeopleLabel: 'People Involved',
    addExpenseTab: 'Add Expense',
    allExpensesTab: 'All Expenses',
    settlementsTab: 'Settlements',
    balanceTab: 'Balance Sheet',
    aboutTitle: 'About Cash Flow Minimizer',
    aboutText1: 'Cash Flow Minimizer is a smart expense splitting tool that helps you manage shared expenses among friends, roommates, or colleagues.',
    aboutText2: 'The app uses an optimized algorithm to minimize the number of transactions needed to settle all debts, making it easier and faster to split bills.',
    features: 'Features:',
    feature1: '✓ Add and manage expenses easily',
    feature2: '✓ Automatic settlement calculations',
    feature3: '✓ Visual balance sheet',
    feature4: '✓ Minimal transaction optimization',
    feature5: '✓ Dark/Light mode support',
    feature6: '✓ Multi-language support (English/Hindi)',
    contactTitle: 'Contact Us',
    contactText: 'Have questions or feedback? We\'d love to hear from you!'
  },
  hi: {
    title: 'कैश फ्लो मिनिमाइज़र',
    about: 'के बारे में',
    contact: 'संपर्क करें',
    theme: 'डार्क मोड',
    themeLight: 'लाइट मोड',
    totalExpensesLabel: 'कुल खर्चे',
    totalAmountLabel: 'कुल राशि',
    totalPeopleLabel: 'शामिल लोग',
    addExpenseTab: 'खर्च जोड़ें',
    allExpensesTab: 'सभी खर्चे',
    settlementsTab: 'निपटान',
    balanceTab: 'बैलेंस शीट',
    aboutTitle: 'कैश फ्लो मिनिमाइज़र के बारे में',
    aboutText1: 'कैश फ्लो मिनिमाइज़र एक स्मार्ट खर्च विभाजन उपकरण है जो आपको दोस्तों, रूममेट्स या सहकर्मियों के बीच साझा खर्चों को प्रबंधित करने में मदद करता है।',
    aboutText2: 'यह ऐप सभी ऋणों को निपटाने के लिए आवश्यक लेनदेन की संख्या को कम करने के लिए एक अनुकूलित एल्गोरिथ्म का उपयोग करता है, जिससे बिल विभाजित करना आसान और तेज़ हो जाता है।',
    features: 'विशेषताएँ:',
    feature1: '✓ आसानी से खर्च जोड़ें और प्रबंधित करें',
    feature2: '✓ स्वचालित निपटान गणना',
    feature3: '✓ दृश्य बैलेंस शीट',
    feature4: '✓ न्यूनतम लेनदेन अनुकूलन',
    feature5: '✓ डार्क/लाइट मोड समर्थन',
    feature6: '✓ बहु-भाषा समर्थन (अंग्रेजी/हिंदी)',
    contactTitle: 'हमसे संपर्क करें',
    contactText: 'कोई प्रश्न या प्रतिक्रिया है? हम आपसे सुनना पसंद करेंगे!'
  }
};

window.addEventListener('DOMContentLoaded', () => {
  loadExpenses();
  updateSummary();
  loadPreferences();
});

// Tab Navigation
function showTab(tabName) {
  // Hide all tab panes
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  
  // Remove active class from all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  document.getElementById(`${tabName}-tab`).classList.add('active');
  
  // Add active class to clicked button
  event.target.closest('.tab-btn').classList.add('active');
  
  // Auto-calculate settlements when switching to settlements tab
  if (tabName === 'settlements') {
    calculateSettlements();
  }
  
  // Auto-refresh balance sheet when switching to balance tab
  if (tabName === 'balance') {
    refreshBalanceSheet();
  }
}

function addExpense() {
  const paidBy = document.getElementById('paidBy').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const description = document.getElementById('description').value.trim();
  const sharedRaw = document.getElementById('sharedAmong').value.trim();
  const sharedAmong = sharedRaw.split(',').map(name => name.trim()).filter(Boolean);

  if (!paidBy || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid payer name and amount');
    return;
  }
  
  if (!description) {
    alert('Please enter a description');
    return;
  }
  
  if (sharedAmong.length === 0) {
    alert('Please enter at least one person to share the expense');
    return;
  }

  const expense = { 
    paidBy, 
    amount, 
    description, 
    sharedAmong,
    date: new Date().toISOString()
  };
  
  expenses.push(expense);
  
  // Save to localStorage
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Clear form
  document.getElementById('paidBy').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('description').value = '';
  document.getElementById('sharedAmong').value = '';

  // Update UI
  loadExpenses();
  updateSummary();
  
  // Show success message
  showNotification('Expense added successfully!', 'success');
  
  // Switch to expenses tab to show the newly added expense
  setTimeout(() => {
    document.querySelector('.tab-btn:nth-child(2)').click();
  }, 500);
}

function loadExpenses() {
  // Load from localStorage
  const stored = localStorage.getItem('expenses');
  if (stored) {
    expenses = JSON.parse(stored);
  }

  const expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = '';

  if (expenses.length === 0) {
    expenseList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-inbox"></i>
        <p>No expenses added yet.<br>Start by adding your first expense!</p>
      </div>
    `;
    return;
  }

  expenses.forEach((exp, index) => {
    const item = document.createElement('div');
    item.className = 'expense-item';
    item.innerHTML = `
      <div class="expense-header">
        <span class="expense-payer"><i class="fas fa-user"></i> ${exp.paidBy}</span>
        <span class="expense-amount">₹${exp.amount.toFixed(2)}</span>
      </div>
      <div class="expense-description">
        <i class="fas fa-comment-alt"></i> ${exp.description}
      </div>
      <div class="expense-shared">
        <strong><i class="fas fa-users"></i> Shared among:</strong> ${exp.sharedAmong.join(', ')}
      </div>
      <div class="expense-actions">
        <button class="btn btn-info btn-small" onclick="editExpense(${index})">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="btn btn-danger btn-small" onclick="deleteExpense(${index})">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    `;
    expenseList.appendChild(item);
  });
}

function editExpense(index) {
  const exp = expenses[index];
  const newAmount = prompt('Enter new amount:', exp.amount);
  const newDescription = prompt('Enter new description:', exp.description);
  const newShared = prompt('Enter new members (comma-separated):', exp.sharedAmong.join(', '));

  if (newAmount && newDescription && newShared) {
    expenses[index] = {
      ...expenses[index],
      amount: parseFloat(newAmount),
      description: newDescription,
      sharedAmong: newShared.split(',').map(name => name.trim())
    };
    
    localStorage.setItem('expenses', JSON.stringify(expenses));
    loadExpenses();
    updateSummary();
    showNotification('Expense updated successfully!', 'success');
  }
}

function deleteExpense(index) {
  if (confirm('Are you sure you want to delete this expense?')) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    loadExpenses();
    updateSummary();
    showNotification('Expense deleted successfully!', 'success');
  }
}

function calculateSettlements() {
  const resultList = document.getElementById('result');
  
  if (expenses.length === 0) {
    resultList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-exchange-alt"></i>
        <p>No expenses to settle.<br>Add some expenses first!</p>
      </div>
    `;
    return;
  }

  // Calculate net balance for each person
  const balance = {};
  
  expenses.forEach(exp => {
    const share = exp.amount / exp.sharedAmong.length;
    
    // Person who paid gets credited
    if (!balance[exp.paidBy]) balance[exp.paidBy] = 0;
    balance[exp.paidBy] += exp.amount;
    
    // People who shared the expense get debited
    exp.sharedAmong.forEach(person => {
      if (!balance[person]) balance[person] = 0;
      balance[person] -= share;
    });
  });

  // Separate creditors (positive balance) and debtors (negative balance)
  const creditors = [];
  const debtors = [];
  
  Object.keys(balance).forEach(person => {
    const amount = Math.round(balance[person] * 100) / 100;
    if (amount > 0.01) {
      creditors.push({ person, amount });
    } else if (amount < -0.01) {
      debtors.push({ person, amount: Math.abs(amount) });
    }
  });

  // Sort creditors and debtors
  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const settlements = [];
  let i = 0, j = 0;

  // Minimize cash flow
  while (i < creditors.length && j < debtors.length) {
    const minAmount = Math.min(creditors[i].amount, debtors[j].amount);
    settlements.push({
      from: debtors[j].person,
      to: creditors[i].person,
      amount: minAmount
    });
    
    creditors[i].amount -= minAmount;
    debtors[j].amount -= minAmount;
    
    if (creditors[i].amount < 0.01) i++;
    if (debtors[j].amount < 0.01) j++;
  }

  resultList.innerHTML = '';

  if (settlements.length === 0) {
    resultList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-check-circle"></i>
        <p>All settled! No payments needed.<br>Everyone is even!</p>
      </div>
    `;
    return;
  }

  // Hide info box when showing results
  document.getElementById('settlementInfo').style.display = 'none';

  settlements.forEach(settlement => {
    const item = document.createElement('div');
    item.className = 'settlement-item';
    item.innerHTML = `
      <div class="settlement-icon">
        <i class="fas fa-arrow-right"></i>
      </div>
      <div class="settlement-text">
        <span class="from">${settlement.from}</span> pays 
        <span class="amount">₹${settlement.amount.toFixed(2)}</span> to 
        <span class="to">${settlement.to}</span>
      </div>
    `;
    resultList.appendChild(item);
  });
}

function resetAll() {
  if (confirm('Are you sure you want to reset all expenses? This action cannot be undone.')) {
    expenses = [];
    localStorage.removeItem('expenses');
    loadExpenses();
    updateSummary();
    document.getElementById('result').innerHTML = '';
    document.getElementById('balanceSheet').innerHTML = '';
    document.getElementById('settlementInfo').style.display = 'flex';
    showNotification('All expenses cleared!', 'success');
  }
}

// Update Summary Statistics
function updateSummary() {
  const totalExpenses = expenses.length;
  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const people = new Set();
  
  expenses.forEach(exp => {
    people.add(exp.paidBy);
    exp.sharedAmong.forEach(person => people.add(person));
  });
  
  document.getElementById('totalExpenses').textContent = totalExpenses;
  document.getElementById('totalAmount').textContent = `₹${totalAmount.toFixed(2)}`;
  document.getElementById('totalPeople').textContent = people.size;
}

// Refresh Balance Sheet
function refreshBalanceSheet() {
  const balanceSheet = document.getElementById('balanceSheet');
  
  if (expenses.length === 0) {
    balanceSheet.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-balance-scale"></i>
        <p>No balance data available.<br>Add expenses to see the balance sheet!</p>
      </div>
    `;
    document.getElementById('balanceInfo').style.display = 'flex';
    return;
  }

  // Calculate balances
  const balance = {};
  
  expenses.forEach(exp => {
    const share = exp.amount / exp.sharedAmong.length;
    
    if (!balance[exp.paidBy]) balance[exp.paidBy] = 0;
    balance[exp.paidBy] += exp.amount;
    
    exp.sharedAmong.forEach(person => {
      if (!balance[person]) balance[person] = 0;
      balance[person] -= share;
    });
  });

  const creditors = [];
  const debtors = [];
  
  Object.keys(balance).forEach(person => {
    const amount = Math.round(balance[person] * 100) / 100;
    if (amount > 0.01) {
      creditors.push({ person, amount });
    } else if (amount < -0.01) {
      debtors.push({ person, amount: Math.abs(amount) });
    }
  });

  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  // Hide info box when showing results
  document.getElementById('balanceInfo').style.display = 'none';

  // Build HTML
  let html = '';

  // Creditors section
  html += `
    <div class="balance-section creditors">
      <h3><i class="fas fa-arrow-up"></i> To Receive (Creditors)</h3>
      <div class="balance-list">
  `;
  
  if (creditors.length === 0) {
    html += `<p style="color: #8892b0; text-align: center;">No one is owed money</p>`;
  } else {
    creditors.forEach(c => {
      html += `
        <div class="balance-person">
          <span class="name"><i class="fas fa-user"></i> ${c.person}</span>
          <span class="amount">+₹${c.amount.toFixed(2)}</span>
        </div>
      `;
    });
  }
  
  html += `
      </div>
    </div>
  `;

  // Debtors section
  html += `
    <div class="balance-section debtors">
      <h3><i class="fas fa-arrow-down"></i> To Pay (Debtors)</h3>
      <div class="balance-list">
  `;
  
  if (debtors.length === 0) {
    html += `<p style="color: #8892b0; text-align: center;">No one owes money</p>`;
  } else {
    debtors.forEach(d => {
      html += `
        <div class="balance-person">
          <span class="name"><i class="fas fa-user"></i> ${d.person}</span>
          <span class="amount">-₹${d.amount.toFixed(2)}</span>
        </div>
      `;
    });
  }
  
  html += `
      </div>
    </div>
  `;

  balanceSheet.innerHTML = html;
}

// Show Notification (simple alert for now, can be enhanced)
function showNotification(message, type) {
  // For now, we'll use a simple alert
  // This can be enhanced with a toast notification library
  console.log(`${type.toUpperCase()}: ${message}`);
}

// Modal Functions
function showModal(modalType) {
  const modal = document.getElementById(`${modalType}Modal`);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalType) {
  const modal = document.getElementById(`${modalType}Modal`);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('active');
  }
}

// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById('themeToggle');
  const themeIcon = themeBtn.querySelector('i');
  const themeText = themeBtn.querySelector('span');
  
  if (currentTheme === 'dark') {
    body.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    themeText.textContent = currentLanguage === 'en' ? 'Light Mode' : 'लाइट मोड';
    currentTheme = 'light';
  } else {
    body.classList.remove('light-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    themeText.textContent = currentLanguage === 'en' ? 'Dark Mode' : 'डार्क मोड';
    currentTheme = 'dark';
  }
  
  localStorage.setItem('theme', currentTheme);
}

// Language Toggle
function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
  document.getElementById('currentLang').textContent = currentLanguage === 'en' ? 'English' : 'हिंदी';
  updateLanguage();
  localStorage.setItem('language', currentLanguage);
}

// Update all text elements with current language
function updateLanguage() {
  const elements = document.querySelectorAll('[data-lang]');
  elements.forEach(element => {
    const key = element.getAttribute('data-lang');
    if (translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });
  
  // Update theme button text based on current state
  const themeBtn = document.getElementById('themeToggle');
  const themeText = themeBtn.querySelector('span');
  if (currentTheme === 'dark') {
    themeText.textContent = translations[currentLanguage].theme;
  } else {
    themeText.textContent = translations[currentLanguage].themeLight;
  }
}

// Load saved preferences
function loadPreferences() {
  // Load theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    currentTheme = savedTheme;
    if (currentTheme === 'light') {
      document.body.classList.add('light-mode');
      const themeBtn = document.getElementById('themeToggle');
      const themeIcon = themeBtn.querySelector('i');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }
  
  // Load language
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    currentLanguage = savedLanguage;
    document.getElementById('currentLang').textContent = currentLanguage === 'en' ? 'English' : 'हिंदी';
    updateLanguage();
  }
}
