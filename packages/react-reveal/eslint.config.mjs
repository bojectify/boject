// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';
import reactHooks from 'eslint-plugin-react-hooks';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  reactHooks.configs.flat.recommended,
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
    rules: {},
  },
  {
    files: ['.storybook/**'],
    rules: {
      'storybook/no-uninstalled-addons': [
        'error',
        { packageJsonLocation: '../../package.json' },
      ],
    },
  },
];
