import type { HTMLAttributes, ReactNode } from 'react';

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

type CssLength = `${number}${CssUnit}`;

type CssColor =
  | `#${string}`
  | `rgb(${string})`
  | `rgba(${string})`
  | `hsl(${string})`
  | `hsla(${string})`
  | `oklch(${string})`
  | `oklab(${string})`
  | `color(${string})`
  | `light-dark(${string})`
  | 'currentColor'
  | 'transparent'
  | 'inherit';

type CssOpacity = `${number}`;

type CssBorderStyle =
  | 'none'
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'
  | 'hidden';

type CssBorder =
  | CssBorderStyle
  | `${CssLength} ${CssBorderStyle}`
  | `${CssLength} ${CssBorderStyle} ${CssColor}`
  | `${CssBorderStyle} ${CssColor}`
  | '0';

type SnapAlign = 'start' | 'center' | 'end' | 'none';

export type CarouselProps = {
  children: ReactNode;
  'aria-label'?: string;
  className?: string;
  gap?: CssLength;
  slideWidth?: CssLength | `${number}%`;
  snapAlign?: SnapAlign;
  buttonSize?: CssLength;
  buttonColor?: CssColor;
  indicatorSize?: CssLength;
  indicatorColor?: CssColor;
  indicatorActiveColor?: CssColor;
  scrollButtonOpacityEnabled?: CssOpacity;
  scrollButtonOpacityHover?: CssOpacity;
  scrollButtonOpacityFocus?: CssOpacity;
  scrollButtonOpacityDisabled?: CssOpacity;
  scrollButtonInset?: CssLength;
  scrollButtonBackground?: CssColor;
  scrollButtonBackgroundHover?: CssColor;
  scrollButtonBackgroundActive?: CssColor;
  scrollButtonBackgroundDisabled?: CssColor;
  scrollButtonBackgroundFocus?: CssColor;
  scrollButtonBorder?: CssBorder;
  scrollButtonBorderHover?: CssBorder;
  scrollButtonBorderActive?: CssBorder;
  scrollButtonBorderDisabled?: CssBorder;
  scrollButtonBorderFocus?: CssBorder;
  scrollButtonBorderRadius?: CssLength;
  scrollButtonWidth?: CssLength;
  scrollButtonHeight?: CssLength;
  scrollButtonPadding?: CssLength | `${CssLength} ${CssLength}`;
  scrollButtonPrevContent?: string;
  scrollButtonNextContent?: string;
  scrollButtonPrevLabel?: string;
  scrollButtonNextLabel?: string;
  indicatorGap?: CssLength;
  indicatorPaddingBlock?: CssLength;
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'aria-label'>;

export type SlideProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'className'>;
