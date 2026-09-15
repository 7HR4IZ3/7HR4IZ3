"use client";

import { useEffect, useRef } from "react";

export function PopupShell({
  children,
  onClose,
  label,
}: {
  children: React.ReactNode;
  onClose: () => void;
  label: string;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    // focus close button
    setTimeout(() => closeRef.current?.focus(), 0);
    const prev = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    document.documentElement.style.scrollbarGutter = "stable";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      document.body.style.paddingRight = prevPad;
      document.documentElement.style.scrollbarGutter = "";
      openerRef.current?.focus();
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="popup-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="popup-content">
        <button ref={closeRef} className="popup-close" onClick={onClose} aria-label="Close dialog">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
