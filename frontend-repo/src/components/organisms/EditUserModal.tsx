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
import { User, UserUpdateData } from "shared-types";
import { userUpdateSchema, UserUpdateFormData } from "@/schemas/user.schema";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

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

  const defaultValues = useMemo(
    () => ({
      name: user?.name || "",
      email: user?.email || "",
      totalAverageWeightRatings:
        user?.totalAverageWeightRatings?.toString() || null,
      numberOfRents: user?.numberOfRents?.toString() || null,
      recentlyActive: user?.recentlyActive,
    }),
    [user]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues,
  });

  const onSubmitForm = (data: UserUpdateFormData) => {
    onSubmit({
      ...data,
      id: user?.id,
      totalAverageWeightRatings: data.totalAverageWeightRatings
        ? parseFloat(data.totalAverageWeightRatings)
        : null,
      numberOfRents: data.numberOfRents ? parseFloat(data.numberOfRents) : null,
      recentlyActive: data.recentlyActive ? data.recentlyActive : null,
    });
    reset();
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {updateError && <Alert severity="error">{updateError}</Alert>}
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
            <TextField
              label="Total Average Weight Ratings"
              {...register("totalAverageWeightRatings")}
              error={!!errors.totalAverageWeightRatings}
              helperText={errors.totalAverageWeightRatings?.message}
              fullWidth
            />
            <TextField
              label="Number of Rents"
              {...register("numberOfRents")}
              error={!!errors.numberOfRents}
              helperText={errors.numberOfRents?.message}
              fullWidth
            />
            <DatePicker
              label="Recently Active"
              name="recentlyActive"
              value={dayjs((watch("recentlyActive") as number) * 1000)}
              onChange={(newValue) => {
                setValue("recentlyActive", newValue?.unix() || null);
              }}
              maxDate={dayjs(new Date())}
              slotProps={{
                textField: {
                  error: !!errors.recentlyActive,
                  helperText: errors.recentlyActive?.message,
                  fullWidth: true,
                },
              }}
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

