import React, { useCallback } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";

export function SearchInput({ value, onChange, adornment = "start", margin = "dense", variant = "outlined", ...rest }) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange]);

  const classes = useStyles();
  return (
    <TextField
      value={value}
      onChange={handleChange}
      placeholder="Pesquisar..."
      InputProps={{
        startAdornment: adornment === "start" ? <SearchAdornment position={adornment} /> : null,
        endAdornment: adornment === "end" ? <SearchAdornment position={adornment} /> : null,
      }}
      margin={margin}
      variant={variant}
      classes={{ root: classes.marginDense }}
      {...rest}
    />
  );
}

function SearchAdornment({ position }) {
  return (
    <InputAdornment position={position}>
      <SearchIcon color="action" />
    </InputAdornment>
  );
}

const useStyles = makeStyles({
  marginDense: {
    "&.MuiFormControl-marginDense": {
      marginTop: 0,
      marginBottom: 0,
    },
  },
});

export default SearchInput;
