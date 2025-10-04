/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // iOS System Colors
        'ios-blue': { DEFAULT: '#007AFF', dark: '#0A84FF' },
        'ios-green': { DEFAULT: '#34C759', dark: '#30D158' },
        'ios-indigo': { DEFAULT: '#5856D6', dark: '#5E5CE6' },
        'ios-orange': { DEFAULT: '#FF9500', dark: '#FF9F0A' },
        'ios-pink': { DEFAULT: '#FF2D55', dark: '#FF375F' },
        'ios-purple': { DEFAULT: '#AF52DE', dark: '#BF5AF2' },
        'ios-red': { DEFAULT: '#FF3B30', dark: '#FF453A' },
        'ios-teal': { DEFAULT: '#5AC8FA', dark: '#64D2FF' },
        'ios-yellow': { DEFAULT: '#FFCC00', dark: '#FFD60A' },

        // iOS Label Colors
        'ios-label': { DEFAULT: '#000000', dark: '#FFFFFF' },
        'ios-secondary-label': { DEFAULT: 'rgba(60, 60, 67, 0.6)', dark: 'rgba(235, 235, 245, 0.6)' },
        'ios-tertiary-label': { DEFAULT: 'rgba(60, 60, 67, 0.3)', dark: 'rgba(235, 235, 245, 0.3)' },
        'ios-quaternary-label': { DEFAULT: 'rgba(60, 60, 67, 0.18)', dark: 'rgba(235, 235, 245, 0.18)' },

        // iOS Background Colors
        'ios-bg': { DEFAULT: '#FFFFFF', dark: '#000000' },
        'ios-secondary-bg': { DEFAULT: '#F2F2F7', dark: '#1C1C1E' },
        'ios-tertiary-bg': { DEFAULT: '#FFFFFF', dark: '#2C2C2E' },
        'ios-grouped-bg': { DEFAULT: '#F2F2F7', dark: '#000000' },
        'ios-secondary-grouped-bg': { DEFAULT: '#FFFFFF', dark: '#1C1C1E' },
        'ios-tertiary-grouped-bg': { DEFAULT: '#F2F2F7', dark: '#2C2C2E' },

        // iOS Fill Colors
        'ios-fill': { DEFAULT: 'rgba(120, 120, 128, 0.2)', dark: 'rgba(120, 120, 128, 0.36)' },
        'ios-secondary-fill': { DEFAULT: 'rgba(120, 120, 128, 0.16)', dark: 'rgba(120, 120, 128, 0.32)' },
        'ios-tertiary-fill': { DEFAULT: 'rgba(118, 118, 128, 0.12)', dark: 'rgba(118, 118, 128, 0.24)' },
        'ios-quaternary-fill': { DEFAULT: 'rgba(116, 116, 128, 0.08)', dark: 'rgba(118, 118, 128, 0.18)' },

        // iOS Gray Colors
        'ios-gray': { DEFAULT: '#8E8E93', dark: '#8E8E93' },
        'ios-gray-2': { DEFAULT: '#AEAEB2', dark: '#636366' },
        'ios-gray-3': { DEFAULT: '#C7C7CC', dark: '#48484A' },
        'ios-gray-4': { DEFAULT: '#D1D1D6', dark: '#3A3A3C' },
        'ios-gray-5': { DEFAULT: '#E5E5EA', dark: '#2C2C2E' },
        'ios-gray-6': { DEFAULT: '#F2F2F7', dark: '#1C1C1E' },

        // iOS Separator Colors
        'ios-separator': { DEFAULT: 'rgba(60, 60, 67, 0.29)', dark: 'rgba(84, 84, 88, 0.6)' },
        'ios-opaque-separator': { DEFAULT: '#C6C6C8', dark: '#38383A' },
      },
      spacing: {
        'ios-xs': '4px',
        'ios-sm': '8px',
        'ios-md': '16px',
        'ios-lg': '24px',
        'ios-xl': '32px',
        'ios-touch': '44px', // Minimum touch target
      },
      borderRadius: {
        'ios-sm': '8px',
        'ios-md': '10px',
        'ios-lg': '12px',
        'ios-xl': '16px',
        'ios-2xl': '20px',
      },
      fontSize: {
        // SF Pro Text Styles (iOS Dynamic Type)
        'ios-caption-2': ['11px', { lineHeight: '13px', fontWeight: '400' }],
        'ios-caption-1': ['12px', { lineHeight: '16px', fontWeight: '400' }],
        'ios-footnote': ['13px', { lineHeight: '18px', fontWeight: '400' }],
        'ios-subheadline': ['15px', { lineHeight: '20px', fontWeight: '400' }],
        'ios-callout': ['16px', { lineHeight: '21px', fontWeight: '400' }],
        'ios-body': ['17px', { lineHeight: '22px', fontWeight: '400' }],
        'ios-headline': ['17px', { lineHeight: '22px', fontWeight: '600' }],
        'ios-title-3': ['20px', { lineHeight: '25px', fontWeight: '400' }],
        'ios-title-2': ['22px', { lineHeight: '28px', fontWeight: '400' }],
        'ios-title-1': ['28px', { lineHeight: '34px', fontWeight: '400' }],
        'ios-large-title': ['34px', { lineHeight: '41px', fontWeight: '400' }],
      },
      fontFamily: {
        'sf-pro': ['system-ui', '-apple-system', 'SF Pro Text', 'SF Pro Display', 'sans-serif'],
      },
      fontWeight: {
        'ios-regular': '400',
        'ios-medium': '500',
        'ios-semibold': '600',
        'ios-bold': '700',
      },
    },
  },
  plugins: [],
}
