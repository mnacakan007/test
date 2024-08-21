import { defaultLanguages } from '~/shared/const/common.ts';
import {
	DateTimeResult,
	IAdapt,
	IGetValueCookieResult,
	ILanguage,
	ScriptItem,
	ScriptPosition,
	// ScriptSeparationResult,
} from './types';
import { logger } from '~/helpers/debugLogger.ts';
import { defaultLanguage } from '~/shared/config/config.ts';

const SCRIPT_POSITION: ScriptPosition = {
	head: 1,
	body: 2,
};

export const SEO_IDS = {
	GAMES       : 'GAMES',
	PROMOTION   : 'PROMOTION',
	INFO        : 'INFO',
	CATEGORY    : 'CATEGORY',
	SUB_CATEGORY: 'SUB_CATEGORY',
	WEBSITE     : 'WEBSITE',
};

export function getDateAndTime(date: string): DateTimeResult {
	const pattern = /[D,M,Y]{2,}/g;
	const patternSymbol = /[^:A-Za-z0-9]/g;
	const match = date.match(pattern);
	const matchSymbol = date.match(patternSymbol);

	const daysFormat = match?.join(`${matchSymbol?.[0]}`).trim() || '';

	const timeFormats = getTimes(date, daysFormat).trim();

	return {
		daysFormat,
		timeFormats,
	};
}

function getTimes(format1: string, format2: string): string {
	const format1Parts = format1.split(/[\s/:]+/);
	const format2Parts = format2.split(/[\s/:]+/);

	const uniqueParts = format1Parts.filter(
		(part) => !format2Parts.includes(part)
	);

	let res: string;

	const arr1: string[] = [];
	const arr2: string[] = [];

	const patternSymbol = /[m,h,s,H,M,S]/g;

	uniqueParts.forEach((item) => {
		if (item.match(patternSymbol)) {
			arr1.push(item);
		} else {
			arr2.push(item);
		}
	});

	if (!arr2.length) {
		res = arr1.join(':');
	} else {
		res = [arr1.join(':'), ...arr2].join(' ');
	}

	return res;
}

// export function separateScript(scripts: ScriptItem[]): ScriptSeparationResult {
// 	const cookieScripts: ScriptItem[] = [];
// 	const scriptsNone: ScriptItem[] = [];
//
// 	for (let i = 0; i < scripts.length; i++) {
// 		if (scripts[i].type === SCRIPT_COOKIE_TYPE.NONE) {
// 			scriptsNone.push(scripts[i]);
// 		} else {
// 			cookieScripts.push(scripts[i]);
// 		}
// 	}
//
// 	return {
// 		cookieScripts,
// 		scriptsNone,
// 	};
// }

export function injectToDocument(scripts: ScriptItem[]): void {
	try {
		scripts.forEach((scriptItem) => {
			const scriptText = scriptItem.script;
			if (scriptItem.position_id === SCRIPT_POSITION.head) {
				addScryptToParent(scriptText, document.head);
			} else {
				const asyncScrypt = new Promise((resolve) => {
					resolve('');
				});
				asyncScrypt.then(() => addScryptToParent(scriptText, document.body));
			}
		});
	} catch (error) {
		logger.log('A critical error occurred in custom script:');
		logger.log(JSON.stringify(scripts));
		logger.log(error);
	}
}

function addScryptToParent(script: string, parent: HTMLElement) {
	const range = document.createRange();
	try {
		const fragment = range.createContextualFragment(script);
		parent.appendChild(fragment);
	} catch (err) {
		logger.log('An error occurred in custom script:');
		logger.log(JSON.stringify(script));
		logger.log(err, 'errr');
	}
	parent.onerror = (error) => {
		logger.log('An error occurred in custom script:');
		logger.log(JSON.stringify(script));
		logger.log(error);
	};
}

export function getValueCookie(str: string | null): IGetValueCookieResult {
	if (!str) return { type: '', value: [] };
	const [type, value] = str.split('val=');

	return {
		type,
		value: value.split(',').map((item) => Number(item)),
	};
}

export function adaptSeo<T extends IAdapt>(data: T) {
	if (!data) {
		return {
			pageName      : '',
			seoTitle      : '',
			seoDescription: '',
			seoKeywords   : '',
			ogTitle       : '',
			ogDescription : '',
			ogImageURL    : '',
		};
	}
	const {
		seo_title = '',
		seo_description = '',
		seo_keywords = '',
		og_title = '',
		og_description = '',
		og_image = '',
		name = '',
	} = data;

	return {
		pageName      : name,
		seoTitle      : seo_title,
		seoDescription: seo_description,
		seoKeywords   : seo_keywords,
		ogTitle       : og_title,
		ogDescription : og_description,
		ogImageURL    : og_image,
	};
}

export const adaptListSeo = <T extends IAdapt>(
	list: T[],
	selectedCategory: string
) => {
	const dataSeo = list.find((item) => selectedCategory?.includes(item.alias));
	const defaultSeo: IAdapt = {
		seo_title      : '',
		seo_description: '',
		seo_keywords   : '',
		og_title       : '',
		og_description : '',
		og_image       : '',
		name           : '',
		alias          : '',
	};
	return adaptSeo(dataSeo || defaultSeo);
};

export const validLanguage = (lang: string = ''): ILanguage | undefined => {
	return defaultLanguages.find((elem) => elem.code === lang);
};

export const adaptLanguage = (langID: number, langCode?: string): ILanguage => {
	const lang = validLanguage(langCode);
	if (lang) {
		return lang;
	}
	const language = defaultLanguages.find((lang) => lang.id === langID);
	return language || defaultLanguage;
};

export const detectLanguage = (langCode: string): ILanguage => {
	const lang = validLanguage(langCode);
	if (lang) {
		return lang;
	}
	return lang || defaultLanguage;
};

export const replaceLang = (langCode: string) => {
	const path = window.location.pathname;
	const search = window.location.search;
	if (search) {
		return path.replace(/\/[a-z]{2}\/?/, `/${langCode}/`) + search;
	}
	return path.replace(/\/[a-z]{2}\/?/, `/${langCode}/`);
};
