import { createElement } from 'react';
import type { RevealProps, Direction } from './Reveal.types.js';
import './styles.css';

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
  distance = '36px',
  duration = 800,
  delay = 0,
  fadeIn = true,
  className,
  style,
  ...rest
}: RevealProps) {
  const hasSlide = distance !== '0' && distance !== '0px';

  const classes = [
    'boject-reveal',
    fadeIn && 'boject-reveal--fade',
    hasSlide && 'boject-reveal--slide',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const combinedStyle = {
    '--boject-reveal-duration': `${duration}ms`,
    '--boject-reveal-delay': `${delay}ms`,
    '--boject-reveal-distance': distance,
    ...(hasSlide ? { transform: directionMap[direction](distance) } : {}),
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
