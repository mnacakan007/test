import { defaultLanguages } from '~/shared/const/common.ts';


const API_PATH =
  import.meta.env.REACT_APP_API_PATH || 'http://10.1.1.138:5000';
const SOCKET_PATH =
  import.meta.env.REACT_APP_SOCKET_PATH || '';

export const OLD_API_URL = 'https://www.tert.am';
export const API_URL = API_PATH;
export const SOCKET_URL = SOCKET_PATH;
export const pageTitle = 'Tert.am';
export const YOUTUBE_IFRAME_API_URL = 'https://www.youtube.com/iframe_api';
export const X_IFRAME_WIDGET_API_URL = 'https://platform.twitter.com/widgets.js';
export const defaultLanguage = defaultLanguages[0];
export const debugMode =
  window.location.search.includes('debug') ||
  Boolean(import.meta.env.REACT_APP_DEBUG_MODE);
export const siteConfig = {
	footerText: import.meta.env.REACT_APP_VERSION,
};
