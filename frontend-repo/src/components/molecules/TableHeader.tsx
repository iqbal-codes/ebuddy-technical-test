import { TableCell, TableHead, TableRow } from "@mui/material";
import { TableColumns } from "shared-types";

interface TableHeaderProps<T extends { id: string | number }> {
  columns: TableColumns<T>[];
}

const TableHeader = <T extends { id: string | number }>({
  columns,
}: TableHeaderProps<T>) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell key={index}>{column.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;

