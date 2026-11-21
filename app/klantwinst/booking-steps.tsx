import styles from "./page.module.css";

export function BookingSteps({ current }: { current: 1 | 2 | "complete" }) {
  return <ol className={styles.bookingSteps} aria-label="Je aanvraag in twee stappen">
    {["Je aanvraag", "Moment kiezen"].map((label, index) => {
      const step = index + 1;
      const done = current === "complete" || step < current;
      return <li key={label} aria-current={current === step ? "step" : undefined} data-complete={done || undefined}>
        <span aria-hidden="true">{done ? "✓" : step}</span>{label}{done && <span className={styles.bookingSrOnly}> afgerond</span>}
      </li>;
    })}
  </ol>;
}
