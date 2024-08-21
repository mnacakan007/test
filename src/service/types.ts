import { AxiosResponse } from 'axios';
import { ApiRequestConfig, IParams } from '~/store/settings/types';


export interface APIResponse<T> {
  status   : number;
  timestamp: string;
  data     : T;
}

export type AxiosApiResponse<T> = AxiosResponse<APIResponse<T>>;

/**
 * PartialConfigs type
 * @description This type is used to create a partial configuration for the apiRequest function
 * @param TData - The type of the data that the apiRequest function will receive in config object.
 * @param KParams - The type of the params that the apiRequest function will receive in config object.
 * @returns Partial<ApiRequestConfig<TData, KParams>>
 *     - If the TData and KParams are not provided, the function will return a Partial<ApiRequestConfig>
 */
export type PartialConfigs<TData = void, KParams = IParams>   = Partial<ApiRequestConfig<TData, KParams>>;