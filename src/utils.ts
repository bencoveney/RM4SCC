export function onPageLoad(callback: (event: Event) => void) {
  window.addEventListener("load", (event: Event) => {
    callback(event);
    window.removeEventListener("load", callback);
  });
}

export function round(value: number, decimalPlaces: number) {
  const exponent = Math.pow(10, decimalPlaces);
  return Math.round(value * exponent) / exponent;
}
