import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User, UserUpdateData } from "@/entities/user.interface";
import * as userApi from "@/apis/userApi";
import { GetListParams } from "@/entities/global.interface";

interface UserState {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  fetchLoading: boolean;
  updateLoading: boolean;
  fetchError: string | null;
  updateError: string | null;
}

const initialState: UserState = {
  data: [],
  pagination: {
    page: 0,
    limit: 5,
    total: 0,
    totalPages: 0,
  },
  fetchLoading: false,
  updateLoading: false,
  fetchError: null,
  updateError: null,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async ({ page, limit }: GetListParams, { rejectWithValue }) => {
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
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 0;
    },
    resetUpdateState: (state) => {
      state.updateLoading = false;
      state.updateError = null;
    },
    resetFetchState: (state) => {
      state.fetchLoading = false;
      state.fetchError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload as string;
      })
      .addCase(updateUserData.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.data = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string;
      });
  },
});

export const { setPage, setRowsPerPage, resetUpdateState, resetFetchState } =
  userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;

