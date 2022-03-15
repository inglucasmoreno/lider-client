const { guessProductionMode } = require("@ngneat/tailwind");
const colors = require('tailwindcss/colors');

module.exports = {
    prefix: '',
    purge: {
        enabled: guessProductionMode(),
        content: [
            './src/**/*.{html,ts}',
        ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primaryColor: "#071907",
                secondaryColor: "#186d96",
                thirdColor: '#bee4f9',
                background: colors.gray,
                primary: colors.gray,
                orange: colors.orange,
                secondary: colors.blue,
            },
        },
        fontFamily: {
            display: ["Nunito", "sans-serif"],
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
};