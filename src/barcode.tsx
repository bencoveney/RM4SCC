import React from "react";
import { buildBarcode } from "./rm4scc";

import classes from "./barcode.module.css";

export function Barcode({ barcode }: { barcode: string }) {
  const bars = buildBarcode(barcode);
  return (
    <div className={classes.barcode}>
      {bars.map((bar, index) => (
        <div
          key={index}
          className={`${classes.bar} ${classes[bar.toLowerCase()]}`}
        ></div>
      ))}
    </div>
  );
}
