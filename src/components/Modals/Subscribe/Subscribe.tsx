import { FC, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '~/store';
import { newsSelector } from '~/store/news/news.selector.ts';
import { uiRefresh } from '~/store/news/slice.ts';
import './Subscribe.scss';

const SubscribeModal: FC = () => {
	const [subscribeValue, setSubscribeValue] = useState('');
	const { showSubscribeModal } = useSelector(newsSelector.UI);
	const dispatch = useAppDispatch();
	const intl = useIntl();

	const modalVisibility = (value: boolean) => {
		dispatch(uiRefresh({ showSubscribeModal: value }));
	};

	return (
		<div className={`popup_block subscribe_popup ${showSubscribeModal ? 'showed' : ''}`}>
			<div className="popup_inner">
				<div className="popup_container">
					<button aria-label="close" className="close_btn icon_close" onClick={() => modalVisibility(false)}/>
					<h2 className="popup_title"><FormattedMessage id="subscribe2"/></h2>
					<div className="popup_info"><FormattedMessage id="subscribe.modal.title"/></div>
					<div className="subscribe_block">
						<div className="subscribe_field">
							<input
								type="text"
								name="subscribe"
								maxLength={100}
								value={subscribeValue}
								onChange={(event) => setSubscribeValue(event.target.value)}
								placeholder={intl.formatMessage({ id: 'email_address' })}
								aria-label={intl.formatMessage({ id: 'email_address' })}
							/>
						</div>
						<button type="button" className='submit_btn'>
							<FormattedMessage id='subscribe'/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};


export default SubscribeModal;
