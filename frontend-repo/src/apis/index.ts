import { auth } from "../config/firebase";
import axios from "axios";

export interface UserUpdateData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

const getAuthToken = async () => {
  // Wait for auth to initialize
  await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });

  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");
  return await user.getIdToken();
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

