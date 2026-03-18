import type { HTMLAttributes, ReactNode } from 'react';

export type CarouselProps = {
  children: ReactNode;
  'aria-label'?: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'aria-label'>;

export type SlideProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'className'>;
