import vnStat from "./vnstat";

// Return formatted traffic

export function formatTraffic(bytes, decimals = 2) {
  const units = vnStat.getUnits();
  const prefixes = units.bytes;
  if (bytes === 0) return "0 " + prefixes[0];
  const k = units.base;
  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + prefixes[i];
}
