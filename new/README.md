# Cash Flow Minimizer - React Version

A modern React-based expense splitting application that helps manage shared expenses among friends, roommates, or colleagues.

## Features

- **Add Expenses**: Easily record shared expenses with payer and participants
- **Expense Tracking**: View all expenses with detailed information
- **Automatic Settlements**: Get optimal settlement recommendations to minimize transactions
- **Balance Sheet**: Visual representation of who owes whom
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Multi-language Support**: English and Hindi translations
- **Local Storage**: All data persists in your browser

## Installation

1. Navigate to the project directory:
   ```bash
   cd new
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Build

To create a production build:

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Navbar.js
│   ├── Header.js
│   ├── TabNavigation.js
│   ├── BackgroundSection.js
│   ├── Modal.js
│   └── tabs/
│       ├── AddExpenseTab.js
│       ├── AllExpensesTab.js
│       ├── SettlementsTab.js
│       └── BalanceSheetTab.js
├── utils/
│   └── translations.js
├── styles/
│   ├── index.css
│   └── App.css
├── App.js
└── index.js
```

## How to Use

1. **Add Expense**: Click the "Add Expense" tab and fill in the expense details
2. **View Expenses**: Check the "All Expenses" tab to see all recorded expenses
3. **Get Settlements**: Go to the "Settlements" tab to see recommended transactions
4. **Balance Sheet**: Check the "Balance Sheet" tab for everyone's current balance
5. **Toggle Theme**: Use the theme button in the navbar to switch between dark and light modes
6. **Change Language**: Click the language button to switch between English and Hindi

## Technologies Used

- React 18
- CSS3 with modern features (Grid, Flexbox, Animations)
- Font Awesome Icons
- Local Storage API

## License

This project is open source and available under the MIT License.
