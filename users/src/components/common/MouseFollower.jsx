import { useEffect, useRef, useState } from "react";

export default function MouseFollower() {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(finePointer);
    if (!finePointer) return undefined;
    const onMove = (event) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX - 18}px, ${event.clientY - 18}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;
  return <div ref={cursorRef} className="cursor-orbit" />;
}
