import React from "react";
import { Field } from "react-final-form";
import { SelectInput } from "app/components";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";

export function SelectField(props) {
  return <Field component={SelectInputAdapter} {...props} />;
}

function SelectInputAdapter({ input, meta, style, options, ...props }) {
  const { name } = input;
  const splitByDots = name.split(".");
  const lastName = splitByDots[splitByDots.length - 1];
  const error = (meta.touched && meta.error) || meta.submitError;
  return (
    <SelectInput {...input} {...props} error={!!error} options={options} style={{ gridArea: lastName, ...style }} />
  );
}

// function AutocompleteAdapter({ input, meta, style, options, ...props }) {
//   const { name } = input;
//   const splitByDots = name.split(".");
//   const lastName = splitByDots[splitByDots.length - 1];
//   const error = (meta.touched && meta.error) || meta.submitError;
//   const handleChange = (event, newValue) => {
//     Object.defineProperty(event.target, "value", newValue);
//     input.onChange(event);
//   };

//   return (
//     <Autocomplete
//       options={options}
//       getOptionLabel={(optionValue) => options.find((option) => option.value === optionValue).label}
//       getOptionSelected={(option, value) => option.value === value}
//       renderInput={(params) => <TextField {...params} />}
//       style={{ gridArea: lastName, ...style }}
//       {...input}
//       onChange={handleChange}
//       {...props}
//       error={error}
//       fullWidth
//     />
//   );
// }
