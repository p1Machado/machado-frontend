import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { LoadingButton } from "app/components";

export function ConfirmButton({ onClick, message, children }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    setLoading(true);
    await onClick();
    setOpen(false);
    setLoading(false);
  };
  return (
    <>
      <Dialog open={open} disableBackdropClick disableEscapeKeyDown maxWidth="xs">
        <DialogTitle>{message}</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)}>
            CANCELAR
          </Button>
          <LoadingButton onClick={handleConfirm} loading={loading} color="primary">
            CONFIRMAR
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {children(() => setOpen(true))}
    </>
  );
}
