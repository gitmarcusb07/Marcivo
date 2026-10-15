export function getList(key: string): string[] {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}
export function addToList(key: string, v: string) {
  const cur = getList(key).filter((x) => x !== v);
  cur.unshift(v);
  localStorage.setItem(key, JSON.stringify(cur.slice(0, 30)));
}
export function toggleInList(key: string, v: string) {
  const cur = getList(key);
  const next = cur.includes(v) ? cur.filter((x) => x !== v) : [v, ...cur].slice(0, 50);
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}
