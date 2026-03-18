import type { CarouselProps } from './Carousel.types.js';
import { Slide } from './Slide.js';
import './styles.css';

function CarouselRoot({
  children,
  'aria-label': ariaLabel = 'Carousel',
  className,
  ...rest
}: CarouselProps) {
  const classes = ['boject-carousel', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      {...rest}
    >
      {children}
    </div>
  );
}

export const Carousel = Object.assign(CarouselRoot, { Slide });
