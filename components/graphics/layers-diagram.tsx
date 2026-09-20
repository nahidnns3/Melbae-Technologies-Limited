import { bashaOs } from "@/content/basha-os";

/**
 * Basha OS operating layers: an HTML diagram (not an image) so it stays
 * legible on phones and readable by assistive tech. Rendered inside the
 * Basha OS product frame, so it uses the product accent slot.
 */
export function LayersDiagram() {
  const views = ["Owner", "Tenant", "Staff"];
  return (
    <figure className="rounded-md border border-basha-line bg-basha-ground p-4 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:gap-6">
        <ol className="space-y-2" aria-label="Operating layers">
          {bashaOs.model.layers.map((layer, i) => (
            <li
              key={layer.name}
              className="grid grid-cols-[6.5rem_1fr] items-center gap-3 rounded-xs border border-basha-line bg-basha-surface px-3 py-3 sm:grid-cols-[7.5rem_1fr]"
            >
              <span className="font-display text-caption font-semibold uppercase tracking-[0.08em] text-basha-accent">
                <span className="mr-2 tabular text-basha-muted">0{i + 1}</span>
                {layer.name}
              </span>
              <span className="font-display text-caption text-basha-muted sm:text-small">
                {layer.detail}
              </span>
            </li>
          ))}
        </ol>
        <div className="flex gap-2 sm:flex-col sm:justify-between" aria-label="Views">
          {views.map((v) => (
            <div
              key={v}
              className="flex flex-1 items-center justify-center rounded-xs border border-dashed border-basha-accent-deep px-3 py-2 font-display text-caption font-semibold text-basha-text sm:min-w-24"
            >
              {v} app
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-4 font-display text-caption text-basha-muted">
        Four layers of a building&rsquo;s data, each shown to owners, tenants and staff
        from their own side.
      </figcaption>
    </figure>
  );
}
