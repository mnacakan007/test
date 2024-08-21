import React, { useEffect, useState } from 'react';
import CategoryNewsList from '~/components/CategoryNewsList';
import ImportantNews from '~/components/ImportantNews';
import MainNews from '~/components/MainNews';
import NewsFeed from '~/components/NewsFeed';
import Facebook from '~/components/Social/Facebook/Facebook.tsx';
import X from '~/components/Social/X/X.tsx';
import VideoNews from '~/components/VideoNews';
import DailyImportant from '~/components/DailyImportant';
import MostRead from '~/components/MostRead';
import useWindowSize from '~/hooks/useWindowSize.ts';
import './HomePage.scss';

const HomePage: React.FC = () => {
	const windowSize = useWindowSize();
	const [showSocialBlock, setShowSocialBlock] = useState(false);

	useEffect(() => {
		setShowSocialBlock(windowSize < 576);
	},[windowSize]);

	return (
		<>
			<div className='main_screen'>
				<div className='page_container'>
					<div className="page_row">
						<ImportantNews />
						<MainNews />
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
			{showSocialBlock && (
				<div className="social_block">
					<div className='page_container'>
						<div className='social_inner'>
							<Facebook width={'287'}/>
							<X/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default HomePage;
