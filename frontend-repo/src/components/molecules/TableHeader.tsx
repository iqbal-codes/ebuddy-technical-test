import { TableCell, TableHead, TableRow } from "@mui/material";

interface TableHeaderProps {
  columns: {
    label: string;
    name: string;
  }[];
}

const TableHeader = ({ columns }: TableHeaderProps) => {
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