import Image from "next/image";
import type { ReactNode } from "react";

/**
 * ProductFrame: the boundary where a Melbae product's own world appears
 * inside the corporate page. The frame is Melbae's (paper ground, hairline
 * border); the inside belongs to the product (its ground, accent, mark).
 * Today only the Basha OS accent slot exists.
 */
export function ProductFrame({
  mark,
  name,
  category,
  children,
  className,
}: {
  mark: { src: string; alt: string };
  name: string;
  category: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-label={`${name} product`}
      className={[
        "overflow-hidden rounded-md border border-line bg-basha-ground text-basha-text shadow-(--shadow-frame)",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="flex items-center gap-3 border-b border-basha-line px-5 py-4 sm:px-8">
        <span className="flex h-9 w-9 items-center justify-center rounded-xs bg-[#f3f5f2]">
          <Image
            src={mark.src}
            alt=""
            width={26}
            height={26}
            className="h-[26px] w-[26px] object-contain"
          />
        </span>
        <span className="font-display text-body font-semibold text-basha-text">
          {name}
        </span>
        <span className="hidden font-display text-caption text-basha-muted sm:inline">
          {category}
        </span>
        <span className="ml-auto font-display text-caption text-basha-muted">
          A Melbae product
        </span>
      </header>
      <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">{children}</div>
    </section>
  );
}
