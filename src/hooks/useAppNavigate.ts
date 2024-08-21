import { NavigateOptions, useNavigate } from 'react-router';
import { restoreLocale } from '../helpers/localStorageUtils';

export const removeStartingSlash = (string: string): string => {
	return string.replace(/^\//, '');
};

export const useRootAppNavigate = () => {
	const locale = restoreLocale();
	const navigate = useNavigate();
	if (!locale) {
		return () => navigate('');
	}
	return (to: string, options?: NavigateOptions) =>
		navigate(`/${locale.code}/${removeStartingSlash(to)}`, options);
};
