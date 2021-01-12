import React from "react";
import styles from "./FormControls.module.css";
import { Field } from "redux-form";

const FormControl = ({ input, meta: { touched, error }, children }) => {
  const hasErorr = touched && error;
  return (
    <div className={styles.formControl + " " + (hasErorr ? styles.error : "")}>
      <div>{children}</div>
      <div>{hasErorr && <span>{error}r</span>}</div>
    </div>
  );
};

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps}></textarea>
    </FormControl>
  );
};

export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps}></input>
    </FormControl>
  );
};

export const createField = (
  placeholder,
  name,
  component,
  validate,
  props = {},
  text = ""
) => (
  <div>
    <Field
      placeholder={placeholder}
      name={name}
      component={component}
      validate={validate}
      {...props}
    />
    {text}
  </div>
);
