export function applyTilt(event) {
  if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
  element.style.setProperty("--tilt-x", `${y.toFixed(2)}deg`);
  element.style.setProperty("--tilt-y", `${x.toFixed(2)}deg`);
}

export function resetTilt(event) {
  const element = event.currentTarget;
  element.style.setProperty("--tilt-x", "0deg");
  element.style.setProperty("--tilt-y", "0deg");
}
