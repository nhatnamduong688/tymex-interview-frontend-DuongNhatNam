import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { StyledForm, FilterStatus, FilterSummary } from '../filter.styled';

describe('Styled Components', () => {
  test('StyledForm renders correctly', () => {
    const { container } = render(<StyledForm />);
    expect(container.firstChild).toHaveStyleRule('background', '#3a384199 !important');
    expect(container.firstChild).toHaveStyleRule('border-radius', '10px');
    expect(container.firstChild).toHaveStyleRule('display', 'flex');
    expect(container.firstChild).toHaveStyleRule('flex-direction', 'column');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('FilterStatus renders correctly', () => {
    const { container } = render(<FilterStatus>Loading...</FilterStatus>);
    expect(container.firstChild).toHaveStyleRule('margin-top', '8px');
    expect(container.firstChild).toHaveStyleRule('padding', '8px');
    expect(container.firstChild).toHaveStyleRule('border-radius', '6px');
    expect(container.firstChild).toHaveStyleRule('background-color', 'rgba(0,0,0,0.1)');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('FilterSummary renders correctly', () => {
    const { container } = render(
      <FilterSummary>
        <h4>Current Filters</h4>
        <ul>
          <li>Filter 1</li>
          <li>Filter 2</li>
        </ul>
      </FilterSummary>
    );
    expect(container.firstChild).toHaveStyleRule('display', 'flex');
    expect(container.firstChild).toHaveStyleRule('flex-direction', 'column');
    expect(container.firstChild).toHaveStyleRule('gap', '6px');
    expect(container.firstChild).toHaveStyleRule('background-color', 'rgba(0,0,0,0.05)');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('StyledForm has responsive styles for mobile', () => {
    const { container } = render(<StyledForm />);
    expect(container.firstChild).toHaveStyleRule('padding', '8px !important', {
      media: '(max-width: 576px)'
    });
  });
}); 