import React from "react";
import Button from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";

export function FilterButton() {
  return (
    <Button color="default" startIcon={<FilterListIcon />}>
      filtrar
    </Button>
  );
}
