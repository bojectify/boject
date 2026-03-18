import type { ElementType, HTMLAttributes, ReactNode } from 'react';

export type Direction = 'up' | 'down' | 'left' | 'right';

export type RevealProps = {
  as?: ElementType;
  children?: ReactNode;
  direction?: Direction;
  distance?: string;
  duration?: number;
  delay?: number;
  fadeIn?: boolean;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'className'>;
