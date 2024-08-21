import React from 'react';
import { useSelector } from 'react-redux';
import CreateSkeleton from '~/components/Skeleton';
import { FormattedMessage } from 'react-intl';
import { newsSelector } from '~/store/news/news.selector.ts';
import './Exchange.scss';

const Exchange: React.FC = () => {
	const initialData = useSelector(newsSelector.initialData);

	return (
		<div className="currency_block">
			{!initialData ? (
				<CreateSkeleton number={1} />
			) : (
				<>
					<div className="block_title">
						<span className="block_icon icon_amd"> </span>
						<FormattedMessage id="exchange_rate_today"/>
					</div>
					<ul className="currency_list">
						<li>USD - 387.89 <span className="change_size desc">-1.00</span></li>
						<li>RUR - 4.60 <span className="change_size asc">+0.45</span></li>
						<li>EUR - 420.52 <span className="change_size asc">+3.00</span></li>
						<li>USD - 387.89 <span className="change_size desc">-1.00</span></li>
					</ul>
				</>
			)}
		</div>
	);
};

export default Exchange;