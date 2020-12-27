import React from "react";

import { Menu, MenuItem } from "@material-ui/core";
import { ColoredChip } from "app/components";

export default function SituacaoOrcamentoSelect({ value, onChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(e) {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }

  function handleClose(e) {
    e.stopPropagation();
    setAnchorEl(null);
  }

  function handleChange(e, value) {
    e.stopPropagation();
    if (onChange) {
      defineEventTargetValue(e, value);
      onChange(e);
    }
    handleClose(e);
  }

  return (
    <>
      <ColoredChip label={handleLabel(value)} color={handleColor(value)} onClick={handleClick} variant="outlined" />
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {["APROVADO", "REPROVADO", "PENDENTE"].map((situacao) => (
          <MenuItem selected={situacao === value} onClick={(e) => handleChange(e, situacao)} key={situacao}>
            {handleLabel(situacao)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function handleLabel(value) {
  if (value === "APROVADO") {
    return "Aprovado";
  }

  if (value === "REPROVADO") {
    return "Reprovado";
  }

  if (value === "PENDENTE") {
    return "Pendente";
  }

  return value;
}

function handleColor(value) {
  if (value === "APROVADO") {
    return "success";
  }

  if (value === "REPROVADO") {
    return "error";
  }

  if (value === "PENDENTE") {
    return "warning";
  }
}

function defineEventTargetValue(event, value) {
  Object.defineProperty(event, "target", {
    writable: true,
    value: {
      value,
    },
  });
}
