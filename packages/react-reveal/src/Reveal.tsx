import { createElement } from 'react';
import type { RevealProps, Direction } from './Reveal.types.js';
import './Reveal.css';

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
    'boject-reveal',
    fadeIn && 'boject-reveal--fade-in',
    hasTransform && 'boject-reveal--transform',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const combinedStyle = {
    '--boject-reveal-duration': `${duration}ms`,
    '--boject-reveal-delay': `${delay}ms`,
    '--boject-reveal-distance': distance,
    '--boject-reveal-easing': easing,
    '--boject-reveal-transform': hasTransform
      ? directionMap[direction](distance)
      : undefined,
    ...(fadeIn && { opacity: 0 }),
    ...(hasTransform && {
      transform: directionMap[direction](distance),
    }),
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
