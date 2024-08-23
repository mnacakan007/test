import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { CategoryBaseProps } from '~/components/CategoryNews/types.ts';
import News from '~/components/News';
import { CATEGORY_LIST_LOCATION } from '~/helpers/constants.ts';
import useWindowSize from '~/hooks/useWindowSize';
import { newsSelector } from '~/store/news/news.selector.ts';
import '../Style.scss';

const VideoNewsList: React.FC<CategoryBaseProps> = ({ newsList }) => {
	const initialData = useSelector(newsSelector.initialData);
	const { selectedVideoNewsId } = useSelector(newsSelector.UI);
	const videoNews = newsList || initialData && initialData.videoNews;
	const windowSize = useWindowSize();
	const [showMoreLink, setShowMoreLink] = useState(false);
	const newsListRef	= useRef<HTMLUListElement | null>(null);
	const newsItemRef	= useRef<{ [key: string]: HTMLLIElement | null }>({});
	const params = useParams<{ hash: string }>();
	const { hash } = params;

	useEffect(() => {
		setShowMoreLink(windowSize < 576);
	},[windowSize]);

	useEffect(() => {
		if (hash && videoNews && videoNews?.length) {
			const list	= newsListRef.current;
			const element	= newsItemRef.current[hash];

			if (element && list) {
				const scrollTop = element.offsetTop - 20;
				list.scrollTo({ top: scrollTop });
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hash, selectedVideoNewsId]);

	return (
		videoNews && videoNews.length > 0 && (
			<>
				<ul className="news_list" ref={newsListRef}>
					{videoNews.map(news => (
						<li 
							key={news.id}
							id={String(news.id)}
							ref={(ref) => {
								if (ref) newsItemRef.current[news.id] = ref;
							}}
						>
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