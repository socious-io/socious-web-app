import {render, screen} from '@testing-library/react';
import {ImpactBadge} from './impact-badge';
import '@testing-library/jest-dom';

describe('impact-badge', () => {
  test('should set proper badge color', () => {
    render(<ImpactBadge color="red" iconUrl="" />);
    const element = screen.getByRole('button');
    expect(element).toHaveStyle('background-color: red');
  });
});
