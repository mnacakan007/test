import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { settingsSelector } from '~/store/settings/settings.selector.ts';

export const RouterDistributor = () => {
	const currentLanguage = useSelector(settingsSelector.currentLanguage);

	if (currentLanguage) {
		return <Navigate to={`${currentLanguage.code}`} />;
	}
	return <div />;
};
