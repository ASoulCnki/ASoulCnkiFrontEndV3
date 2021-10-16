export function useServiceWorker() {
  return navigator.serviceWorker || ServiceWorker
}
