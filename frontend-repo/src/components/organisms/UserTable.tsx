import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import TableHeader from "../molecules/TableHeader";
import TableRow from "../molecules/TableRow";
import TablePaginationControl from "../molecules/TablePaginationControl";
import { User, ListResponse, TableColumns } from "shared-types";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";

interface UserTableProps {
  users: User[];
  pagination: ListResponse<User>["pagination"];
  onPageChange: (_event: unknown, _newPage: number) => void;
  onRowsPerPageChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onEditUser: (_user: User) => void;
  loading: boolean;
}

const UserTable = ({
  users,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  onEditUser,
  loading,
}: UserTableProps) => {
  const columns: TableColumns<User>[] = [
    { label: "Name", name: "name" },
    { label: "Email", name: "email" },
    {
      label: "Total Average Weight Ratings",
      name: "totalAverageWeightRatings",
    },
    {
      label: "Number of Rents",
      name: "numberOfRents",
    },
    {
      label: "Recently Active",
      name: "recentlyActive",
      render: (value) => dayjs((value as number) * 1000).format("MMM DD, YYYY"),
    },
    {
      label: "Actions",
      render: (_value, data) => (
        <Button
          startIcon={<EditIcon />}
          color="primary"
          onClick={() => onEditUser(data)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        bgcolor: "white",
        padding: "16px",
      }}
    >
      <TableContainer sx={{ position: "relative" }}>
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Table stickyHeader>
          <TableHeader columns={columns} />
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} data={user} columns={columns} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationControl
        count={pagination.total}
        page={pagination.page}
        rowsPerPage={pagination.limit}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

export default UserTable;

