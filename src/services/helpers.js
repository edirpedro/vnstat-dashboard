import vnStat from "./vnstat";

// Get configs

export function getConfig(name) {
	switch (name) {
		case "units":
			const units = vnStat.getUnits();
			const option = window.vnStat_UNITS ?? "IEC";
			return units[option] ?? "IEC";
		case "api":
			return window.vnStat_API;
		case "interfaces":
			return window.vnStat_INTERFACES ?? [];
		case "themes":
			return window.vnStat_THEMES ?? [];
		default:
			return null;
	}
}

// Return formatted traffic

export function formatTraffic(bytes, decimals = 2) {
  const units = getConfig("units");
  const prefixes = units.prefixes;
  if (bytes === 0) return "0 " + prefixes[0];
  const k = units.base;
  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + prefixes[i];
}
