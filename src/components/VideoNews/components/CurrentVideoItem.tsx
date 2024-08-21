import React, { LegacyRef } from 'react';
import { OLD_API_URL } from '~/shared/config/config.ts';
import { INews } from '~/store/news/types.ts';
import '../Style.scss';

export interface CurrentVideoItemProps {
	news        : INews;
	videoBtnRef?: LegacyRef<HTMLButtonElement> | null;
	btnClick    : () => void;
} 

const CurrentVideoItem: React.FC<CurrentVideoItemProps> = ({ videoBtnRef, news, btnClick }) => {
	const { title, imageUrl, date } = news;

	return (
		<>
			<button
				ref={videoBtnRef}
				onClick={btnClick}
				className="video_btn"
				data-src="Idh8n5XuYIA"
				aria-label={title}
			>
				{imageUrl && <img src={OLD_API_URL + '/' + imageUrl} alt={title} title={title} width={''} height={''}/>}
			</button>

			<div className="news_date">{date?.replace(' ', ' • ')}</div>
			<div className="news_title">{title}</div>
		</>
	);
};

export default CurrentVideoItem;