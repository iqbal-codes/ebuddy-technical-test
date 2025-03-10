import { Table, TableBody, TableContainer, Paper } from "@mui/material";
import TableHeader from "../molecules/TableHeader";
import TableRow from "../molecules/TableRow";
import TablePaginationControl from "../molecules/TablePaginationControl";
import { User } from "@/entities/user.interface";
import { ListResponse, TableColumns } from "@/entities/global.interface";

interface UserTableProps {
  users: User[];
  pagination: ListResponse<User>["pagination"];
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserTable = ({
  users,
  pagination,
  onPageChange,
  onRowsPerPageChange,
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
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      label: "Created At",
      name: "createdAt",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      label: "Updated At",
      name: "updatedAt",
      render: (value) => new Date(value).toLocaleDateString(),
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
