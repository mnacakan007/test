import { FC } from 'react';
import './PageScreen.scss';
import sign from '~/assets/images/sign.jpg';
import sign2x from '~/assets/images/sign@2x.jpg';

const PageScreen: FC = () => {
	return (
		<img
			className="page_screen"
			src={sign}
			srcSet={`${sign} 1x, ${sign2x} 2x`}
			alt="page_screen"
			title=""
			width="1920"
			height="1080"
		/>
	);
};

export default PageScreen;
