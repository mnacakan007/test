import amMessages from './locales/am.json';
import enMessages from './locales/en.json';
import ruMessages from './locales/ru.json';
import locale_en from '../translations/locales/en.json';
import locale_ru from '../translations/locales/ru.json';
import locale_am from '../translations/locales/am.json';
import { ELanguageCodes, TMessages, TTranslations } from './types';

const translations: TTranslations = {
	am: locale_am,
	en: locale_en,
	ru: locale_ru,
};

export const langToString = (id: string, code?: ELanguageCodes) => {
	const locale = code || 'en';
	const messages: TMessages = {
		am: amMessages,
		ru: ruMessages,
		en: enMessages,
	};
	const lang = messages[locale];

	return lang[id];
};

export default translations;
