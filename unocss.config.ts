import {
  defineConfig,
  presetWind,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { presetBetterNestedColors } from 'unocss-preset-better-nested-colors';

export default defineConfig({
  safelist: [],

  shortcuts: [
    {
      cover: 'absolute inset-0 max-w-full max-h-full rounded-[inherit]',
    },
  ],

  theme: {
    colors: {
      primary: {
        DEFAULT: '#f5f5f5',
        ':dark': '#1a1a1a',
      },

      secondary: {
        DEFAULT: 'rgba(40,40,40,.8)',
        ':dark': 'rgba(250,250,250,.9)',

        interactive: {
          DEFAULT: '~',
          ':dark': '~',
          ':hover': 'accent',
        },
      },

      accent: {
        DEFAULT: '#42b883',
        contrast: '#fff',
        focus: {
          DEFAULT: '#33a06f',
          ':dark': '#42d392',
        },

        interactive: {
          DEFAULT: '~',
          ':hover': {
            DEFAULT: 'accent-focus',
            ':dark': 'accent-focus:dark',
          },
          ':disabled': {
            DEFAULT: '#999',
            ':dark': '#333',
          },

          contrast: {
            DEFAULT: 'accent-contrast',
            ':dark': '#333',
            ':disabled': {
              DEFAULT: '#f1f1f1',
              ':dark': '#888',
            },
          },
        },
      },

      error: '#f55',
    },
  },

  presets: [
    presetWind(),
    presetBetterNestedColors(),
    presetAttributify({ prefix: '_', prefixedOnly: true }),
    presetIcons({ prefix: 'icon-', scale: 1.2, warn: true }),
    presetTypography(),
    presetWebFonts({
      fonts: { sans: 'Open Sans' },
    }),
  ],

  transformers: [transformerDirectives(), transformerVariantGroup()],

  include: ['**/*.vue', '**/*.scss'],
});
