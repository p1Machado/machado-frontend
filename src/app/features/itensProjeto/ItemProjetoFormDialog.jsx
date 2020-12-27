import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Toolbar,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import Draggable from "react-draggable";

import { ItemProjetoForm } from "app/features/itensProjeto";

import { useMobileMediaQuery } from "app/hooks";

export function ItemProjetoFormDialog({ initialValues, onSubmit, open, onClose, onExited, ...props }) {
  const isMobile = useMobileMediaQuery();

  const submitRef = React.useRef();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onExited={onExited}
      maxWidth="md"
      fullScreen={isMobile}
      PaperProps={{ isMobile }}
      PaperComponent={OptionalDraggablePaper}
      {...props}
    >
      <ResponsiveDialogTitle onClose={onClose} isMobile={isMobile}>
        {initialValues && initialValues.id ? "Editar item" : "Novo item"}
      </ResponsiveDialogTitle>
      <DialogContent dividers>
        <ItemProjetoForm initialValues={initialValues} onSubmit={onSubmit}>
          <button type="submit" ref={submitRef} style={{ display: "none" }} />
        </ItemProjetoForm>
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

function OptionalDraggablePaper({ isMobile, ...props }) {
  if (isMobile) {
    return <Paper {...props} />;
  }

  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} bounds="parent">
      <Paper {...props} />
    </Draggable>
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

  return (
    <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
      {children}
    </DialogTitle>
  );
}
