import { statusLabel, type CatStatus } from "@/lib/cats";

const tone: Record<CatStatus, string> = {
  disponivel: "bg-available-bg text-available",
  em_processo: "bg-progress-bg text-progress",
  adotado: "bg-adopted-bg text-adopted",
};

export function StatusBadge({ status }: { status: CatStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-wide ${tone[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}
