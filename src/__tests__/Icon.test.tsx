import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from '@/components/icon';

describe('Icon Component', () => {
  it('renders a search icon', () => {
    render(<Icon name="search" />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders a global icon', () => {
    render(<Icon name="global" />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders a chevron-down icon', () => {
    render(<Icon name="chevron-down" />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders a close-circle icon', () => {
    render(<Icon name="close-circle" />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('applies custom size to icon', () => {
    const customSize = 32;
    render(<Icon name="search" size={customSize} />);
    
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    
    // Check if the style attribute includes the custom size
    const pathElement = document.querySelector('path');
    const styleAttribute = pathElement?.parentElement?.getAttribute('style');
    
    expect(styleAttribute).toContain(`width: ${customSize}px`);
    expect(styleAttribute).toContain(`height: ${customSize}px`);
  });

  it('applies custom color to icon', () => {
    const customColor = 'red';
    render(<Icon name="search" color={customColor} />);
    
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    
    // Check if the style attribute includes the custom color
    const pathElement = document.querySelector('path');
    const styleAttribute = pathElement?.parentElement?.getAttribute('style');
    
    expect(styleAttribute).toContain(`fill: ${customColor}`);
  });
}); 