import React from 'react';
import { useSelector } from 'react-redux';
import LangSwitcher from '~/components/LangSwitcher';
import MainMenu from '~/components/MainMenu';
import MainLogo from '~/components/Logo';
import Exchange from '~/components/Exchange';
import Weather from '~/components/Weather';
import Search from '~/components/Search';
import { Website } from '~/shared/const/websiteUrls.enum.ts';
import { settingsSelector } from '~/store/settings/settings.selector.ts';
import './HeaderPage.scss';

const HeaderPage: React.FC = () => {
	const currentWebsite = useSelector(settingsSelector.currentWebsite);

	return (
		<div className="header">
			<div className="header_top">
				<div className="header_inner">
					<MainLogo/>
					<Exchange/>
					<Weather/>
					<Search/>
					{currentWebsite === Website.TERT && <LangSwitcher/>}
				</div>
			</div>
			<div className="header_bottom">
				<MainMenu/>
			</div>
		</div>
	);
};

export default HeaderPage;
