import { Fragment } from "react";

export default function Breadcrumb({ trail }: { trail: string[] }) {
  return (
    <p className="mono-tag flex flex-wrap items-center gap-1.5 text-xs text-ink-faint">
      {trail.map((crumb, i) => (
        <Fragment key={i}>
          {i > 0 && <span>/</span>}
          <span>{crumb}</span>
        </Fragment>
      ))}
    </p>
  );
}
