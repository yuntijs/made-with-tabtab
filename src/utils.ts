export const isMobileDevice = () => {
  return window.matchMedia("(pointer:coarse)").matches;
}