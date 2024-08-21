import React from 'react';
import { useSelector } from 'react-redux';
import CreateSkeleton from '~/components/Skeleton';
import { FormattedMessage } from 'react-intl';
import { newsSelector } from '~/store/news/news.selector.ts';
import './Weather.scss';

const Weather: React.FC = () => {
	const initialData = useSelector(newsSelector.initialData);

	return (
		<div className="weather_block">
			{!initialData ? (
				<CreateSkeleton number={1} />
			) : (
				<>
					<div className="block_title">
						<span className="block_icon icon_sun"> </span>
						<FormattedMessage id="weather_today"/>
					</div>
					<div className="weather_info">
						<span className="city_name">
							<FormattedMessage id="yerevan"/>
						</span>
						<span className="temp_size">+26...+28 <sup>o</sup>C</span>
						<span className="weather_type sunny">
							<FormattedMessage id="sunny"/>
						</span>
					</div>
				</>
			)}
		</div>
	);
};

export default Weather;