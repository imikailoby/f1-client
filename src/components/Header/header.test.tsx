/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { Header } from './';

describe('<Header />', () => {
  it('renders without crashing', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
