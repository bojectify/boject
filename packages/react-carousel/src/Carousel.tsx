import type { CarouselProps } from './Carousel.types.js';
import { Slide } from './Slide.js';
import './Carousel.css';

const toVar = (prop: string) =>
  `--boject-carousel-${prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;

function CarouselRoot({
  children,
  'aria-label': ariaLabel = 'Carousel',
  className,
  gap,
  slideWidth,
  snapAlign,
  buttonSize,
  buttonColor,
  indicatorSize,
  indicatorColor,
  indicatorActiveColor,
  scrollButtonOpacityEnabled,
  scrollButtonOpacityHover,
  scrollButtonOpacityFocus,
  scrollButtonOpacityDisabled,
  scrollButtonInset,
  indicatorGap,
  indicatorPaddingBlock,
  style,
  ...rest
}: CarouselProps) {
  const classes = ['boject-carousel', className].filter(Boolean).join(' ');

  const props: Record<string, string | undefined> = {
    gap,
    slideWidth,
    snapAlign,
    buttonSize,
    buttonColor,
    indicatorSize,
    indicatorColor,
    indicatorActiveColor,
    scrollButtonOpacityEnabled,
    scrollButtonOpacityHover,
    scrollButtonOpacityFocus,
    scrollButtonOpacityDisabled,
    scrollButtonInset,
    indicatorGap,
    indicatorPaddingBlock,
  };

  const cssVars: Record<string, string> = {};
  for (const [prop, value] of Object.entries(props)) {
    if (value !== undefined) {
      cssVars[toVar(prop)] = value;
    }
  }

  const combinedStyle = { ...cssVars, ...style };

  return (
    <div
      className={classes}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      style={Object.keys(combinedStyle).length > 0 ? combinedStyle : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}

export const Carousel = Object.assign(CarouselRoot, { Slide });
