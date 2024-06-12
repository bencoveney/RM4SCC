export function onPageLoad(callback: (event: Event) => void) {
  window.addEventListener("load", (event: Event) => {
    callback(event);
    window.removeEventListener("load", callback);
  });
}
