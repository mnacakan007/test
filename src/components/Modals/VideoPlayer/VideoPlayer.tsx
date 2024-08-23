import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { newsSelector } from '~/store/news/news.selector.ts';
import { uiRefresh } from '~/store/news/slice.ts';
import { useAppDispatch } from '~/store';
import VideoContent from '~/components/VideoNews/components/VideoContent.tsx';
import OutsideClickDetector from '~/helpers/OutsideClickDetector.tsx';
import './VideoPlayer.scss';

const VideoPlayerModal: FC = () => {
	const { showVideoModal } = useSelector(newsSelector.UI);
	const { selectedVideoNewsId } = useSelector(newsSelector.UI);
	const videoNews = useSelector(newsSelector.videoNews);
	const dispatch = useAppDispatch();

	const modalVisibility = (value: boolean) => {
		dispatch(uiRefresh({ showVideoModal: value, autoPlayVideo: false }));
	};

	useEffect(() => {
		if (!showVideoModal && selectedVideoNewsId) {
			dispatch(uiRefresh({ selectedVideoNewsId: null }));
		}
		// eslint-disable-next-line
	}, [showVideoModal]);

	if (!showVideoModal || !videoNews) return null;

	return (
		<div className={`popup_block video_player_popup ${showVideoModal ? 'showed' : ''}`}>
			<div className="popup_inner">
				<div className="popup_container">
					<button aria-label="close" className="close_btn icon_close" onClick={() => modalVisibility(false)}/>
					
					{videoNews.length > 0 && (
						<OutsideClickDetector className='video_player_popup_content' onOutsideClick={() => modalVisibility(false)}>
							<VideoContent newsList={videoNews} fromModalPage />
						</OutsideClickDetector>
					)}
				</div>
			</div>
		</div>
	);
};


export default VideoPlayerModal;
