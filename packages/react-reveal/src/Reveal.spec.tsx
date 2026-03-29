import { render, screen } from '@testing-library/react';
import { Reveal } from './Reveal.js';
import * as css from './Reveal.css.js';

/** Strip `var(--x)` → `--x` to match the inline style property name. */
const prop = (v: string) => v.slice(4, -1);

describe('Reveal', () => {
  it('renders children', () => {
    render(<Reveal>Hello</Reveal>);
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('renders as a div by default', () => {
    render(<Reveal data-testid="reveal">Hello</Reveal>);
    const el = screen.getByTestId('reveal');
    expect(el.tagName).toBe('DIV');
  });

  it('renders as a custom element', () => {
    render(
      <Reveal as="section" data-testid="reveal">
        Hello
      </Reveal>
    );
    const el = screen.getByTestId('reveal');
    expect(el.tagName).toBe('SECTION');
  });

  it('applies fade class when fadeIn is true', () => {
    render(
      <Reveal data-testid="reveal" fadeIn>
        Hello
      </Reveal>
    );
    const el = screen.getByTestId('reveal');
    expect(el.className).toContain(css.fadeIn);
  });

  it('does not apply fade class when fadeIn is false', () => {
    render(
      <Reveal data-testid="reveal" fadeIn={false}>
        Hello
      </Reveal>
    );
    const el = screen.getByTestId('reveal');
    expect(el.className).not.toContain(css.fadeIn);
  });

  it('applies transform class when distance is non-zero', () => {
    render(
      <Reveal data-testid="reveal" distance="50px">
        Hello
      </Reveal>
    );
    const el = screen.getByTestId('reveal');
    expect(el.className).toContain(css.transform);
  });

  it('does not apply transform class when distance is 0', () => {
    render(
      <Reveal data-testid="reveal" distance="0">
        Hello
      </Reveal>
    );
    const el = screen.getByTestId('reveal');
    expect(el.className).not.toContain(css.transform);
  });

  it('sets CSS custom properties from props', () => {
    render(
      <Reveal data-testid="reveal" duration={400} delay={100} distance="50px">
        Hello
      </Reveal>
    );
    const el = screen.getByTestId('reveal');
    expect(el.style.getPropertyValue(prop(css.duration))).toBe('400ms');
    expect(el.style.getPropertyValue(prop(css.delay))).toBe('100ms');
  });

  it('sets easing CSS custom property from prop', () => {
    render(
      <Reveal data-testid="reveal" easing="cubic-bezier(0.4, 0, 0.2, 1)">
        Hello
      </Reveal>
    );
    const el = screen.getByTestId('reveal');
    expect(el.style.getPropertyValue(prop(css.easing))).toBe(
      'cubic-bezier(0.4, 0, 0.2, 1)'
    );
  });

  it('defaults easing to ease-out', () => {
    render(<Reveal data-testid="reveal">Hello</Reveal>);
    const el = screen.getByTestId('reveal');
    expect(el.style.getPropertyValue(prop(css.easing))).toBe('ease-out');
  });

  it('sets correct transform for each direction', () => {
    const { rerender } = render(
      <Reveal data-testid="reveal" direction="up" distance="36px">
        Up
      </Reveal>
    );
    expect(
      screen
        .getByTestId('reveal')
        .style.getPropertyValue(prop(css.initialTransform))
    ).toBe('translateY(36px)');

    rerender(
      <Reveal data-testid="reveal" direction="down" distance="36px">
        Down
      </Reveal>
    );
    expect(
      screen
        .getByTestId('reveal')
        .style.getPropertyValue(prop(css.initialTransform))
    ).toBe('translateY(-36px)');

    rerender(
      <Reveal data-testid="reveal" direction="left" distance="36px">
        Left
      </Reveal>
    );
    expect(
      screen
        .getByTestId('reveal')
        .style.getPropertyValue(prop(css.initialTransform))
    ).toBe('translateX(36px)');

    rerender(
      <Reveal data-testid="reveal" direction="right" distance="36px">
        Right
      </Reveal>
    );
    expect(
      screen
        .getByTestId('reveal')
        .style.getPropertyValue(prop(css.initialTransform))
    ).toBe('translateX(-36px)');
  });

  it('merges custom className', () => {
    render(
      <Reveal data-testid="reveal" className="custom">
        Hello
      </Reveal>
    );
    const el = screen.getByTestId('reveal');
    expect(el.className).toContain(css.reveal);
    expect(el.className).toContain('custom');
  });

  it('spreads additional HTML attributes', () => {
    render(
      <Reveal data-testid="reveal" aria-label="animated">
        Hello
      </Reveal>
    );
    const el = screen.getByTestId('reveal');
    expect(el.getAttribute('aria-label')).toBe('animated');
  });
});
