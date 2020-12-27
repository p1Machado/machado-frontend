import React, { useMemo } from "react";
import { Typography, TableHead, TableRow, TableCell } from "@material-ui/core";

function LTreeDataTableHead({ columns, actions }) {
  const fullWidthSize = useMemo(() => 100 / columns.filter((col) => !!col.fullWidth).length + "%", [columns]);
  return (
    <TableHead>
      <TableRow id="tablehead">
        <TableCell padding="none" />
        {columns.map((column) => (
          <TableCell
            key={column.field}
            align={column.numeric ? "right" : "left"}
            padding={handlePadding(column.padding)}
            style={{
              whiteSpace: "nowrap",
              minWidth: column.fullWidth ? fullWidthSize : undefined,
              maxWidth: column.fullWidth ? fullWidthSize : undefined,
            }}
          >
            <Typography variant="body2">{column.header}</Typography>
          </TableCell>
        ))}
        {actions && <TableCell />}
      </TableRow>
    </TableHead>
  );
}

function handlePadding(padding) {
  if (padding === "actions") {
    return "none";
  }
  return padding;
}

export default LTreeDataTableHead;
