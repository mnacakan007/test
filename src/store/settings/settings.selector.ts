import { RootState } from '~/store/store.ts';

export const settingsSelector = {
	settings         : (state: RootState) => state.settings.settings,
	settingsUpdated  : (state: RootState) => state.settings.settingsUpdated,
	currentLanguage  : (state: RootState) => state.settings.currentLanguage,
	currentWebsite   : (state: RootState) => state.settings.currentWebsite,
	currentCategoryId: (state: RootState) => state.settings.currentCategoryId,
	initialSettings  : (state: RootState) => state.settings.initialSettings,
	SEO              : (state: RootState) => state.settings.SEO,
	languages        : (state: RootState) => state.settings.languages,
	loading          : (state: RootState) => state.settings.loading,
};
