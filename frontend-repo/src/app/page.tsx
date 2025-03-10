"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthProvider from "@/providers/AuthProvider";
import { Alert, Box } from "@mui/material";
import Header from "@/components/organisms/Header";
import {
  fetchUserData,
  setPage,
  setRowsPerPage,
} from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import UserTable from "@/components/organisms/UserTable";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: userData,
    error,
    pagination,
  } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUserData({ page: pagination.page, limit: pagination.limit }));
  }, [dispatch, pagination.page, pagination.limit]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
  };

  return (
    <AuthProvider>
      <Box sx={{ p: 3 }}>
        <Header title="User Dashboard" />
        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <UserTable
            users={userData}
            pagination={pagination}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>
    </AuthProvider>
  );
}
