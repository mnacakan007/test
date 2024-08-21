import React, { useEffect, useState } from 'react';
import { VideoNewsListProps } from '~/components/CategoryNews/types.ts';
import Facebook from '~/components/Social/Facebook/Facebook.tsx';
import X from '~/components/Social/X/X.tsx';
import CurrentVideoItem from '~/components/VideoNews/components/CurrentVideoItem.tsx';
import useWindowSize from '~/hooks/useWindowSize.ts';
import { useAppDispatch } from '~/store';
import { uiRefresh } from '~/store/news/slice.ts';
import '../Style.scss';

const VideoNewsList: React.FC<VideoNewsListProps> = ({ newsList }) => {
	const [showSocialBlock, setShowSocialBlock] = useState(false);
	const windowSize = useWindowSize();
	const dispatch = useAppDispatch();

	useEffect(() => {
		setShowSocialBlock(windowSize < 576);

		return () => {
			dispatch(uiRefresh({ selectedVideoNewsId: null }));
		};
		// eslint-disable-next-line
	},[windowSize]);

	const openPlayerModal = (id: number) => {
		dispatch(uiRefresh({ selectedVideoNewsId: id }));
		dispatch(uiRefresh({ showVideoModal: true, autoPlayVideo: true }));
	};

	return (
		<div className='page_container'>
			<div className='video_list_container'>
				<ul className="video_news_list page_row">
					{newsList && newsList.map(news => (
						<li key={news.id} className="video_content news_col">
							<div className="current_video">
								<CurrentVideoItem news={news} btnClick={() => openPlayerModal(news.id)} />
							</div>
						</li>
					))}
				</ul>

				{!showSocialBlock && (
					<div className="social_block">
						<div className='page_container'>
							<div className='social_inner'>
								<Facebook width={'287'}/>
								<X/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default VideoNewsList;