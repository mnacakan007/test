import React, { useEffect, useState } from 'react';
import { VideoNewsListProps } from '~/components/CategoryNews/types.ts';
import Facebook from '~/components/Social/Facebook/Facebook.tsx';
import X from '~/components/Social/X/X.tsx';
import CurrentVideoItem from '~/components/VideoNews/components/CurrentVideoItem.tsx';
import useWindowSize from '~/hooks/useWindowSize.ts';
import { useAppDispatch } from '~/store';
import { uiRefresh } from '~/store/news/slice.ts';
import { useRootAppNavigate } from '~/hooks/useAppNavigate.ts';
import { useParams } from 'react-router-dom';
import '../Style.scss';

const VIDEO_CATEGORY_URL = 'videos';

const CategoryVideoNewsList: React.FC<VideoNewsListProps> = ({ newsList }) => {
	const [showSocialBlock, setShowSocialBlock] = useState(false);
	const params = useParams<{ hash: string; page: string }>();
	const { hash, page: pageParam = '1' } = params;
	const windowSize = useWindowSize();
	const dispatch = useAppDispatch();
	const navigate = useRootAppNavigate();

	useEffect(() => {
		if (hash && pageParam) {
			openInitialPlayerModal(Number(hash));
		}
		// eslint-disable-next-line 
	}, [hash, pageParam]);
	
	useEffect(() => {
		setShowSocialBlock(windowSize < 576);
	},[windowSize]);


	const openInitialPlayerModal = (id: number) => {
		dispatch(uiRefresh({ showVideoModal: true, autoPlayVideo: true, selectedVideoNewsId: id }));
	};

	const navigateToVideo = (id: number) => {
		navigate(`${VIDEO_CATEGORY_URL}/${Number(pageParam)}/${id}`);
	};

	const openVideo = (id: number) => {
		if (hash) {
			if (id && Number(hash) !== id) {
				navigateToVideo(id);
			} else {
				openInitialPlayerModal(id);
			}
		} else {
			navigateToVideo(id);
		}
	};

	return (
		<div className='page_container'>
			<div className='video_list_container'>
				<ul className="video_news_list page_row">
					{newsList && newsList.map(news => (
						<li key={news.id} className="video_content news_col">
							<div className="current_video">
								<CurrentVideoItem news={news} btnClick={() => openVideo(news.id)} />
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

export default CategoryVideoNewsList;