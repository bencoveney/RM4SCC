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

export function clamp(value: number) {
  return round(value, 3);
}

export function capitaliseSnakeCase(words: string) {
  return words.split("_").map(capitalise).join(" ");
}

export function capitalise(word: string) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}
