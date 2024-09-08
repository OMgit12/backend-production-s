export interface HttpApiResponse {
  statusCode: number;
  successL: boolean;
  request: {
    ip?: string | null;
    method?: string;
    path?: string;
    url?: string;
  };
  massage?: string;
  data?: unknown;
}

export interface HttpError {
  statusCode: number;
  successL: boolean;
  request: {
    ip?: string;
    method?: string;
    path?: string;
    url?: string;
  };
  massage?: string;
  data?: unknown;
  traces?: object | null;
};
