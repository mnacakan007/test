import React, { LegacyRef } from 'react';
import { INews } from '~/store/news/types.ts';
import VideoPreviewItem from './VideoPreviewItem.tsx';
import '../Style.scss';

export interface CurrentVideoItemProps {
	news        : INews | null;
	videoBtnRef?: LegacyRef<HTMLButtonElement> | null;
	btnClick    : () => void;
} 

const CurrentVideoItem: React.FC<CurrentVideoItemProps> = ({ videoBtnRef, news, btnClick }) => {
	if (!news) return null;

	const { title, date } = news;

	return (
		<>
			<button
				ref={videoBtnRef}
				onClick={btnClick}
				className="video_btn"
				aria-label={title}
			>
				<VideoPreviewItem news={news} />
			</button>

			<div className="news_date">{date?.replace(' ', ' • ')}</div>
			<div className="news_title">{title}</div>
		</>
	);
};

export default CurrentVideoItem;