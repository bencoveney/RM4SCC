import React from "react";
import { createRoot } from "react-dom/client";
import { Barcode } from "./barcode";

export function initApp() {
  const rootElement = document.getElementById("react-root");
  if (!rootElement) {
    throw new Error("No root element");
  }
  const root = createRoot(rootElement);
  const postcode = "BX11LT";
  const deliveryPointSuffix = "1A";
  root.render(<Barcode barcode={`${postcode}${deliveryPointSuffix}`} />);
}
