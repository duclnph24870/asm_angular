/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            boxShadow: {
                input: 'inset 0 0 0 2px #dfe1e6',
                inputFocus: 'inset 0 0 0 2px #0079bf',
                modal: '0 0 5px #091e3f14',
                image: '0 7px 15px rgba(0, 0, 0, 0.15)',
            },
        },
        colors: {
            primary: '#026aa7',
            buttonHover: '#025586',
            white: '#fff',
            none: 'transparent',
            subTitle: '#5E6C84',
            disabled: '#f5f6f8',
            inputHover: '#ebecf0',
            red: '#f87171',
            text: '#172b4d',
            hover: '#e7e9ed',
            overlay: 'rgba(0,0,0,0.4)',
        },
    },
    plugins: [],
};
