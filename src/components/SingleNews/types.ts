import { INews } from '~/store/news/types.ts';

export interface CategoryNewsProps {
	categoryId?        : string;
	homeCategoriesList?: boolean;
	categoriesListPage?: boolean;
	newsList           : INews[];
}