import React from 'react';
import { CategoryNewsListProps } from '~/components/CategoryNews/types.ts';
import News from '~/components/News';
import '../Style.scss';

const CategoryNewsList: React.FC<CategoryNewsListProps> = ({ newsList, categoryListLocation}) => {
	if (!newsList) return null;

	return (
		<ul className="news_list">
			{newsList?.length > 0 && newsList.map((news, index) => (
				<li key={news.id}>
					<News
						news={news}
						width={''}
						height={''}
						index={index}
						categoryListLocation={categoryListLocation}
					/>
				</li>
			))}
		</ul>
	);
};

export default CategoryNewsList;