import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'auto', icon: 'mirror', title: 'OS preference' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'auto',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      document.documentElement.style.colorScheme =
        theme === 'auto' ? '' : theme;
      document.body.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '';
      document.body.style.color = theme === 'dark' ? '#e0e0e0' : '';
      return Story();
    },
  ],
};

export default preview;
