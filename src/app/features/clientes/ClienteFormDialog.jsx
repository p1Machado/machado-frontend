import React from "react";

import { ClienteForm } from "app/features/clientes";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Toolbar,
  IconButton,
  Divider,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import { LoadingButton } from "app/components";

import { useMobileMediaQuery } from "app/hooks";

export default function ClienteFormDialog({ initialValues, onSubmit, open, onClose, ...props }) {
  const isMobile = useMobileMediaQuery();

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile} disableBackdropClick {...props}>
      <ResponsiveDialogTitle onClose={onClose} isMobile={isMobile}>
        {initialValues?.id ? "Editar cliente" : "Novo cliente"}
      </ResponsiveDialogTitle>
      <Divider />
      <DialogContent>
        <ClienteForm initialValues={initialValues} onSubmit={onSubmit}>
          {({ submitting }) => (
            <DialogActions>
              <Button onClick={onClose} variant="outlined" color="default" tabIndex="-1">
                CANCELAR
              </Button>
              <LoadingButton type="submit" variant="contained" loading={submitting}>
                SALVAR
              </LoadingButton>
            </DialogActions>
          )}
        </ClienteForm>
      </DialogContent>
    </Dialog>
  );
}

function ResponsiveDialogTitle({ onClose, isMobile, children }) {
  if (isMobile) {
    return (
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle>{children}</DialogTitle>
      </Toolbar>
    );
  }

  return <DialogTitle>{children}</DialogTitle>;
}
