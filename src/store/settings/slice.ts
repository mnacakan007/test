import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUser } from '~/helpers/utility';
import { Website } from '~/shared/const/websiteUrls.enum.ts';
import {
	ILanguage,
	SettingStateInitial,
	SettingsRefreshSuccessActionType,
	UIRefreshActionType,
} from './types';
// import { restoreLocale } from '~/helpers/localStorageUtils.ts';
import { defaultLanguages } from '~/shared/const/common.ts';
import { defaultLanguage } from '~/shared/config/config.ts';
import { storeLocale } from '~/helpers/localStorageUtils.ts';

export const settingsInitialState: SettingStateInitial = {
	settings       : getUser(),
	currentLanguage: defaultLanguage,
	languages      : defaultLanguages,
	SEO            : {
		pageName      : '',
		seoTitle      : '',
		seoDescription: '',
		seoKeywords   : '',
		ogTitle       : '',
		ogDescription : '',
		ogImageURL    : '',
	},
	settingsUpdated: false,
	currentWebsite : Website.TERT,
	loading        : false,
	initialSettings: {
		days_format    : 'DD.MM.YYYY',
		seo_title      : 'Tert.am',
		seo_description: 'SEO description website',
		seo_keywords   : 'SEO keywords website',
		og_title       : 'SEO Title website',
		og_description : 'SEO description website',
		og_image       : '/files/1/3de0b7c5-69d3-46c3-8faf-9d0df78e245a.jfif',
	},
	currentCategoryId: '',
};

const settingsSlice = createSlice({
	name        : 'settings',
	initialState: settingsInitialState,
	reducers    : {
		settingsReload: (
			_state: SettingStateInitial,
			_action: PayloadAction<void>
		) => {},
		settingsRefresh: (
			state: SettingStateInitial,
			{ payload }: PayloadAction<SettingsRefreshSuccessActionType>
		) => {
			state.settings = payload.data;
		},
		setSettingsUpdatedValue: (
			state: SettingStateInitial,
			{ payload }: PayloadAction<boolean>
		) => {
			state.settingsUpdated = payload;
		},
		setLanguage: (state: Draft<SettingStateInitial>, action: PayloadAction<ILanguage>) => {
			storeLocale(action.payload);
			state.currentLanguage = action.payload;
		},
		setCurrentWebsite: (state: Draft<SettingStateInitial>, action: PayloadAction<Website>) => {
			state.currentWebsite = action.payload;
		},
		setCurrentCategory: (state: Draft<SettingStateInitial>, action: PayloadAction<string>) => {
			state.currentCategoryId = action.payload;
		},
		uiRefresh: (
			state: SettingStateInitial,
			{ payload }: PayloadAction<UIRefreshActionType>
		) => {
			state.loading = payload.loading;
		},
	},
});
export const {
	settingsReload,
	settingsRefresh,
	setSettingsUpdatedValue,
	setLanguage,
	setCurrentWebsite,
	setCurrentCategory,
	uiRefresh,
} = settingsSlice.actions;
export default settingsSlice.reducer;
