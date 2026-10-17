import AdSlot from "./AdSlot";
import type { SlotName } from "./config";

/**
 * Completes the site-wide ad set on pages that don't already carry every
 * unit: renders the given slots as a centered block (two columns on md+,
 * stacked on phones).
 *
 * Each page passes only the units it isn't already showing elsewhere, so a
 * unit never loads twice on the same page while every page still ends up
 * carrying the full Adsterra set (7 banners + native, plus the page-wide
 * popunder / social bar / smartlink).
 */
export default function AdBand({
  slots,
  className = "",
}: {
  slots: SlotName[];
  className?: string;
}) {
  if (!slots.length) return null;
  return (
    <div className={`grid gap-8 md:grid-cols-2 items-start ${className}`}>
      {slots.map((name) => (
        <AdSlot key={name} name={name} />
      ))}
    </div>
  );
}
