import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppContainer } from './components/AppContainer';
import { store } from './utils/store';
import './lib/reset.css';
import './styles/index.scss';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
