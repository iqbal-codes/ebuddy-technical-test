import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  User,
  UserGetListParams,
  UserUpdateData,
} from "@/entities/user.interface";
import * as userApi from "@/apis/userApi";

interface UserState {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  pagination: {
    page: 0,
    limit: 5,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async ({ page, limit }: UserGetListParams, { rejectWithValue }) => {
    try {
      const response = await userApi.fetchUserData({ page, limit });
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch user data"
      );
    }
  }
);

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (data: UserUpdateData, { rejectWithValue }) => {
    try {
      const response = await userApi.updateUserData(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update user data"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.data = [];
      state.error = null;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUserData, setPage, setRowsPerPage } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;

