import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '~/app/App';
import store from '~/store';
import './index.scss';

const container: HTMLElement | null = document.getElementById('root');

if (!container) {
	throw new Error(
		'The root container was not found. Failed to mount react application'
	);
}

const root = ReactDOM.createRoot(container);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
