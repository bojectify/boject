import type { Meta, StoryObj } from '@storybook/react';
import { Reveal } from './Reveal.js';

const boxStyle = {
  padding: '2rem',
  background: '#3498db',
  color: '#fff',
  borderRadius: '8px',
  fontFamily: 'sans-serif',
  fontSize: '1.25rem',
  textAlign: 'center' as const,
};

const meta: Meta<typeof Reveal> = {
  title: 'Components/Reveal',
  component: Reveal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Reveal>;

export const Default: Story = {
  render: () => (
    <Reveal>
      <div style={boxStyle}>Fade + Slide Up</div>
    </Reveal>
  ),
};

export const DirectionUp: Story = {
  name: 'Direction: Up',
  render: () => (
    <Reveal distance="36px" direction="up">
      <div style={boxStyle}>Slide Up</div>
    </Reveal>
  ),
};

export const DirectionDown: Story = {
  name: 'Direction: Down',
  render: () => (
    <Reveal distance="36px" direction="down">
      <div style={boxStyle}>Slide Down</div>
    </Reveal>
  ),
};

export const DirectionLeft: Story = {
  name: 'Direction: Left',
  render: () => (
    <Reveal distance="36px" direction="left">
      <div style={boxStyle}>Slide Left</div>
    </Reveal>
  ),
};

export const DirectionRight: Story = {
  name: 'Direction: Right',
  render: () => (
    <Reveal distance="36px" direction="right">
      <div style={boxStyle}>Slide Right</div>
    </Reveal>
  ),
};

export const FadeOnly: Story = {
  name: 'Fade Only (no slide)',
  render: () => (
    <Reveal distance="0">
      <div style={boxStyle}>Fade In Only</div>
    </Reveal>
  ),
};

export const SlideOnly: Story = {
  name: 'Slide Only (no fade)',
  render: () => (
    <Reveal distance="36px" fadeIn={false}>
      <div style={boxStyle}>Slide Only</div>
    </Reveal>
  ),
};

export const SlowDuration: Story = {
  name: 'Slow Duration (2s)',
  render: () => (
    <Reveal distance="36px" duration={2000}>
      <div style={boxStyle}>Slow Animation</div>
    </Reveal>
  ),
};

export const WithDelay: Story = {
  name: 'Delayed Start (500ms)',
  render: () => (
    <Reveal distance="36px" delay={500}>
      <div style={boxStyle}>Delayed Reveal</div>
    </Reveal>
  ),
};

export const CustomElement: Story = {
  name: 'As <section>',
  render: () => (
    <Reveal distance="36px" as="section">
      <div style={boxStyle}>Rendered as a section element</div>
    </Reveal>
  ),
};
