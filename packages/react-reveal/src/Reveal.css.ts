import { style, keyframes, createVar, globalStyle } from '@vanilla-extract/css';

export const duration = createVar();
export const delay = createVar();
export const easing = createVar();
export const initialTransform = createVar();

const fadeInKeyframes = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const transformKeyframes = keyframes({
  '100%': { transform: 'translate(0)' },
});

export const reveal = style({
  animationDuration: duration,
  animationDelay: delay,
  animationTimingFunction: easing,
  animationIterationCount: 1,
  animationFillMode: 'forwards',
});

export const fadeIn = style({
  opacity: 0,
  animationName: fadeInKeyframes,
});

export const transform = style({
  transform: initialTransform,
  animationName: transformKeyframes,
});

globalStyle(`${fadeIn}${transform}`, {
  animationName: `${fadeInKeyframes}, ${transformKeyframes}`,
});
