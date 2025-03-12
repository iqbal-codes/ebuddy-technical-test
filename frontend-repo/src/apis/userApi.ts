import { axiosInstance } from ".";
import axios from "axios";
import { GetListParams, UserUpdateData } from "shared-types";

export const fetchUserData = async ({
  page = 1,
  limit = 10,
}: GetListParams) => {
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
  const { id, ...payload } = data;
  try {
    const response = await axiosInstance.put(
      `/update-user-data/${id}`,
      payload
    );
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

