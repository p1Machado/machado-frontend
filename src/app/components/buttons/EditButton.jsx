import React, { forwardRef } from "react";
import { ActionButton } from "app/components";
import CreateIcon from "@material-ui/icons/Create";

export const EditButton = forwardRef(({ children = "EDITAR", ...rest }, ref) => {
  return (
    <ActionButton startIcon={<CreateIcon />} ref={ref} {...rest}>
      {children}
    </ActionButton>
  );
});
