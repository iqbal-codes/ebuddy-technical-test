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
