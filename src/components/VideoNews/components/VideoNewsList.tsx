import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CategoryBaseProps } from '~/components/CategoryNews/types.ts';
import News from '~/components/News';
import { CATEGORY_LIST_LOCATION } from '~/helpers/constants.ts';
import useWindowSize from '~/hooks/useWindowSize';
import { newsSelector } from '~/store/news/news.selector.ts';
import '../Style.scss';

const VideoNewsList: React.FC<CategoryBaseProps> = ({ newsList }) => {
	const initialData = useSelector(newsSelector.initialData);
	const videoNews = newsList || initialData && initialData.videoNews;
	const windowSize = useWindowSize();
	const [showMoreLink, setShowMoreLink] = useState(false);

	useEffect(() => {
		setShowMoreLink(windowSize < 576);
	},[windowSize]);

	return (
		videoNews && videoNews.length > 0 && (
			<>
				<ul className="news_list">
					{videoNews.map(news => (
						<li key={news.id}>
							<News news={news} width={''} height={''} categoryListLocation={CATEGORY_LIST_LOCATION.VIDEO_PAGE} />
						</li>
					))}
				</ul>

				{showMoreLink && (
					<Link
						to={''}
						className="more_link"
					>
						<FormattedMessage id='view_all'/>
					</Link>
				)}
			</>
		)
	
	);
};

export default VideoNewsList;