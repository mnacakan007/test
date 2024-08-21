import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { settingsSelector } from '~/store/settings/settings.selector.ts';
import { seoValue } from './utils';
import { IHelmetLayoutProps } from './types';

const HelmetLayout: FC<IHelmetLayoutProps> = ({ children }) => {
	const websiteSeo = useSelector(settingsSelector.initialSettings);
	const seo = useSelector(settingsSelector.SEO);

	const tabSeo = seoValue(websiteSeo, seo);
	const {
		seoTitle,
		seoDescription,
		seoKeywords,
		ogTitle,
		ogDescription,
		ogImageURL,
	} = tabSeo;

	return (
		<div>
			<Helmet>
				<title>{seoTitle}</title>
				<meta name="description" content={seoDescription || ''} />
				<meta name="keywords" content={seoKeywords || ''} />
				<meta property="og:title" content={ogTitle || ''} />
				<meta property="og:description" content={ogDescription || ''} />
				<meta property="og:image" content={ogImageURL || ''} />
			</Helmet>
			{children}
		</div>
	);
};

export default HelmetLayout;
