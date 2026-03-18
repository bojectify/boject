# @boject/react-carousel

CSS-only scroll-snap carousel for React. No JavaScript scroll handlers — just native browser scrolling with CSS scroll-snap. All slides are in the DOM and fully indexable by search engines.

RSC-compatible. No `"use client"` directive required.

## Install

```bash
npm install @boject/react-carousel react
```

## Usage

```tsx
import { Carousel } from '@boject/react-carousel';

<Carousel>
  <Carousel.Slide>First slide</Carousel.Slide>
  <Carousel.Slide>Second slide</Carousel.Slide>
  <Carousel.Slide>Third slide</Carousel.Slide>
</Carousel>;
```

Navigation is native browser scroll: touch swipe, trackpad, keyboard (Tab to focus, arrow keys to scroll).

## Progressive Enhancement

In browsers that support the experimental CSS Overflow Module, the carousel automatically gains:

- **Scroll buttons** (`::scroll-button`) — previous/next buttons that auto-disable at boundaries
- **Scroll markers** (`::scroll-marker`) — dot indicators tracking the active slide

No extra markup or JavaScript needed. Browsers without support get the base scroll-snap carousel, which works perfectly on its own.

## Props

### Carousel

| Prop         | Type        | Default      | Description                    |
| ------------ | ----------- | ------------ | ------------------------------ |
| `children`   | `ReactNode` | -            | `Carousel.Slide` elements      |
| `aria-label` | `string`    | `'Carousel'` | Accessible name for the region |
| `className`  | `string`    | -            | Additional CSS class           |

### Carousel.Slide

| Prop        | Type        | Default | Description          |
| ----------- | ----------- | ------- | -------------------- |
| `children`  | `ReactNode` | -       | Slide content        |
| `className` | `string`    | -       | Additional CSS class |

All other HTML attributes are spread onto the root element of both components.

## CSS Custom Properties

```css
.boject-carousel {
  --boject-carousel-gap: 16px;
  --boject-carousel-slide-width: 100%;
  --boject-carousel-snap-align: start;
  --boject-carousel-button-size: 2rem;
  --boject-carousel-button-color: currentColor;
  --boject-carousel-indicator-size: 8px;
  --boject-carousel-indicator-color: #ccc;
  --boject-carousel-indicator-active-color: #333;
}
```

### Show partial next slide

```css
.my-carousel {
  --boject-carousel-slide-width: 85%;
}
```

## Accessibility

- Scroll container: `role="region"`, `aria-roledescription="carousel"`, `tabindex="0"`
- Each slide: `role="group"`, `aria-roledescription="slide"`
- Keyboard navigable via Tab + arrow keys

## Requirements

- React >= 18.0.0

## License

MIT
