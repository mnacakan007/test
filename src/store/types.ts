export interface ILanguage {
  id   : number;
  name : string;
  code : string;
  label: string;
  value: number;
  rtl  : boolean;
}

export  interface IUi {
  loading?: boolean;
}

export interface ISagaActionType<T> {
  type: string;
  data: T;
}
