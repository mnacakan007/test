import { FC } from 'react';
import { useSelector } from 'react-redux';
import VideoContent from '~/components/VideoNews/components/VideoContent.tsx';
import { useAppDispatch } from '~/store';
import { newsSelector } from '~/store/news/news.selector.ts';
import { uiRefresh } from '~/store/news/slice.ts';
import './VideoPlayer.scss';

const VideoPlayerModal: FC = () => {
	const { showVideoModal } = useSelector(newsSelector.UI);
	const videoNews = useSelector(newsSelector.videoNews);
	const dispatch = useAppDispatch();

	const modalVisibility = (value: boolean) => {
		dispatch(uiRefresh({ showVideoModal: value, autoPlayVideo: false }));
	};

	if (!videoNews) return null;

	return (
		<div className={`popup_block video_player_popup ${showVideoModal ? 'showed' : ''}`}>
			<div className="popup_inner">
				<div className="popup_container">
					<button aria-label="close" className="close_btn icon_close" onClick={() => modalVisibility(false)}/>

					{videoNews.length > 0 && <VideoContent newsList={videoNews} />}
				</div>
			</div>
		</div>
	);
};


export default VideoPlayerModal;
