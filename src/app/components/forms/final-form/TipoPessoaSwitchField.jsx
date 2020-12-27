import React from "react";

import { Field } from "react-final-form";

import { TipoPessoaSwitch } from "app/components";

export function TipoPessoaSwitchField(props) {
  return <Field component={TipoPessoaSwitchAdapter} {...props} />;
}

function TipoPessoaSwitchAdapter({ input, meta, style, ...props }) {
  const splitByDots = input.name.split(".");
  const lastName = splitByDots[splitByDots.length - 1];
  return <TipoPessoaSwitch {...input} {...props} style={{ gridArea: lastName, ...style }} />;
}
