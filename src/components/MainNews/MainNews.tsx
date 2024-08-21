import React from 'react';
import { useSelector } from 'react-redux';
import CreateSkeleton from '../Skeleton';
import News from '~/components/News';
import { newsSelector } from '~/store/news/news.selector.ts';
import './Style.scss';

const MainNews: React.FC = () => {
	const initialData = useSelector(newsSelector.initialData);
	const mainNews = initialData && initialData.generalList;

	return (
		<div className="main_news">
			{mainNews && mainNews.length > 0 ? (
				<ul className="news_list">
					{mainNews.map(news => (
						<li key={news.id}>
							<News news={news} width={''} height={''}/>
						</li>
					))}
				</ul>
			) : (
				<CreateSkeleton number={3} span={true}/>
			)}
		</div>
	);
};

export default MainNews;