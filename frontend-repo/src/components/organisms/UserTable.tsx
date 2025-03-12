import { Table, TableBody, TableContainer, Paper, Button } from "@mui/material";
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

