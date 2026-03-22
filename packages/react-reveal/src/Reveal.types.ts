import type { ElementType, HTMLAttributes, ReactNode } from 'react';

export const REVEAL_DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type Direction =
  (typeof REVEAL_DIRECTIONS)[keyof typeof REVEAL_DIRECTIONS];

type Easing =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | `cubic-bezier(${string})`
  | `steps(${string})`;

type CssUnit =
  | 'px'
  | 'em'
  | 'rem'
  | 'vh'
  | 'vw'
  | 'svh'
  | 'svw'
  | 'dvh'
  | 'dvw'
  | 'lvh'
  | 'lvw'
  | '%'
  | 'vmin'
  | 'vmax'
  | 'ch'
  | 'ex'
  | 'cap'
  | 'ic'
  | 'lh'
  | 'rlh'
  | 'cqw'
  | 'cqh'
  | 'cqi'
  | 'cqb'
  | 'cqmin'
  | 'cqmax';

export type RevealProps = {
  as?: ElementType;
  children?: ReactNode;
  direction?: Direction;
  distance?: '0' | `${number}${CssUnit}` | null;
  duration?: number;
  delay?: number;
  easing?: Easing;
  fadeIn?: boolean;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'className'>;
