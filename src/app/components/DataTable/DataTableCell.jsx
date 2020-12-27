import React from "react";
import clsx from "clsx";
import { TableCell, makeStyles } from "@material-ui/core";

export default function DataTableCell({ onClick, padding, align, numeric, children, className }) {
  const classes = useStyles();
  return (
    <TableCell
      align={align ?? numeric ? "right" : "left"}
      padding={handlePadding(padding)}
      onClick={onClick}
      className={clsx(classes.row, { clickable: !!onClick }, padding, className)}
    >
      {children}
    </TableCell>
  );
}

const useStyles = makeStyles(({ spacing }) => ({
  row: {
    fontWeight: "inherit",
    "&.clickable": {
      cursor: "pointer",
    },
    "&.actions": {
      padding: `0 ${spacing(0.5)}px 0 0`,
    },
  },
}));

function handlePadding(padding) {
  if (padding === "actions") {
    return "none";
  }
  return padding;
}
