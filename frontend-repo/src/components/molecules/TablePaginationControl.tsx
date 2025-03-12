import { TablePagination } from "@mui/material";

interface TablePaginationControlProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (_event: unknown, _newPage: number) => void;
  onRowsPerPageChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  rowsPerPageOptions?: number[];
}

const TablePaginationControl = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25],
}: TablePaginationControlProps) => {
  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};

export default TablePaginationControl;