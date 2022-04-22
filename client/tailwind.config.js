const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    colors: {
      lightGray: "#E8E8E8",
      lightestGray: "#FAFAFA",
      darkCyan: "#21978B",
      white: colors.white,
    },
    extend: {},
  },
  plugins: [],
};
