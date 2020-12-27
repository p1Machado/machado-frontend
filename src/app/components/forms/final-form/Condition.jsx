import React from "react";

import { Field } from "react-final-form";

export function Condition({ when, is, children }) {
  return (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  );
}
