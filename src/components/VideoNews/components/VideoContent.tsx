import React from 'react';
import { VideoContentProps } from '~/components/CategoryNews/types.ts';
import VideoMainNews from '~/components/VideoNews/components/VideoMainNews.tsx';
import VideoNewsList from '~/components/VideoNews/components/VideoNewsList.tsx';
import '../Style.scss';


const VideoContent: React.FC<VideoContentProps> = ({ newsList, fromModalPage }) => {
	return (
		<div className="video_content">
			<VideoMainNews newsList={newsList} fromModalPage={fromModalPage}/>
			<VideoNewsList newsList={newsList}/>
		</div>
	);
};

export default VideoContent;