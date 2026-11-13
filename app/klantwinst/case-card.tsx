"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./page.module.css";

export function CaseCard({ id, name, preview, children }: { id: string; name: string; preview: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const headingId = `${id}-dialog-title`;

  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    if (!modal) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.showModal();
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return <article className={styles.proofCard} id={id}>
    <button ref={trigger} type="button" className={styles.proofTrigger} aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? `${id}-dialog` : undefined} onClick={() => setOpen(true)}>
      {preview}
    </button>
    {open && <dialog ref={dialog} id={`${id}-dialog`} className={styles.caseDialog} aria-labelledby={headingId} onCancel={event => { event.preventDefault(); setOpen(false); }} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setOpen(false); } }}>
      <div className={styles.dialogHeader}>
        <div><p>DE AANPAK EN HET RESULTAAT</p><h2 id={headingId}>{name}</h2></div>
        <button type="button" className={styles.dialogClose} onClick={() => setOpen(false)} autoFocus aria-label={`Sluit case ${name}`}><span>Sluiten</span><span aria-hidden="true">×</span></button>
      </div>
      <div className={styles.dialogContent}>
        {children}
        <div className={styles.dialogFooter}><p>Wat past bij jouw bedrijf?</p><a className={styles.cta} href="#klantwinst-check" onClick={() => setOpen(false)}>Vraag de gratis Klantwinst-check aan<span aria-hidden="true">↗</span></a><button type="button" className={styles.backToCases} onClick={() => setOpen(false)}>Terug naar de cases</button></div>
      </div>
    </dialog>}
  </article>;
}
