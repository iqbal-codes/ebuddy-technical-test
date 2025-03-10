import { TableCell, TableRow as MUITableRow } from "@mui/material";

interface TableRowProps<T extends { id: string | number }> {
  data: T;
  columns: {
    label: string;
    name: keyof T;
  }[];
}

const TableRow = <T extends { id: string | number }>({
  data,
  columns,
}: TableRowProps<T>) => {
  return (
    <MUITableRow key={data.id}>
      {columns.map((column) => (
        <TableCell key={column.name as string}>{String(data[column.name])}</TableCell>
      ))}
    </MUITableRow>
  );
};

export default TableRow;
