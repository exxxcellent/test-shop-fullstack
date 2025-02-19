/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'sf-pro': ['"SF Pro Display"', 'sans-serif'],
                'ubuntu-mono': ['"Ubuntu Mono"', 'sans-serif'],
            },
            colors: {
                accent: {
                    primary: '#782FEF',
                    secondary: '#964DF5',
                    disabled: '#EEEBFF',
                },
                gray: {
                    primary: '#D9D9D9',
                    secondary: '#F8F8F8',
                    tertiary: '#EFF1F5',
                },
                text: {
                    primary: '#782FEF',
                    secondary: '#333333',
                    tertiary: '#797979',
                    placeholder: '#6D6D6D',
                    disabled: {
                        primary: '#C5A9FA',
                        secondary: '#999999',
                    },
                },
                error: {
                    primary: '#EE3D48',
                    secondary: '#FEF0F1',
                },
            },
        },
    },
    plugins: [],
};
