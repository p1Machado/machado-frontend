import React from "react";
import TipoPessoa from "app/domain/TipoPessoa";
import { ButtonGroup, Button, makeStyles, FormControl } from "@material-ui/core";

export function TipoPessoaSwitch({ value, onChange, style }) {
  const classes = useStyles();
  return (
    <FormControl margin="dense" fullWidth style={style}>
      <ButtonGroup classes={{ root: classes.group }}>
        <Button
          onClick={() => onChange(TipoPessoa.FISICA)}
          className={{
            "MuiButton-containedPrimary": value === TipoPessoa.FISICA,
          }}
          classes={{ root: classes.item }}
        >
          PESSOA FÍSICA
        </Button>
        <Button
          onClick={() => onChange(TipoPessoa.JURIDICA)}
          className={{
            "MuiButton-containedPrimary": value === TipoPessoa.JURIDICA,
          }}
          classes={{ root: classes.item }}
        >
          PESSOA JURÍDICA
        </Button>
      </ButtonGroup>
    </FormControl>
  );
}

const useStyles = makeStyles((theme) => ({
  group: {
    width: "100%",
    height: 40,
  },
  item: {
    flexGrow: 1,
    paddingLeft: 4,
    paddingRight: 4,
    "&:not(.MuiButton-containedPrimary)": {
      color: theme.palette.action.active,
    },
  },
}));
