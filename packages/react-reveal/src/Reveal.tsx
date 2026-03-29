import { createElement } from 'react';
import type { RevealProps, Direction } from './Reveal.types.js';
import * as css from './Reveal.css.js';

/** Strip `var(--x)` → `--x` so React sets it via `style.setProperty`. */
const toProperty = (v: string) => v.slice(4, -1);

const directionMap: Record<Direction, (distance: string) => string> = {
  up: (d) => `translateY(${d})`,
  down: (d) => `translateY(-${d})`,
  left: (d) => `translateX(${d})`,
  right: (d) => `translateX(-${d})`,
};

export function Reveal({
  as = 'div',
  children,
  direction = 'up',
  distance = null,
  duration = 800,
  delay = 0,
  easing = 'ease-out',
  fadeIn = true,
  className,
  style,
  ...rest
}: RevealProps) {
  const hasTransform =
    distance !== null && distance !== '0' && distance !== '0px';

  const classes = [
    css.reveal,
    fadeIn && css.fadeIn,
    hasTransform && css.transform,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const transformValue = hasTransform
    ? directionMap[direction](distance)
    : undefined;

  const combinedStyle = {
    [toProperty(css.duration)]: `${duration}ms`,
    [toProperty(css.delay)]: `${delay}ms`,
    [toProperty(css.easing)]: easing,
    [toProperty(css.initialTransform)]: transformValue,
    ...(fadeIn && { opacity: 0 }),
    ...(hasTransform && { transform: transformValue }),
    ...style,
  };

  return createElement(
    as,
    {
      className: classes,
      style: combinedStyle,
      ...rest,
    },
    children
  );
}
