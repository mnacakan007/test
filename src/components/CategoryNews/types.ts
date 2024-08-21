import { CATEGORY_LIST_LOCATION } from '~/helpers/constants.ts';
import { IAuthor, INews } from '~/store/news/types.ts';

export interface CategoryBaseProps {
	newsList?: INews[];
}

export interface CategoryNewsProps extends CategoryBaseProps {
	categoryId?         : string;
	categoryListLocation: CATEGORY_LIST_LOCATION;
}

export interface CategoryNewsListProps extends CategoryNewsProps {}

export interface VideoNewsListProps extends CategoryBaseProps {}

export interface AuthorsListProps {
	authors: IAuthor[];
}