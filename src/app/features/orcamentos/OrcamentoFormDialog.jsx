import React from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Toolbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { OrcamentoForm } from "app/features/orcamentos";

import { useMobileMediaQuery } from "app/hooks";

function OrcamentoFormDialog({ initialValues, projetoId, itensIds, onSubmit, open, onClose }) {
  const isMobile = useMobileMediaQuery();

  const submitRef = React.useRef();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullScreen={isMobile} disableBackdropClick disableEscapeKeyDown>
      <ResponsiveDialogTitle onClose={onClose} isMobile={isMobile}>
        {initialValues && initialValues.id ? "Editar orçamento" : "Novo orçamento"}
      </ResponsiveDialogTitle>
      <DialogContent dividers>
        <OrcamentoForm initialValues={initialValues} onSubmit={onSubmit} projetoId={projetoId} itensIds={itensIds}>
          <button type="submit" ref={submitRef} style={{ display: "none" }} />
        </OrcamentoForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="default" tabIndex={-1}>
          CANCELAR
        </Button>
        <Button onClick={() => submitRef.current.click()} variant="contained">
          SALVAR
        </Button>
      </DialogActions>
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

export default OrcamentoFormDialog;
