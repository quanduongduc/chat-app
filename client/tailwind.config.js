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
      inherit: colors.inherit,
    },
    extend: {
      backgroundImage: {
        "auth-bg": "url('../src/assets/images/auth-bg.jpg')",
      },
    },
  },
  plugins: [],
};
