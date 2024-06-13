import React from "react";
import { PropsWithChildren } from "react";

import classes from "./heading.module.css";

export function Title({ children }: PropsWithChildren) {
  return <h1 className={classes.title}>{children}</h1>;
}

export function Subheading({ children }: PropsWithChildren) {
  return <h2 className={classes.subheading}>{children}</h2>;
}
