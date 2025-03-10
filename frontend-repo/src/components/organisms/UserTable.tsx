import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";
import TableHeader from "../molecules/TableHeader";
import TableRow from "../molecules/TableRow";
import TablePaginationControl from "../molecules/TablePaginationControl";
import { User } from "@/entities/user.interface";
import { ListResponse, TableColumns } from "@/entities/global.interface";
import { format, formatDistance } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";

interface UserTableProps {
  users: User[];
  pagination: ListResponse<User>["pagination"];
  onPageChange: (_event: unknown, _newPage: number) => void;
  onRowsPerPageChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onEditUser: (_user: User) => void;
}

const UserTable = ({
  users,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  onEditUser,
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
      render: (value) =>
        formatDistance(new Date(value), new Date(), { addSuffix: true }),
    },
    {
      label: "Created At",
      name: "createdAt",
      render: (value) => format(new Date(value), "dd/MM/yyyy HH:mm:ss"),
    },
    {
      label: "Updated At",
      name: "updatedAt",
      render: (value) => format(new Date(value), "dd/MM/yyyy HH:mm:ss"),
    },
    {
      label: "Actions",
      render: (_value, data) => (
        <IconButton color="primary" onClick={() => onEditUser(data)}>
          <EditIcon />
        </IconButton>
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
      <TableContainer>
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

