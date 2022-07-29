/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from './';

describe('<Modal />', () => {
  test('renders with provided content', () => {
    render(
      <Modal onClose={() => undefined}>
        <p>Test</p>
      </Modal>,
    );
    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });

  test('should handle click by close button', () => {
    const onClose = jest.fn();
    const { getByRole } = render(
      <Modal onClose={onClose}>
        <p>Test</p>
      </Modal>,
    );
    fireEvent.click(getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });
});
