module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      boring: "#676EA5",
      poddl: {
        100: "#21243a",
        200: "#868AAA",
        300: "#577FBB",
        400: "#676FA5",
        500: "#B4B9E8",
        600: "#B3BAE7",
        700: "#3A3E64",
        900: "#1C1E31",
        disabledButton: "#7457BB",
        placeHolder: "#ADADB3",
        error: "#ff0000",
      },
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["dark", "rounded"],
  },
};
