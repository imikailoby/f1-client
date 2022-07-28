/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import { store } from '../../utils/store';
import { AppContainer } from './';

const component = (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

describe('<AppContainer />', () => {
  it('renders without crashing', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot();
  });

  it('should set beforeunload event listener after mount', () => {
    const events: { [key: string]: EventListenerOrEventListenerObject | undefined } = {};
    jest.spyOn(window, 'addEventListener').mockImplementation((event, handle) => {
      events[event] = handle;
    });

    render(component);
    expect(window.addEventListener).toBeCalledWith('beforeunload', expect.any(Function));
  })
  it('should remove beforeunload event listener before unmount', () => {
    const events: { [key: string]: EventListenerOrEventListenerObject | undefined } = {};
    jest.spyOn(window, 'removeEventListener').mockImplementation((event) => {
      events[event] = undefined;
    });

    const wrapper = render(component);
    wrapper.unmount();
    expect(window.removeEventListener).toBeCalledWith('beforeunload', expect.any(Function));
  })
});
