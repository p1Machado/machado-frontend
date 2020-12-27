import React, { forwardRef } from "react";
import { ActionButton } from "app/components";
import AddIcon from "@material-ui/icons/Add";

export const AddButton = forwardRef(({ children = "NOVO", ...rest }, ref) => {
  return (
    <ActionButton startIcon={<AddIcon />} ref={ref} {...rest}>
      {children}
    </ActionButton>
  );
});
