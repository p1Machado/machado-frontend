import React from "react";

import { useThrottleCallback } from "app/hooks";

import { Form as ReactFinalForm } from "react-final-form";

import createFocusDecorator from "final-form-focus";

const focusOnErrors = createFocusDecorator();

// const focusListener = (form) => {
//   return form.subscribe(console.log, {
//     active: true,
//     dirtyFieldsSinceLastSubmit: true,
//     dirtySinceLastSubmit: true,
//     errors: true,
//     invalid: true,
//     modifiedSinceLastSubmit: true,
//   });
// };

export const FormContext = React.createContext();

export function Form({ initialValues, onSubmit, validate, children, mutators, ...rest }) {
  const handleSubmit = useThrottleCallback(onSubmit, 1000);
  return (
    <ReactFinalForm
      validate={validate}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      subscription={{ submitting: true, submitFailed: true }}
      decorators={[focusOnErrors]}
      mutators={mutators}
    >
      {(props) => {
        const { handleSubmit } = props;
        return (
          <form onSubmit={handleSubmit} noValidate {...rest}>
            {typeof children === "function" ? children(props) : children}
          </form>
        );
      }}
    </ReactFinalForm>
  );
}
