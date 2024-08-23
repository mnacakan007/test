import React, { useEffect } from 'react';
import { notification } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import HelmetLayout from '~/components/Layout/helmet-layout';
import { settingsSelector } from '~/store/settings/settings.selector.ts';
import { IntlProvider } from 'react-intl';
import translations from '~/translations';
import { registerLocale } from 'react-datepicker';
import am from 'date-fns/locale/hy';
import ru from 'date-fns/locale/ru';
import en from 'date-fns/locale/en-US';
import Routes from '~/app/providers/routes';
import { ELanguageCodes } from '~/translations/types.ts';

notification.config({
	placement: 'topRight',
	top      : 20,
});

const locales = {
	'am': am,
	'en': en,
	'ru': ru,
};

type LocaleKeys = keyof typeof locales;
const MISSING_TRANSLATION = 'MISSING_TRANSLATION';

const App: React.FC = () => {
	const currentLanguage = useSelector(settingsSelector.currentLanguage);

	useEffect(() => {
		const isTouchDevice = 'ontouchstart' in document.documentElement;
		const body: HTMLBodyElement | null = document.querySelector('body');

		if (body) {
			if (isTouchDevice) {
				body.classList.add('touch');
			} else {
				body.classList.add('web');
			}
			if (navigator.userAgent.search('Safari') >= 0 && navigator.userAgent.search('Chrome') < 0) {
				body.classList.add('ios');
			} else if (navigator.userAgent.search('Mozilla') >= 0 && navigator.userAgent.search('Chrome') < 0) {
				body.classList.add('moz');
			}
		}

		if (currentLanguage && currentLanguage.code) {
			registerLocale('locale', locales[currentLanguage.code as LocaleKeys]);
		}
	}, [currentLanguage]);

	const langCode = currentLanguage?.code as ELanguageCodes;

	return (
		<IntlProvider
			locale={currentLanguage?.code || ''}
			key={currentLanguage?.code}
			messages={translations[langCode]}
			onError={(err) => {
				if (err.code === MISSING_TRANSLATION) {
					console.warn('Missing translation for:', err.message);
					// Return the original text (id) when the translation is missing
					return err?.descriptor?.id;
				} else {
					throw err;
				}
			}}
		>
			<HelmetProvider>
				<HelmetLayout>
					<Routes/>
				</HelmetLayout>
			</HelmetProvider>
		</IntlProvider>
	);
};

export default App;
