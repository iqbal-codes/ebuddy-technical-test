import { UserGetListParams, UserUpdateData } from "@/entities/user.interface";
import { axiosInstance } from ".";
import axios from "axios";

export const fetchUserData = async ({
  page = 1,
  limit = 10,
}: UserGetListParams) => {
  try {
    const response = await axiosInstance.get("/fetch-user-data", {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Failed to fetch user data"
      );
    }
    throw error;
  }
};

export const updateUserData = async (data: UserUpdateData) => {
  try {
    const response = await axiosInstance.put("/update-user-data", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Failed to update user data"
      );
    }
    throw error;
  }
};

