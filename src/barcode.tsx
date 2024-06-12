import React from "react";
import { Barcode as BarcodeType } from "./rm4scc";

import classes from "./barcode.module.css";

export function Barcode({ barcode }: { barcode: BarcodeType }) {
  return (
    <div className={classes.barcode}>
      {barcode.map((bar, index) => (
        <div
          key={index}
          className={`${classes.bar} ${classes[bar.toLowerCase()]}`}
        ></div>
      ))}
    </div>
  );
}
