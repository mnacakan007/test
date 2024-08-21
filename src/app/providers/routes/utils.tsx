import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { ErrorElement } from '~/app/providers/ErrorBoundary/ui/ErrorElement.tsx';
import { cloneDeep } from 'lodash';
import AuthorPage from '~/pages/AuthorPage/ui/AuthorPage.tsx';
import { CategoryPage } from '~/pages/CategoryPage';
import { HomePage } from '~/pages/HomePage';
import HotFoundPage from '~/pages/HotFoundPage/ui/HotFoundPage.tsx';
import NewsInnerPage from '~/pages/NewsInnerPage/ui/NewsInnerPage.tsx';

export const ROUTE_PATH = {
	root                : '/',
	medicine            : 'medicine',
	life                : 'life',
	category            : ':category',
	author              : 'author/:id',
	noMatch             : '*',
	errorPage           : '404',
	home                : '/',
	help                : 'help',
	selectedNews        : 'news/:year/:month/:day/:category/:id',
	selectedMedicineNews: 'medicine/news/:year/:month/:day/:category/:id',
	selectedLifeNews    : 'life/news/:year/:month/:day/:category/:id',
	newsCategory        : 'news/:category',
	medicineCategory    : 'medicine/news/:category',
	lifeCategory        : 'life/news/:category',
};

export const AllRoutes = [
	{
		path        : ROUTE_PATH.home,
		element     : (<Suspense><HomePage /></Suspense>),
		errorElement: <ErrorElement id={ROUTE_PATH.home} />,
	},
	{
		path        : ROUTE_PATH.medicine,
		element     : (<Suspense><HomePage /></Suspense>),
		errorElement: <ErrorElement id={ROUTE_PATH.medicine} />,
	},
	{
		path        : ROUTE_PATH.life,
		element     : (<Suspense><HomePage /></Suspense>),
		errorElement: <ErrorElement id={ROUTE_PATH.life} />,
	},
	{
		path        : ROUTE_PATH.category,
		element     : (<Suspense><CategoryPage /></Suspense>),
		errorElement: <ErrorElement id={ROUTE_PATH.category} />,
	},
	{
		path        : ROUTE_PATH.selectedNews,
		element     : <NewsInnerPage />,
		errorElement: (<Suspense><NewsInnerPage /></Suspense>),
	},
	{
		path        : ROUTE_PATH.selectedMedicineNews,
		element     : <NewsInnerPage />,
		errorElement: (<Suspense><NewsInnerPage /></Suspense>),
	},
	{
		path        : ROUTE_PATH.selectedLifeNews,
		element     : <NewsInnerPage />,
		errorElement: (<Suspense><NewsInnerPage /></Suspense>),
	},
	{
		path        : ROUTE_PATH.newsCategory,
		element     : (<Suspense><CategoryPage /></Suspense>),
		errorElement: <ErrorElement id={ROUTE_PATH.newsCategory} />,
	},
	{
		path        : ROUTE_PATH.author,
		element     : (<Suspense><AuthorPage /></Suspense>),
		errorElement: <ErrorElement id={ROUTE_PATH.author} />,
	},
	{
		path        : ROUTE_PATH.medicineCategory,
		element     : (<Suspense><CategoryPage /></Suspense>),
		errorElement: <ErrorElement id={ROUTE_PATH.medicineCategory} />,
	},
	{
		path        : ROUTE_PATH.lifeCategory,
		element     : (<Suspense><CategoryPage /></Suspense>),
		errorElement: <ErrorElement id={ROUTE_PATH.lifeCategory} />,
	},
	{
		path        : ROUTE_PATH.errorPage,
		element     : (<Suspense><HotFoundPage /></Suspense>),
		errorElement: (<Suspense><HotFoundPage /></Suspense>),
	},
	{
		path        : ROUTE_PATH.noMatch,
		exact       : true,
		element     : <Navigate to={ROUTE_PATH.errorPage} />,
		errorElement: (<Suspense><HotFoundPage /></Suspense>),
	},
];

export function getAbsolutePaths() {
	const clonePath = cloneDeep(ROUTE_PATH);
	const pathArray = Object.values(clonePath);
	return pathArray.map((item) => {
		if (item.includes(':')) {
			const index = item.indexOf(':');
			return item.slice(0, index);
		} else {
			return item;
		}
	});
}
