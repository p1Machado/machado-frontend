import React from "react";

import { Field } from "react-final-form";
import { TextField as MuiTextField } from "@material-ui/core";

export function TextField(props) {
  return (
    <Field
      component={TextFieldAdapter}
      parse={(value) => (value === "" ? null : value)}
      format={(value) => (value === "" ? null : value)}
      {...props}
    />
  );
}

function TextFieldAdapter(props) {
  const {
    input: { name, value, type, onChange, onFocus, onBlur, ...restInput },
    meta,
    required,
    fullWidth = true,
    style,
    ...rest
  } = props;
  const splitByDots = name.split(".");
  const lastName = splitByDots[splitByDots.length - 1];
  return (
    <MuiTextField
      fullWidth={fullWidth}
      onChange={onChange}
      name={name}
      value={value ?? ""}
      type={type}
      required={required}
      inputProps={{ required, ...restInput }}
      {...rest}
      style={{ gridArea: lastName, ...style }}
    />
  );
}
