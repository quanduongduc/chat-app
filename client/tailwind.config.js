const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    colors: {
      lightGray: "#E8E8E8",
      lightestGray: "#FAFAFA",
      glareGray: "rgba(79, 86, 101, 1)",
      darkCyan: "#21978B",
      glareGreen: "rgba(33, 151, 139, 1)",
      white: colors.white,
      inherit: colors.inherit,
      red: colors.red,
    },
    extend: {
      backgroundImage: {
        "auth-bg": "url('../src/assets/images/auth-bg.jpg')",
      },
    },
  },
  plugins: [],
};
