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

function Slide({ index, label }: { index: number; label?: string }) {
  return (
    <Carousel.Slide>
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
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <Carousel>
      <Slide index={0} />
      <Slide index={1} />
      <Slide index={2} />
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
