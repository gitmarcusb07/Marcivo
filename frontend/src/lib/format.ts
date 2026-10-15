// Clean "Download ..." site titles into a short display title + detail chips.
// e.g. "Download Resident Evil (2002) Dual Audio {Hindi-English} BluRay
//       480p [350MB] | 720p [1.3GB] | 1080p [3.2GB]"
//   -> title: "Resident Evil", badges: [2002, Dual Audio, Hindi-English,
//      BluRay, 480p, 720p, 1080p]

export interface PrettyVersion { title: string; badges: string[]; }

const QUALITY = /\b(2160p|1080p|720p|480p|360p|4K)\b/gi;
const YEAR = /\b((?:19|20)\d{2})\b/;
const SOURCE = /\b(BluRay|Blu-Ray|WEB-DL|WEBRip|HDRip|HDTS|HDTC|HDCAM|CAMRip|Pre-DVDRip|DVDScr|DVDrip)\b/i;
const AUDIO = /\b(Dual Audio|Multi Audio|Triple Audio|Single Audio)\b/i;
const LANG = /\{(Hindi-English|Hindi-English-Tamil|Hindi-Tamil-Telugu|Hindi-Tamil|Hindi-Telugu|Hindi|English|Tamil|Telugu)\b[^}]*\}/i;
const DUBBED = /\b(Hindi Dubbed|English Dubbed|Tamil Dubbed|Telugu Dubbed)\b/i;
const SERIES = /\b(Season\s*\d+|S\d+\s*E\d+|Complete|Episode\s*\d+|Web Series)\b/i;

export function prettyVersion(raw: string): PrettyVersion {
  let t = (raw || "").replace(/\s+/g, " ").trim();
  t = t.replace(/^download\s+/i, "");
  const badges: string[] = [];
  const ym = t.match(YEAR);
  if (ym) badges.push(ym[1]);
  const am = t.match(AUDIO);
  if (am) badges.push(am[1]);
  const lm = t.match(LANG);
  if (lm) badges.push(lm[1]);
  else {
    const dm = t.match(DUBBED);
    if (dm) badges.push(dm[1]);
  }
  const sm = t.match(SOURCE);
  if (sm) badges.push(sm[1].toUpperCase().replace("BLU-RAY", "BluRay"));
  const quals = [...new Set((t.match(QUALITY) || []).map((x) => x.toUpperCase()))];
  // keep ascending order
  const order = ["360P", "480P", "720P", "1080P", "2160P", "4K"];
  quals.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  badges.push(...quals);
  const sem = t.match(SERIES);
  if (sem) badges.push(sem[1]);

  // Short title: cut at the first badge-like marker.
  let title = t;
  const cutAt = [
    title.search(/\(\s*(?:19|20)\d{2}\s*\)/),
    title.search(/\b(?:19|20)\d{2}\b/),
    title.search(/\b(Dual Audio|Multi Audio|Triple Audio|Single Audio)\b/i),
    title.search(/\{/),
    title.search(/\b(Season\s*\d+|Complete|Episode\s*\d+|Web Series)\b/i),
    title.search(/\b(BluRay|Blu-Ray|WEB-DL|WEBRip|HDRip|HDTS|HDTC|HDCAM|CAMRip)\b/i),
    title.search(/\b(480p|720p|1080p|2160p|4K)\b/i),
    title.search(/\[/),
    title.search(/\|/),
  ].filter((i) => i > 0);
  if (cutAt.length) title = title.slice(0, Math.min(...cutAt)).trim();
  title = title.replace(/[-–:|]+$/g, "").replace(/\s+/g, " ").trim() || t;
  return { title, badges: [...new Set(badges)].slice(0, 8) };
}
