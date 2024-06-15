import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Barcode } from "./barcode";
import { Input } from "./input";
import { Barcode as BarcodeType } from "./rm4scc";

import classes from "./app.module.css";
import { Render, RenderSpec } from "./render";
import { Title } from "./heading";

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
  const [renderSpec, setRenderSpec] = useState<RenderSpec | null>(null);
  return (
    <>
      <Title>RM4SCC Barcode Generator</Title>
      <div className={classes.wrapper}>
        <div className={classes.input}>
          <Input setValue={setBarcode} />
        </div>
        <div className={classes.preview}>
          {renderSpec && <Barcode barcode={barcode} renderSpec={renderSpec} />}
        </div>
        <div className={classes.render}>
          <Render setRenderSpec={setRenderSpec} />
        </div>
      </div>
    </>
  );
}
