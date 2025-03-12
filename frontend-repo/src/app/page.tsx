"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box } from "@mui/material";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchUserData,
  resetUpdateState,
  setPage,
  setRowsPerPage,
  updateUserData,
} from "@/store/slices/userSlice";
import AuthProvider from "@/providers/AuthProvider";
import Header from "@/components/organisms/Header";
import UserTable from "@/components/organisms/UserTable";
import EditUserModal from "@/components/organisms/EditUserModal";
import { useSnackbar } from "@/hooks/useSnackbar";
import { User, UserUpdateData } from "shared-types";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { showSnackbar } = useSnackbar();
  const {
    data: userData,
    fetchError,
    pagination,
    fetchLoading
  } = useSelector((state: RootState) => state.user);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchUsers = useCallback(() => {
    dispatch(fetchUserData({ page: pagination.page, limit: pagination.limit }));
  }, [dispatch, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchUsers();

    const intervalId = setInterval(fetchUsers, 30000);
    return () => clearInterval(intervalId);
  }, [fetchUsers]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    dispatch(resetUpdateState());
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateUser = async (data: UserUpdateData) => {
    try {
      await dispatch(updateUserData(data)).unwrap();
      dispatch(
        fetchUserData({ page: pagination.page, limit: pagination.limit })
      );
      showSnackbar("User updated successfully", "success");
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

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
        {fetchError ? (
          <Alert severity="error">{fetchError}</Alert>
        ) : (
          <>
            <UserTable
              users={userData}
              pagination={pagination}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onEditUser={handleEditUser}
              loading={fetchLoading}
            />
            <EditUserModal
              open={isEditModalOpen}
              user={selectedUser}
              onClose={handleCloseModal}
              onSubmit={handleUpdateUser}
            />
          </>
        )}
      </Box>
    </AuthProvider>
  );
}

