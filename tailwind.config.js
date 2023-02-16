/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            boxShadow: {
                input: 'inset 0 0 0 2px #dfe1e6',
                inputFocus: 'inset 0 0 0 2px #0079bf',
            },
        },
        colors: {
            primary: '#026aa7',
            buttonHover: '#025586',
            white: '#fff',
            none: 'transparent',
            subTitle: '#5E6C84',
            disabled: '#f5f6f8',
        },
    },
    plugins: [],
};
