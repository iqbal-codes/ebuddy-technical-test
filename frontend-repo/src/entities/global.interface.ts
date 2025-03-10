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

export interface UserGetListParams {
  page?: number;
  limit?: number;
}

export interface TableColumns<T> {
  name: keyof T;
  label: string;
  render?: (value: string) => string;
}
