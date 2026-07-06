"use client";

import { useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

export default function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  label,
}: {
  beforeUrl: string;
  afterUrl: string;
  label: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function updateFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }

  return (
    <div>
      <div
        ref={containerRef}
        className="relative aspect-video w-full overflow-hidden select-none cursor-ew-resize tick-corners"
        onMouseDown={(e) => {
          dragging.current = true;
          updateFromClientX(e.clientX);
        }}
        onMouseMove={(e) => {
          if (dragging.current) updateFromClientX(e.clientX);
        }}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
      >
        <img src={afterUrl} alt="After" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <img
          src={beforeUrl}
          alt="Before"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          draggable={false}
        />

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-safety"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 h-9 w-9 rounded-full bg-safety flex items-center justify-center text-concrete shadow-lg">
            <MoveHorizontal size={16} />
          </div>
        </div>

        <span className="absolute top-3 left-3 font-mono text-[10px] tracking-wider bg-charcoal/80 text-concrete px-2 py-1">
          BEFORE
        </span>
        <span className="absolute top-3 right-3 font-mono text-[10px] tracking-wider bg-charcoal/80 text-concrete px-2 py-1">
          AFTER
        </span>
      </div>
      <p className="mt-3 text-sm text-charcoal/60 font-mono">{label}</p>
    </div>
  );
}
