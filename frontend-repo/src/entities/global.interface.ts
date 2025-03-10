import { ReactNode } from "react";

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
  name?: keyof T;
  label: string;
  render?: (_value: T[keyof T], _data: T) => string | ReactNode;
}

