import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import './Style.scss';

const HeaderBlock: FC<{ title: string }> = ({ title }) => {
	return (
		<div className="header-block">
			<h2 className="header-block_title"><FormattedMessage id={title}/></h2>
			<hr className="header-block_divider" />
		</div>
	);
};

export default HeaderBlock;