import { CATEGORY_LIST_LOCATION } from '~/helpers/constants.ts';
import { INews } from '~/store/news/types.ts';

export interface INewsProps {
    news                 : INews;
    width                : number | string;
    height               : number | string;
    categoryListLocation?: CATEGORY_LIST_LOCATION;
    index?               : number;
}

