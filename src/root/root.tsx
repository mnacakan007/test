import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '~/app/providers/routes/utils.tsx';
import { Layout } from '~/components/Layout';
import { storeLocale } from '~/helpers/localStorageUtils.ts';
import { useRootAppNavigate } from '~/hooks/useAppNavigate.ts';
import { Website } from '~/shared/const/websiteUrls.enum.ts';
import { useAppDispatch } from '~/store';
import newsActions from '~/store/news/actions.ts';
import { setCurrentWebsite, setLanguage } from '~/store/settings/slice.ts';
// import { getAbsolutePaths } from '~/app/providers/routes/utils.tsx';
import { ILanguage } from '~/store/settings/types.ts';
import { useSelector } from 'react-redux';
import { settingsSelector } from '~/store/settings/settings.selector.ts';
import { logger } from '~/helpers/debugLogger.ts';
import { setDocumentDirection } from '~/translations/utils.ts';

interface RootProps {}

const Root: FC<RootProps> = () => {
	const [websiteClass, setWebsiteClass] = useState('');
	const languages = useSelector(settingsSelector.languages);
	const currentLanguage = useSelector(settingsSelector.currentLanguage);
	const currentWebsite = useSelector(settingsSelector.currentWebsite);
	const dispatch = useAppDispatch();
	const navigate = useRootAppNavigate();
	const params = useParams<{ locale: string }>();
	const { locale } = params;
	const { pathname, search } = useLocation();

	// const paths = getAbsolutePaths();

	// const lengthParams = Object.keys(params).length;
	// useEffect(() => {
	//   paths.map(path => {
	//     if (pathname.includes(path) && lengthParams === 1) {
	//       dispatch(settingsReducers.resetSEOData());
	//     } else if (!SEO_RESET_EXCLUDES.find(item => Object.keys(params).includes(item))) {
	//       dispatch(settingsReducers.resetSEOData());
	//     }
	//   });
	//   // eslint-disable-next-line
	// }, [pathname]);

	useEffect(() => {
		const isLanguage = (locale: string): ILanguage | undefined => {
			return languages.find((elem) => elem.code === locale);
		};
 
		try {
			if (locale && currentLanguage && locale !== currentLanguage.code) {
				const language = isLanguage(locale);

				if (!language) {
					navigate('');
				} else {
					dispatch(setLanguage(language));
					storeLocale(language);
					setDocumentDirection(language);
				}
			}
		} catch (e) {
			logger.log(e);
		}
		// eslint-disable-next-line
	}, [currentLanguage, languages, locale, navigate, pathname, search]);

	useEffect(() => {
		let currentSiteKey = Website.TERT;

		if (pathname.startsWith(`/${locale}/${ROUTE_PATH.life}`)) {
			currentSiteKey = Website.LIFE;
			setWebsiteClass(ROUTE_PATH.life);
		} else if (pathname.startsWith(`/${locale}/${ROUTE_PATH.medicine}`)) {
			currentSiteKey = Website.MEDICINE;
			setWebsiteClass(ROUTE_PATH.medicine);
		}

		dispatch(setCurrentWebsite(currentSiteKey));

		// eslint-disable-next-line
	}, [pathname]);

	useEffect(() => {
		dispatch(newsActions.getInitialNewsAction());
		// eslint-disable-next-line
	}, [currentWebsite]);

	return (
		<div className={`root_inner ${websiteClass}`}>
			<Layout>
				<Outlet />
			</Layout>
		</div>
	);
};

export default Root;
