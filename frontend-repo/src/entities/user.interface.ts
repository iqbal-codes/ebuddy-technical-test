export interface User {
  id: string;
  name: string;
  email: string;
  totalAverageWeightRatings: number;
  numberOfRents: number;
  recentlyActive: number;
  createdAt: number;
  updatedAt: number;
  // Add any other user fields as needed
}

export type UserUpdateData = Partial<Omit<User, "id" | "createdAt">>;

export interface UserListResponse {
  data: User[];
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

export interface UserTableColumns {
  name: keyof User;
  label: string;
  render?: (value: string) => string;
}