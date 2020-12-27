import React from "react";

import { Field } from "react-final-form";
import { DatePicker as MuiDatePicker } from "@material-ui/pickers";
import { TextField as MuiTextField } from "@material-ui/core";

export function DatePicker(props) {
  return <Field component={TextFieldAdapter} {...props} />;
}

function TextFieldAdapter(props) {
  const {
    input: { name, value, onChange },
    meta,
    required,
    style,
    ...rest
  } = props;
  const splitByDots = name.split(".");
  const lastName = splitByDots[splitByDots.length - 1];
  return (
    <MuiDatePicker
      mask="__/__/____"
      value={value}
      onChange={onChange}
      renderInput={(props) => (
        <MuiTextField
          {...props}
          inputProps={{ ...props.inputProps, placeholder: undefined }}
          error={(meta.touched && meta.error) || meta.submitError}
          helperText={undefined}
          required
        />
      )}
      autoOk
      required
      {...rest}
      style={{ gridArea: lastName, ...style }}
    />
  );
}
