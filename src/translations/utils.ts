import { restoreLocale } from '../helpers/localStorageUtils';
import { createIntl } from 'react-intl';
import translations from './index';
import { ELanguageCodes } from './types';
import { defaultLanguage } from '~/shared/config/config.ts';
import { ILanguage } from '~/store/settings/types';

const locale = restoreLocale();

const langCode = locale?.code || defaultLanguage.code;
const messages = translations[langCode as ELanguageCodes];
const intl = createIntl({ locale: langCode, messages });

export const translate = (
	key: string,
	values?: Record<string, string | number>
): string => {
	return intl.formatMessage({ id: key }, values);
};

export const setDocumentDirection = (language: ILanguage) => {
	const { rtl } = language;
	const html = document.querySelector('html');
	if (html) {
		html.setAttribute('dir', rtl ? 'rtl' : 'ltr');
		html.setAttribute('lang', language.htmlCode);
	}
};
