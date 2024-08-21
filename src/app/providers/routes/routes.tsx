import { RouterProvider } from 'react-router-dom';
import { createRouterData } from './browserRoutes';
import { storeReferer } from '~/helpers/localStorageUtils.ts';

const check_external_link = () => {
	const { search } = window.location;
	if (search && search.includes('utm_source', 0)) {
		const filter = search.replace('?', '');
		storeReferer(filter);
		window.location.search = '';
	}
};

const AppRoutes = () => {
	check_external_link();
	const routerData = createRouterData();
	return <RouterProvider router={routerData} />;
};

export default AppRoutes;
