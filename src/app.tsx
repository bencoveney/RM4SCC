import React from "react";
import { createRoot } from "react-dom/client";

export function initApp() {
  const rootElement = document.getElementById("react-root");
  if (!rootElement) {
    throw new Error("No root element");
  }
  const root = createRoot(rootElement);
  root.render(<div>Barcodes</div>);
}
