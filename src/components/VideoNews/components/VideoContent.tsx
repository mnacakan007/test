import React from 'react';
import { CategoryBaseProps } from '~/components/CategoryNews/types.ts';
import VideoMainNews from '~/components/VideoNews/components/VideoMainNews.tsx';
import VideoNewsList from '~/components/VideoNews/components/VideoNewsList.tsx';
import '../Style.scss';


const VideoContent: React.FC<CategoryBaseProps> = ({ newsList }) => {
	return (
		<div className="video_content">
			<VideoMainNews newsList={newsList}/>
			<VideoNewsList newsList={newsList}/>
		</div>
	);
};

export default VideoContent;