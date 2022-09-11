module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2F4786',
        primaryDark: '#1F2F59',
        primaryLight: '#92A8E3',
        secondary: '#2F8647',
        secondaryDark: '#125C27',
        secondaryLight: '#D2EBC0',
        secondarySLight: '#F2F5EF',
        black: '#020305',
        graySubtitle: '#808289',
        grayInputField: '#A2A6B6',
        grayDisableButton: '#BEC0C7',
        grayLineBased: '#E4E6ED',
        background: '#FFFFFF',
        offWhite: '#F8F8F8',
        clearWhite: 'rgba(0, 0, 0, 0.36)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(216, 216, 216)',
        notification: 'rgb(255, 59, 48)',
        warning: '#F4B740',
        warningLight: '#FFD789',
        warningDark: '#946200',
        error: '#DF3030',
        errorLight: '#FF5050',
        errorDark: '#A61818',
        success: '#00BA88',
        successDark: '#00966D',
        successLight: '#E0FFF7',
        info: '#ffd700',
        errorSub: '#F5BABA',
        neutralGray: '#D4D2D0',
        offsetColor: "#C3C8D9",
      },
    },
  },
  plugins: [],
};

//level 1 - xs -0.75rem; /* 12px */   // 0.60rem; /* 10px */
//level 2 - xs - 0.75rem; /* 12px */
//level 3 - sm - 0.875rem; /* 14px */
//level 4 - base - 1rem; /* 16px */
//level 5 - lg - 1.125rem; /* 18px */
//level 6 - xl - 1.25rem; /* 20px */
//level 7 - 2xl - 1.5rem; /* 24px */
//level 8 - 3xl - 1.875rem; /* 30px */  // 1.5rem; /* 28px */
//level 9 - 4xl - 2.25rem; /* 36px */
//level 10 - 5xl - 3rem; /* 48px */  // 2.75rem; /* 44px */

//h1 - level 7 - 2xl - 1.5rem; /* 24px */
//h2 - level 5 -lg - 1.125rem; /* 18px */
//h3 - level 4 - base - 1rem; /* 16px */
//h4 - level 3 -sm - 0.875rem; /* 14px */
//h5 - level 2 - xs - 0.75rem; /* 12px */
//h6 - level 1 - xs -0.75rem; /* 12px */   // 0.60rem; /* 10px */
