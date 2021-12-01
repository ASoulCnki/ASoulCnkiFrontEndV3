import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ava: '#9ac8e2',
        bella: '#bd7d74',
        carol: '#b8a6d9',
        diana: '#e799b0',
        eileen: '#576690',
      },
      screens: {
        xs: '360px',
      },
    },
  },
  variants: {},
  plugins: [],
})
