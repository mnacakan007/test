interface DataResponse<T> {
  items?: Array<T>;
}

interface StatusResponse {
  code?   : string;
  message?: string;
}

export interface Response<T = any> {
  data?  : DataResponse<T>;
  status?: StatusResponse;
}
