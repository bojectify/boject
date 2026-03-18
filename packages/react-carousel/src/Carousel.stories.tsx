import type { Meta, StoryObj } from '@storybook/react';
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
};

export const PartialSlideWidth: Story = {
  name: 'Partial Slide Width (80%)',
  render: () => (
    <div style={{ ['--boject-carousel-slide-width' as string]: '80%' }}>
      <Carousel>
        <Slide index={0} />
        <Slide index={1} />
        <Slide index={2} />
        <Slide index={3} />
        <Slide index={4} />
      </Carousel>
    </div>
  ),
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
    <div
      style={{
        ['--boject-carousel-slide-width' as string]: '80%',
        ['--boject-carousel-gap' as string]: '32px',
      }}
    >
      <Carousel>
        <Slide index={0} />
        <Slide index={1} />
        <Slide index={2} />
        <Slide index={3} />
      </Carousel>
    </div>
  ),
};
