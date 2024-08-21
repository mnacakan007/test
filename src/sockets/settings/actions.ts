import {
	SETTINGS_UPDATE,
	SettingsRefreshActionType,
} from '~/store/settings/types';

export function settingsUpdate(data: any): SettingsRefreshActionType {
	return {
		type: SETTINGS_UPDATE,
		data,
	};
}
