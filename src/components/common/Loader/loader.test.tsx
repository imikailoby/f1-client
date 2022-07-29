/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { Loader } from './';

describe('<Loader />', () => {
  it('renders without crashing', () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});
