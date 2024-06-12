import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Barcode } from "./barcode";
import { Input } from "./input";
import { Barcode as BarcodeType } from "./rm4scc";

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
    <>
      <Input setValue={setBarcode} />
      <Barcode barcode={barcode} />
    </>
  );
}
