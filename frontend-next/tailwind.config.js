module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2F4786",
        primaryDark: "#1F2F59",
        primaryLight: "#92A8E3",
        secondary: "#2F8647",
        secondaryDark: "#125C27",
        secondaryLight: "#D2EBC0",
        secondarySLight: "F2F5EF",
        black: "#020305",
        graySubtitle: "#808289",
        grayInputField: "#A2A6B6",
        grayDisableButton: "#BEC0C7",
        grayLineBased: "#E4E6ED",
        background: "#FFFFFF",
        offWhite: "#F8F8F8",
        card: "rgb(255, 255, 255)",
        text: "rgb(28, 28, 30)",
        border: "rgb(216, 216, 216)",
        notification: "rgb(255, 59, 48)",
        warning: "#F4B740",
        warningLight: "#FFD789",
        warningDark: "#946200",
        error: "#DF3030",
        errorLight: "#FF5050",
        errorDark: "#A61818",
        success: "#00BA88",
        successDark: "#00966D",
        successLight: "#E0FFF7",
        info: "#ffd700",
        errorSub: "#F5BABA",
        neutralGray: "#D4D2D0",
      },
    },
  },
  plugins: [],
};
