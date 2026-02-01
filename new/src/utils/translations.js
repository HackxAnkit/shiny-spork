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

export const getTranslation = (language, key) => {
  return translations[language]?.[key] || translations.en[key] || key;
};
