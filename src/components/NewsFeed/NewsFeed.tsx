import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { newsSelector } from '~/store/news/news.selector.ts';
import News from '~/components/News';
import CreateSkeleton from '../Skeleton';
import './Style.scss';

const NewsFeed: React.FC = () => {
	const initialData = useSelector(newsSelector.initialData);
	const { showNewsFeed } = useSelector(newsSelector.UI);
	const newsFeed = initialData && initialData.newsFeed;

	return (
		<div className={`news_feed ${showNewsFeed ? 'opened' : ''}`}>
			<h2 className="section_title icon_news">
				<FormattedMessage id="newsfeed"/>
			</h2>
			{newsFeed && newsFeed.length > 0 ? (
				<div className="news_list">
					{newsFeed.map(news => (
						<News news={news} width={''} height={''} key={news.id}/>
					))}

					<div className="subscribe_btns">
						<a href="https://www.youtube.com/@tertlife" className="youtube_btn" target="_blank" rel="noreferrer">Subscribe</a>
						<a href="https://t.me/tertamarm" className="telegram_btn" target="_blank" rel="noreferrer">Join</a>
					</div>
				</div>
			):(
				<CreateSkeleton number={7} span={true} />
			)}
		</div>
	);
};

export default NewsFeed;