import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { newsSelector } from '~/store/news/news.selector.ts';
import News from '~/components/News';
import './Style.scss';
import { FormattedMessage } from 'react-intl';
import useWindowSize from '~/hooks/useWindowSize';

const mostNewsTabs = [
	{ id: 1, titleId: 'today' },
	{ id: 2, titleId: 'yesterday' },
	{ id: 3, titleId: 'weekly' },
];

const MostRead: React.FC = () => {
	const [mostNewsTabCurrentId, setMostNewsTabCurrentId] = useState(1);
	const initialData = useSelector(newsSelector.initialData);
	const mostRead = initialData && initialData.mostRead;
	const windowSize = useWindowSize();
	const [showMoreButton, setShowMoreButton] = useState(false);

	useEffect(() => {
		setShowMoreButton(windowSize < 576);
	},[windowSize]);

	const showAllMostReadList = () => {
		setShowMoreButton(false);
	};


	return (
		<div className="most_read">
			<div className='section_head'>
				<h2 className='section_title'>
					<FormattedMessage id='most_read' />
				</h2>
				<div className='tab_btns'>
					{mostNewsTabs.map(({ id, titleId }) => (
						<button 
							key={id} 
							type="button" 
							aria-label="today"
							onClick={() => setMostNewsTabCurrentId(id)}
							className={`${mostNewsTabCurrentId === id ? 'selected' : ''}`}
						>
							<FormattedMessage id={titleId} />
						</button>
					))}
				</div>
			</div>
			
			{mostRead && mostRead.length > 0 && (
				<>
					<ul className="news_list">
						{mostRead.map(news => (
							<li key={news.id}>
								<News news={news} width={''} height={''}/>
							</li>
						))}
					</ul>

					{showMoreButton && (
						<button type='button' className="more_btn" aria-label="newsfeed" onClick={showAllMostReadList}>
							<FormattedMessage id="view_more"/>
						</button>
					)}
				</>
			) }
		</div>
	);
};

export default MostRead;