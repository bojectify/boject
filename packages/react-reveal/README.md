# @boject/react-reveal

CSS animation wrapper for React. Fade and slide elements into view with zero JavaScript animation — pure CSS transitions driven by props.

RSC-compatible. No `"use client"` directive required.

## Install

```bash
npm install @boject/react-reveal react
```

## Usage

```tsx
import { Reveal } from '@boject/react-reveal';

<Reveal>
  <h1>Fades and slides up</h1>
</Reveal>

<Reveal direction="left" duration={1200} delay={200}>
  <p>Slides in from the left after 200ms</p>
</Reveal>

<Reveal distance="0">
  <p>Fade only, no slide</p>
</Reveal>

<Reveal fadeIn={false} direction="down">
  <p>Slide only, no fade</p>
</Reveal>
```

## Props

| Prop        | Type                                  | Default  | Description                          |
| ----------- | ------------------------------------- | -------- | ------------------------------------ |
| `as`        | `ElementType`                         | `'div'`  | HTML tag to render                   |
| `children`  | `ReactNode`                           | -        | Content to animate                   |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'`   | Entrance direction                   |
| `distance`  | `string`                              | `'36px'` | Translation distance (any CSS value) |
| `duration`  | `number`                              | `800`    | Animation duration in ms             |
| `delay`     | `number`                              | `0`      | Animation delay in ms                |
| `fadeIn`    | `boolean`                             | `true`   | Include opacity fade                 |
| `className` | `string`                              | -        | Additional CSS class                 |

All other HTML attributes are spread onto the root element.

## CSS Custom Properties

Override these for global theming:

```css
.boject-reveal {
  --boject-reveal-duration: 800ms;
  --boject-reveal-delay: 0ms;
  --boject-reveal-distance: 36px;
  --boject-reveal-easing: ease-out;
}
```

Props take precedence over CSS custom properties.

## Requirements

- React >= 18.0.0

## License

MIT
