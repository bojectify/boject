import { render, screen } from '@testing-library/react';
import { Carousel } from './Carousel.js';

describe('Carousel', () => {
  it('renders children', () => {
    render(
      <Carousel>
        <Carousel.Slide>Slide 1</Carousel.Slide>
        <Carousel.Slide>Slide 2</Carousel.Slide>
      </Carousel>
    );
    expect(screen.getByText('Slide 1')).toBeTruthy();
    expect(screen.getByText('Slide 2')).toBeTruthy();
  });

  it('applies carousel class to container', () => {
    render(
      <Carousel data-testid="carousel">
        <Carousel.Slide>Slide 1</Carousel.Slide>
      </Carousel>
    );
    const el = screen.getByTestId('carousel');
    expect(el.className).toContain('boject-carousel');
  });

  it('applies slide class to slides', () => {
    render(
      <Carousel>
        <Carousel.Slide data-testid="slide">Slide 1</Carousel.Slide>
      </Carousel>
    );
    const el = screen.getByTestId('slide');
    expect(el.className).toContain('boject-carousel__slide');
  });

  it('sets accessibility attributes on container', () => {
    render(
      <Carousel data-testid="carousel" aria-label="Image gallery">
        <Carousel.Slide>Slide 1</Carousel.Slide>
      </Carousel>
    );
    const el = screen.getByTestId('carousel');
    expect(el.getAttribute('role')).toBe('region');
    expect(el.getAttribute('aria-roledescription')).toBe('carousel');
    expect(el.getAttribute('aria-label')).toBe('Image gallery');
    expect(el.getAttribute('tabindex')).toBe('0');
  });

  it('defaults aria-label to Carousel', () => {
    render(
      <Carousel data-testid="carousel">
        <Carousel.Slide>Slide 1</Carousel.Slide>
      </Carousel>
    );
    const el = screen.getByTestId('carousel');
    expect(el.getAttribute('aria-label')).toBe('Carousel');
  });

  it('sets accessibility attributes on slides', () => {
    render(
      <Carousel>
        <Carousel.Slide data-testid="slide">Slide 1</Carousel.Slide>
      </Carousel>
    );
    const el = screen.getByTestId('slide');
    expect(el.getAttribute('role')).toBe('group');
    expect(el.getAttribute('aria-roledescription')).toBe('slide');
  });

  it('merges custom className on container', () => {
    render(
      <Carousel data-testid="carousel" className="custom">
        <Carousel.Slide>Slide 1</Carousel.Slide>
      </Carousel>
    );
    const el = screen.getByTestId('carousel');
    expect(el.className).toContain('boject-carousel');
    expect(el.className).toContain('custom');
  });

  it('merges custom className on slide', () => {
    render(
      <Carousel>
        <Carousel.Slide data-testid="slide" className="custom-slide">
          Slide 1
        </Carousel.Slide>
      </Carousel>
    );
    const el = screen.getByTestId('slide');
    expect(el.className).toContain('boject-carousel__slide');
    expect(el.className).toContain('custom-slide');
  });

  it('spreads additional HTML attributes', () => {
    render(
      <Carousel data-testid="carousel" id="my-carousel">
        <Carousel.Slide data-testid="slide" id="slide-1">
          Slide 1
        </Carousel.Slide>
      </Carousel>
    );
    expect(screen.getByTestId('carousel').id).toBe('my-carousel');
    expect(screen.getByTestId('slide').id).toBe('slide-1');
  });
});
