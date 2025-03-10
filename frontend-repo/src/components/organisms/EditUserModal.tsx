import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserUpdateData } from "@/entities/user.interface";
import { userUpdateSchema, UserUpdateFormData } from "@/schemas/user.schema";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface EditUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSubmit: (_data: UserUpdateData) => void;
}

const EditUserModal = ({
  open,
  user,
  onClose,
  onSubmit,
}: EditUserModalProps) => {
  const { updateLoading, updateError } = useSelector(
    (state: RootState) => state.user
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmitForm = (data: UserUpdateFormData) => {
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    reset({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [user, reset]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Edit User</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {updateError && !isDirty && (
              <Alert severity="error">{updateError}</Alert>
            )}
            <TextField
              label="Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            loading={updateLoading}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditUserModal;

