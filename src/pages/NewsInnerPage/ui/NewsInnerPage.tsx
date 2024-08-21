import React, { useEffect } from 'react';
import CategoryNewsList from '~/components/CategoryNewsList';
import DailyImportant from '~/components/DailyImportant';
import MostRead from '~/components/MostRead';
import NewsFeed from '~/components/NewsFeed';
import SingleNews from '~/components/SingleNews';
import VideoNews from '~/components/VideoNews';
import { scrollToTop } from '~/helpers/utils.ts';
import './NewsInnerPage.scss';

const NewsInnerPage: React.FC = () => {
	useEffect(() => {
		scrollToTop('instant');
	}, []);
	
	return (
		<>
			<div className='main_screen'>
				<div className='page_container'>
					<div className="page_row">
						<SingleNews />
						<NewsFeed />
					</div>
				</div>
			</div>
			<div className='most_popular'>
				<div className='page_container'>
					<div className='page_row'>
						<DailyImportant />
						<div className='video_and_mostread'>
							<VideoNews />
							<MostRead />
						</div>
					</div>
				</div>
			</div>
			<div className='category_news'>
				<div className='page_container'>
					<div className='page_row'>
						<CategoryNewsList />
					</div>
				</div>
			</div>
		</>
	);
};

export default NewsInnerPage;
