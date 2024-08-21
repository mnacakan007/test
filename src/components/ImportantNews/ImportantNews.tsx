import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { newsSelector } from '~/store/news/news.selector.ts';
import { uiRefresh } from '~/store/news/slice.ts';
import { useAppDispatch } from '~/store';
import SubscribeModal from '../Modals/Subscribe';
import CreateSkeleton from '../Skeleton';
import News from '~/components/News';
import './Style.scss';

const ImportantNews: React.FC = () => {
	const initialData = useSelector(newsSelector.initialData);
	const importantNews = initialData && initialData.important;
	const dispatch = useAppDispatch();

	const showSubscribeModal = () => {
		dispatch(uiRefresh({ showSubscribeModal: true }));
	};

	return (
		<div className="importnant_news">
			<h2 className="section_title icon_info"><FormattedMessage id="important"/></h2>
			{importantNews && importantNews.length > 0 ? (
				<>
					<ul className="news_list">
						{importantNews.map(news => (
							<li key={news.id}>
								<News news={news} width={''} height={''}/>
							</li>
						))}
					</ul>
					<button type="button" className="subscribe_btn icon_logo" aria-label="subscribe button" onClick={showSubscribeModal}>
						<FormattedMessage id="subscribe"/>
					</button>
				</>
			) : (
				<CreateSkeleton number={4} span={true}/>
			)}

			<SubscribeModal />
		</div>
	);
};

export default ImportantNews;