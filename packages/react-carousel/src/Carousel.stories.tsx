import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Carousel } from './Carousel.js';

const slideStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '200px',
  fontSize: '1.5rem',
  fontFamily: 'sans-serif',
  color: '#fff',
  borderRadius: '8px',
};

const colors = [
  '#e74c3c',
  '#3498db',
  '#2ecc71',
  '#f39c12',
  '#9b59b6',
  '#1abc9c',
];

function Slide({
  index,
  label,
  'aria-label': ariaLabel,
}: {
  index: number;
  label?: string;
  'aria-label'?: string;
}) {
  return (
    <Carousel.Slide aria-label={ariaLabel}>
      <div
        style={{
          ...slideStyle,
          backgroundColor: colors[index % colors.length],
        }}
      >
        {label ?? `Slide ${index + 1}`}
      </div>
    </Carousel.Slide>
  );
}

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
        .container {
          box-sizing: border-box;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 8px;

          @media (min-width: 640px) {
            padding: 0 16px;
          }
        }
      `}</style>
        <div className="container">
          <Story />
        </div>
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <Carousel>
      <Slide index={0} aria-label="1 of 3" />
      <Slide index={1} aria-label="2 of 3" />
      <Slide index={2} aria-label="3 of 3" />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // renders children
    await expect(canvas.getByText('Slide 1')).toBeInTheDocument();
    await expect(canvas.getByText('Slide 2')).toBeInTheDocument();
    await expect(canvas.getByText('Slide 3')).toBeInTheDocument();

    // carousel class and accessibility attributes
    const carousel = canvas.getByRole('region');
    await expect(carousel.className).toContain('boject-carousel');
    await expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    await expect(carousel).toHaveAttribute('aria-label', 'Carousel');
    await expect(carousel).toHaveAttribute('tabindex', '0');

    // CSS custom properties fall back to defaults when props are omitted
    const computedStyle = getComputedStyle(carousel);
    await expect(computedStyle.getPropertyValue('--boject-carousel-gap')).toBe(
      '16px'
    );
    await expect(
      computedStyle.getPropertyValue('--boject-carousel-slide-width')
    ).toBe('100%');

    // slide class and accessibility attributes
    const slides = canvas.getAllByRole('group');
    await expect(slides).toHaveLength(3);
    for (const slide of slides) {
      await expect(slide.className).toContain('boject-carousel__slide');
      await expect(slide).toHaveAttribute('aria-roledescription', 'slide');
    }
  },
};

export const ManySlides: Story = {
  render: () => (
    <Carousel>
      {Array.from({ length: 8 }, (_, i) => (
        <Slide key={i} index={i} />
      ))}
    </Carousel>
  ),
};

export const CustomAriaLabel: Story = {
  name: 'Custom aria-label',
  render: () => (
    <Carousel aria-label="Image gallery">
      <Slide index={0} label="Photo 1" />
      <Slide index={1} label="Photo 2" />
      <Slide index={2} label="Photo 3" />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const carousel = canvas.getByRole('region');
    await expect(carousel).toHaveAttribute('aria-label', 'Image gallery');
  },
};

export const PartialSlideWidth: Story = {
  name: 'Partial Slide Width (80%)',
  render: () => (
    <Carousel slideWidth="80%">
      <Slide index={0} />
      <Slide index={1} />
      <Slide index={2} />
      <Slide index={3} />
      <Slide index={4} />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const carousel = canvas.getByRole('region');
    await expect(
      carousel.style.getPropertyValue('--boject-carousel-slide-width')
    ).toBe('80%');
  },
};

export const ResponsiveSlides: Story = {
  name: 'Responsive (1 → 2 → 3 per breakpoint)',
  render: () => (
    <>
      <style>{`
        .responsive-carousel {
          --boject-carousel-slide-width: 100%;
        }
        @media (min-width: 640px) {
          .responsive-carousel {
            --boject-carousel-slide-width: calc((50% - var(--boject-carousel-gap) / 2) - 5%);
          }
        }
        @media (min-width: 1024px) {
          .responsive-carousel {
            --boject-carousel-slide-width: calc(33.333% - var(--boject-carousel-gap) * 2 / 3);
          }
        }
      `}</style>
      <Carousel className="responsive-carousel">
        {Array.from({ length: 6 }, (_, i) => (
          <Slide key={i} index={i} />
        ))}
      </Carousel>
    </>
  ),
};

export const CustomGap: Story = {
  name: 'Custom Gap (32px)',
  render: () => (
    <Carousel slideWidth="80%" gap="32px">
      <Slide index={0} />
      <Slide index={1} />
      <Slide index={2} />
      <Slide index={3} />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const carousel = canvas.getByRole('region');
    await expect(
      carousel.style.getPropertyValue('--boject-carousel-slide-width')
    ).toBe('80%');
    await expect(carousel.style.getPropertyValue('--boject-carousel-gap')).toBe(
      '32px'
    );
  },
};
