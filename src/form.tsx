import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { PropsWithChildren } from "react";

import classes from "./form.module.css";

export function Form({ children }: PropsWithChildren) {
  return <form className={classes.form}>{children}</form>;
}

export function FieldGroup({
  children,
  label,
}: PropsWithChildren<{ label: string }>) {
  return (
    <fieldset className={classes.group}>
      <legend className={classes.legend}>{label}</legend>
      {children}
    </fieldset>
  );
}

export function Labeled({
  children,
  label,
  vertical = false,
}: PropsWithChildren<{ label: string; vertical?: boolean }>) {
  return (
    <label
      className={`${classes.row} ${
        vertical ? classes.labelVertical : classes.labelHorizontal
      }`}
    >
      <span className={classes.label}>{label}</span>
      {children}
    </label>
  );
}

export function Note({ children }: PropsWithChildren) {
  return <p className={`${classes.row} ${classes.note}`}>{children}</p>;
}

export function Buttons({ children }: PropsWithChildren) {
  return <div className={`${classes.row} ${classes.buttons}`}>{children}</div>;
}

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button(props: ButtonProps) {
  return (
    <button {...props} className={`${classes.button} ${props.className}`} />
  );
}
