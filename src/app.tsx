import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Barcode } from "./barcode";
import { Input } from "./input";
import { Barcode as BarcodeType } from "./rm4scc";

import classes from "./app.module.css";

export function initApp() {
  const rootElement = document.getElementById("react-root");
  if (!rootElement) {
    throw new Error("No root element");
  }
  const root = createRoot(rootElement);
  root.render(<App />);
}

function App() {
  const [barcode, setBarcode] = useState<BarcodeType>([]);
  return (
    <div className={classes.wrapper}>
      <div className={classes.controls}>
        <Input setValue={setBarcode} />
      </div>
      <div className={classes.preview}>
        <Barcode barcode={barcode} />
      </div>
    </div>
  );
}
