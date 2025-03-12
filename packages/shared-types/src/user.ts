export interface User {
  id: string;
  name: string;
  email: string;
  totalAverageWeightRatings: number | null;
  numberOfRents: number | null;
  recentlyActive: number | null;
  createdAt: number;
  updatedAt: number;
}

export interface UserUpdateData extends Partial<Omit<User, 'createdAt' | 'updatedAt'>> {}