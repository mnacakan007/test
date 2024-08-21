import { logger } from './debugLogger';
import { STORAGE_KEYS } from './constants';
import { ILanguage } from '~/store/settings/types';
import { StringORNull } from './types';
import { defaultLanguage } from '~/shared/config/config.ts';

export function storeData(key: STORAGE_KEYS, data: string | unknown): boolean {
	try {
		if (typeof data !== 'string') {
			const storableData = JSON.stringify(data);
			localStorage.setItem(key, storableData);
		} else {
			localStorage.setItem(key, data);
		}
		return true;
	} catch (err) {
		logger.log(err);
		return false;
	}
}

export const storeSessionItem = (
	key: STORAGE_KEYS,
	data: string | unknown
): boolean => {
	try {
		if (typeof data !== 'string') {
			const storableData = JSON.stringify(data);
			sessionStorage.setItem(key, storableData);
		} else {
			sessionStorage.setItem(key, data);
		}
		return true;
	} catch (err) {
		logger.log(err);
		return false;
	}
};

export const restoreSessionItem = <T>(
	key: STORAGE_KEYS,
	defaultValue?: T
): T | null => {
	try {
		const restoredData = sessionStorage.getItem(key);
		if (restoredData !== null) {
			return JSON.parse(restoredData) as T;
		}
	} catch (err) {
		logger.log(err);
	}
	return defaultValue ?? null;
};

export const restoreSessionString = <T>(
	key: STORAGE_KEYS,
	defaultValue?: T
) => {
	return sessionStorage.getItem(key) ?? defaultValue;
};

export function restoreData<T>(
	key: STORAGE_KEYS,
	defaultValue?: T
): T | StringORNull {
	try {
		const restoredData = localStorage.getItem(key);
		if (restoredData !== null) {
			try {
				const parsedData = JSON.parse(restoredData) as T;
				// Check if parsedData is an object (JSON)
				if (typeof parsedData === 'object' && parsedData !== null) {
					return parsedData;
				}
			} catch (jsonError) {
				return restoredData;
			}
		}
		return restoredData;
	} catch (err) {
		logger.log(err);
	}
	return defaultValue ?? null;
}

export const restoreLocale = (): ILanguage | null => {
	const restored = restoreData<ILanguage>(STORAGE_KEYS.LOCALE);
	if (restored && typeof restored === 'object') {
		return restored;
	}
	return defaultLanguage;
	// return null;
};

export const storeLocale = (locale: ILanguage): boolean => {
	return storeData(STORAGE_KEYS.LOCALE, locale);
};

export const storeOS = (os: string): boolean => {
	return storeData(STORAGE_KEYS.OS, os);
};

export const restoreOS = (): string | null => {
	return restoreData<string>(STORAGE_KEYS.OS, '');
};

export const storeReferer = (referer: string): boolean => {
	return storeSessionItem(STORAGE_KEYS.REFERER, referer);
};

export const restoreReferer = () => {
	return restoreSessionString<string>(STORAGE_KEYS.REFERER, '');
};

export function clearData(key: STORAGE_KEYS) {
	return localStorage.removeItem(key);
}

export const removeSessionItem = (key: STORAGE_KEYS) => {
	return sessionStorage.removeItem(key);
};
