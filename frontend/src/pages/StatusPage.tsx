import { useCallback, useEffect, useState } from "react";
import { api, API_BASE, backendInfo } from "../lib/api";
import { SearchBar } from "../components/ui";

function Row({ k, v, good }: { k: string; v: string; good?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5">
      <span className="text-sm text-gray-300">{k}</span>
      <span className={`text-sm font-bold ${good === undefined ? "" : good ? "text-green-400" : "text-red-400"}`}>{v}</span>
    </div>
  );
}

export default function StatusPage() {
  const [info, setInfo] = useState({ ok: false, build: "?" });
  const [m, setM] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [b, met] = await Promise.all([
      backendInfo().catch(() => ({ ok: false, build: "?" })),
      api.metrics().catch(() => null),
    ]);
    setInfo(b);
    setM(met);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, [load]);

  const hitRate = m ? `${Math.round((m.cacheHitRate || 0) * 100)}%` : "—";
  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <SearchBar placeholder="Search movies, series..." />
      <h1 className="font-display text-3xl mt-4">Site Status</h1>
      <p className="text-xs text-muted mt-1 break-all">{API_BASE}</p>

      <div className="mt-3 bg-card border border-white/10 rounded-xl px-4 py-2">
        <Row k="Backend" v={loading ? "checking…" : info.ok ? "🟢 connected" : "🔴 unreachable"} good={info.ok} />
        <Row k="Build" v={info.build} />
        {m && (
          <>
            <Row k="Uptime" v={`${Math.floor((m.uptimeSec || 0) / 60)} min`} />
            <Row k="Streams resolved" v={String(m.resolved ?? "—")} good />
            <Row k="Cache hit rate" v={hitRate} />
            <Row k="Avg resolve" v={m.avgResolveMs ? `${Math.round(m.avgResolveMs / 1000)}s` : "—"} />
            <Row k="Pre-resolved" v={String(m.preResolved ?? "—")} />
            <Row k="Active jobs" v={String(m.activeJobs ?? m.inflightJobs ?? "—")} />
            <Row k="Queued jobs" v={String(m.queuedJobs ?? "—")} />
            <Row k="Cache entries" v={String(m.cacheEntries ?? "—")} />
          </>
        )}
      </div>

      <button onClick={load} className="mt-4 px-6 py-2 rounded-lg bg-netflix font-bold text-sm">↻ Refresh</button>
      {!loading && !info.ok && (
        <p className="text-red-400 text-sm mt-3">The backend did not answer. It may still be waking up — hit Refresh in a minute, or check the service on Render.</p>
      )}
    </div>
  );
}
