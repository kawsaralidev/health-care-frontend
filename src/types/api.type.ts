// API pagination metadata
export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Common API response
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: ApiMeta;
}
