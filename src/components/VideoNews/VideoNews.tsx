import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CategoryBaseProps } from '~/components/CategoryNews/types.ts';
import VideoContent from '~/components/VideoNews/components/VideoContent.tsx';
import { useRootAppNavigate } from '~/hooks/useAppNavigate.ts';
import './Style.scss';

export const VIDEO_URL = 'videos';

const VideoNews: React.FC<CategoryBaseProps> = ({ newsList }) => {
	const navigate = useRootAppNavigate();

	const goToVideos = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		navigate(`/${VIDEO_URL}`);
	};

	return (
		<div className="video_news">

			<h2 className="section_title icon_camera">
				<a href={`/${VIDEO_URL}`} onClick={goToVideos}>
					<FormattedMessage id="videos"/>
				</a>
			</h2>

			<VideoContent newsList={newsList} />
		</div>
	);
};

export default VideoNews;