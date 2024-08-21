import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import News from '~/components/News';
import Facebook from '~/components/Social/Facebook/Facebook.tsx';
import X from '~/components/Social/X/X.tsx';
import { newsSelector } from '~/store/news/news.selector.ts';
import { FormattedMessage } from 'react-intl';
import useWindowSize from '~/hooks/useWindowSize';
import './Style.scss';

const DailyImportant: React.FC = () => {
	const initialData = useSelector(newsSelector.initialData);
	const dailyImportant = initialData && initialData.dailyImportant;
	const windowSize = useWindowSize();
	const [showMoreButton, setShowMoreButton] = useState(false);

	useEffect(() => {
		setShowMoreButton(windowSize < 576);
	},[windowSize]);


	const showAllDailyList = () => {
		setShowMoreButton(false);
	};

	return (
		<div className='left_col'>
			<div className="daily_news">
				<h2 className='section_title icon_oclock'>
					<FormattedMessage id="daily_important"/>
				</h2>
				{dailyImportant && dailyImportant.length > 0 && (
					<>
						<ul className="news_list">
							{dailyImportant.map(news => (
								<li key={news.id}>
									<News news={news} width={''} height={''}/>
								</li>
							))}
						</ul>
						{showMoreButton && (
							<button type='button' className="more_btn" aria-label="newsfeed" onClick={showAllDailyList}>
								<FormattedMessage id="view_all"/>
							</button>
						)}
					</>
				)}
			</div>

			{!showMoreButton && (
				<>
					<Facebook />
					<X />
				</>
			)}
		</div>
	);
};

export default DailyImportant;