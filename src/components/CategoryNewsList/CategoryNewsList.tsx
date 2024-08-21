import React from 'react';
import { useSelector } from 'react-redux';
import CategoryNews from '~/components/CategoryNews';
import { CATEGORY_LIST_LOCATION } from '~/helpers/constants.ts';
import { newsSelector } from '~/store/news/news.selector.ts';
import './Style.scss';

const CategoryNewsList: React.FC = () => {
	const initialData = useSelector(newsSelector.initialData);
	const categoriesNews = initialData && initialData.categoriesNews;

	if (!categoriesNews) {
		return <div>No news available</div>;
	}

	return (
		<>
			{Object.keys(categoriesNews).map(categoryId => (
				<CategoryNews
					key={categoryId}
					categoryId={categoryId}
					newsList={categoriesNews[categoryId]}
					categoryListLocation={CATEGORY_LIST_LOCATION.HOME_PAGE} />
			))}
		</>
	)
	;
};

export default CategoryNewsList;