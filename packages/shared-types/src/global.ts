export interface ListResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
}

export interface GetListParams {
  page?: number;
  limit?: number;
}

export interface TableColumns<T> {
  label: string;
  name?: keyof T;
  render?: (value: any, data: T) => React.ReactNode;
}