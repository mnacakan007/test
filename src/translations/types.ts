export type TMessages = {
  [key in ELanguageCodes]: {
    [key: string]: string;
  };
};

export type TTranslations = {
  [key in ELanguageCodes]: {
    [key: string]: string;
  };
};

export enum ELanguageCodes {
  am = 'am',
  en = 'en',
  ru = 'ru',
}

export interface IPaginationMeta {
  page : number;
  limit: number;
}
