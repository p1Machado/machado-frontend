import React, { useMemo } from "react";
import { Typography, TableHead, TableRow, TableCell } from "@material-ui/core";

function DataTableHead({ columns, actions }) {
  const fullWidthSize = useMemo(() => 100 / columns.filter(({ fullWidth }) => !!fullWidth).length + "%", [columns]);
  return (
    <TableHead>
      <TableRow id="tablehead">
        {columns.map(({ field, header, numeric, padding, fullWidth }) => (
          <TableCell
            key={field}
            align={numeric ? "right" : "left"}
            padding={handlePadding(padding)}
            style={{
              whiteSpace: "nowrap",
              minWidth: fullWidth ? fullWidthSize : undefined,
              maxWidth: fullWidth ? fullWidthSize : undefined,
            }}
          >
            <Typography variant="body2">{header}</Typography>
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

export default DataTableHead;
