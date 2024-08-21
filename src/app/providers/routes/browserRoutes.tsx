import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { HotFoundPage } from '~/pages/HotFoundPage';
import { AllRoutes, ROUTE_PATH } from './utils';
import { RouterDistributor } from '~/components/RouterDistributor/RouterDistributor.tsx';
import { ErrorPage } from '~/pages/ErrorPage';
import { ErrorElement } from '../ErrorBoundary/ui/ErrorElement';
import Root from '~/root';

export const routerData = [
	{
		path        : ROUTE_PATH.root,
		exact       : true,
		element     : <RouterDistributor />,
		errorElement: <ErrorElement id={ROUTE_PATH.root} />,
	},
	{
		path        : ROUTE_PATH.errorPage,
		exact       : true,
		element     : <ErrorPage />,
		errorElement: <HotFoundPage />,
	},
	{
		path        : ROUTE_PATH.noMatch,
		exact       : true,
		element     : <Navigate to={ROUTE_PATH.errorPage} />,
		errorElement: <HotFoundPage />,
	},
	{
		path        : ROUTE_PATH.home,
		exact       : true,
		element     : <Root />,
		errorElement: <ErrorElement id={ROUTE_PATH.home} />,
		children    : AllRoutes, // This is a Template and changes at createRouterData function.
	},
];

export const createRouterData = () => {
	const data: RouteObject[] = routerData.map((item) => {
		if (item.path === ROUTE_PATH.home) {
			return {
				...item,
				children: AllRoutes,
			};
		}
		return item;
	});
	return createBrowserRouter(data);
};

//  { baseName: 'en'}
const router = createBrowserRouter(routerData);

export { router };
