import { AxiosHeaders } from 'axios';
import { Website } from '~/shared/const/websiteUrls.enum.ts';
import { NumberOrString, StringOrNull } from '~/types/types.ts';

export const SETTINGS_UPDATE = 'SETTINGS_UPDATE';

type TStringOrNull = StringOrNull;

export type SettingStateInitial = {
  settings         : null;
  settingsUpdated  : boolean;
  currentLanguage  : Partial<ILanguage> | undefined | null;
  languages        : ILanguage[];
  SEO              : ISEO;
  currentWebsite   : Website;
  loading          : boolean;
  currentCategoryId: string;
  initialSettings  : Partial<ISettings>;
};

export interface SettingsRefreshActionType {
  type: typeof SETTINGS_UPDATE;
  data: null;
}

export interface SettingsRefreshSuccessActionType {
  data: null;
}

export interface UIRefreshActionType {
  loading: boolean;
}

export interface ILanguage {
  id      : number;
  name    : string;
  code    : string;
  htmlCode: string;
  label   : string;
  value   : number;
  rtl     : boolean;
}

export interface DateTimeResult {
  daysFormat : string;
  timeFormats: string;
}

export interface IGetValueCookieResult {
  type : string;
  value: number[];
}

export interface ISEO {
  pageName      : TStringOrNull;
  seoTitle      : TStringOrNull;
  seoDescription: TStringOrNull;
  seoKeywords   : TStringOrNull;
  ogTitle       : TStringOrNull;
  ogDescription : TStringOrNull;
  ogImageURL    : TStringOrNull;
}

export interface ISEOResponse {
  alias          : string;
  seo_title      : TStringOrNull;
  seo_description: TStringOrNull;
  seo_keywords   : TStringOrNull;
  og_title       : TStringOrNull;
  og_description : TStringOrNull;
  og_image       : TStringOrNull;
}

export interface IAdapt extends ISEOResponse {
  name: string;
}

export interface ScriptItem {
  id         : number;
  position_id: number;
  script     : string;
  type       : number;
  website_id : number;
}

export interface ScriptPosition {
  head: number;
  body: number;
}

export interface ScriptSeparationResult {
  cookieScripts: ScriptItem[];
  scriptsNone  : ScriptItem[];
}

export interface ApiRequestConfig<T,P> {
  method        : string;
  url           : string;
  lang_id?      : number;
  params?       : P;
  headers       : Partial<AxiosHeaders>;
  hideError?    : boolean;
  data          : T;
  withoutLangID?: boolean;
}

export interface ISettings {
  days_format?   : string;
  seo_title      : string;
  seo_description: string;
  seo_keywords   : string;
  og_title       : string;
  og_description : string;
  og_image       : string;
}

export type TParams = Record<string, TParamsValue>;
export interface IParams extends Record<NumberOrString, TParamsValue>{}
export  type TParamsValue = NumberOrString | boolean | null  | number[] | string[];