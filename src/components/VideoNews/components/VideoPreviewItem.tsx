import React from 'react';
import { OLD_API_URL } from '~/shared/config/config.ts';
import { INews } from '~/store/news/types.ts';
import '../Style.scss';

export const START_CACHE_VIDEO_IMAGE_URL = 'cache_video';
export const START_CACHE_IMAGE_URL = 'cache_image';

export interface VideoPreviewItemProps {
	news: INews;
} 

const VideoPreviewItem: React.FC<VideoPreviewItemProps> = ({ news }) => {
	const { title, imageUrl } = news;

	return (
		<>
			{imageUrl && (imageUrl.startsWith(START_CACHE_VIDEO_IMAGE_URL) || imageUrl.startsWith(START_CACHE_IMAGE_URL))
				? <img src={OLD_API_URL + '/' + imageUrl} alt={title} title={title} width={''} height={''}/>
				: <img src={imageUrl} alt={title} title={title} width={''} height={''}/>
			}
		</>
	);
};

export default VideoPreviewItem;