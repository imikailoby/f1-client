/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react'
import { Footer } from './';

describe('<Footer />', () => {
  it('renders without crashing', () => {
    const { container } = render(<Footer />)
    expect(container).toMatchSnapshot();
  });
});
