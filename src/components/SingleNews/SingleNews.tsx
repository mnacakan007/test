import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useRootAppNavigate } from '~/hooks/useAppNavigate.ts';
import { newsSelector } from '~/store/news/news.selector.ts';
import { INews } from '~/store/news/types.ts';
import News from '~/components/News';
import './Style.scss';

const SingleNews: React.FC = () => {
	const [news, setNews] = useState<INews | null>(null);
	const categoryNews = useSelector(newsSelector.categoryNews);
	const { year, month, day, id } = useParams();
	const navigate = useRootAppNavigate();

	useEffect(() => {
		const isValidNumber = (param: string) => /^\d+$/.test(param);

		// Check if any of the numeric parameters are invalid
		if (
			year && !isValidNumber(year) ||
			month && !isValidNumber(month) ||
			day && !isValidNumber(day) ||
			id && !isValidNumber(id)
		) {
			navigate('404');
		}

		if (categoryNews && id) {
			const selectedNews = categoryNews?.find(newsItem => newsItem.id === +id);

			if (selectedNews) {
				setNews(selectedNews);
			}
		}
		// eslint-disable-next-line
	}, [year, month, day, id, navigate]);

	return (
		<div className='single_news'>
			{news && (
				<News news={news} width={''} height={''} />
			)}
		</div>
	);
};

export default SingleNews;