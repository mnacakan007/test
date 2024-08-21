import { Website } from '~/shared/const/websiteUrls.enum.ts';

export interface NewsStateInitial {
  initialData  : IInitialData | null;
  categories   : ICategory[] | null;
  categoryNews : INews[] | null;
  videoNewsList: INews[] | null;
  authors      : IAuthor[] | null;
  author       : IAuthor | null;
  UI           : INewsUI;
  pagination   : INewsPagination;
}

export interface IInitialData {
  categories    : ICategory[];
  generalList   : INews[];
  important     : INews[];
  newsFeed      : INews[];
  dailyNews     : INews[];
  videoNews     : IVideoNews[];
  dailyImportant: INews[];
  mostRead      : INews[];
  categoriesNews: ICategoriesNews | null;
}

export interface INews {
  id           : number;
  link         : string;
  date?        : string;
  title        : string;
  description? : string;
  imageUrl?    : string;
  target?      : string;
  categoryName?: string;
  categoryLink?: string;
  categoryId?  : string;
}

export type INewsUI = {
  loading?            : boolean;
  showNewsFeed?       : boolean;
  selectedVideoNewsId?: number | null;
  autoPlayVideo?      : boolean;
  showSubscribeModal? : boolean;
  showVideoModal?     : boolean;
};

export interface ICategory {
  id   : string;
  title: string;
  link : string;
  color: string;
}

export interface INewsGetStore {
  currentWebsite   : Website;
  pagination       : INewsPagination;
  currentCategoryId: string;
}

export interface ICategoriesNews {
  [categoryId: string]: INews[];
}

export interface INewsPagination {
  page   ?: number;
  limit  ?: number;
  hasMore?: boolean;
}

export interface ICategoryNewsParams extends INewsPagination {
  categoryId: string;
}

export type IAuthor = Omit<INews, 'title' | 'target' | 'date' | 'videoId' | 'categoryName'> & IAuthorInfo;
export type IVideoNews = Omit<INews, 'description' | 'target' | 'date' | 'categoryLink' | 'categoryName' | 'categoryId'> & { videoId: string };

interface IAuthorInfo {
 fullName: string;
 role    : string;
 articles: IArticle[];
}

export interface IArticle {
  id   : number;
  title: string;
  link : string;
}
