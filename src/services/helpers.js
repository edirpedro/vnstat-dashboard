import { DateTime, Interval } from "luxon";

// Return formatted traffic

export function formatTraffic(bytes, decimals = 2) {
  const units = getUnits();
  if (bytes === 0) return "0 " + units.prefixes[0];
  const k = units.base;
  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + units.prefixes[i]
  );
}

// Return formatted traffic rate

export function formatTrafficRate(bits, decimals = 2) {
  const units = getUnits();
  if (bits === 0) return "0 " + units.rates[0];
  const k = units.base;
  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bits) / Math.log(k));
  return (
    parseFloat((bits / Math.pow(k, i)).toFixed(dm)) + " " + units.rates[i]
  );
}

// Calculate traffic rate
// https://github.com/vergoh/vnstat/blob/master/src/misc.c - getperiodseconds()

export function getTrafficRate(entry, type, updated, isongoing = false) {
  let interval;
  const updatedObj = { ...updated.date, ...updated.time };

  if (isongoing) {
    switch (type) {
      case "top":
        interval = 86400;
        break;
      case "fiveminute":
        interval = Interval.fromDateTimes(
          DateTime.fromObject(updatedObj).minus({ minute: 5 }),
          { ...updatedObj }
        ).length("seconds");
        break;
      case "hour":
        interval = Interval.fromDateTimes(
          { ...updatedObj, minute: 0 },
          { ...updatedObj }
        ).length("seconds");
        break;
      case "day":
        interval = Interval.fromDateTimes(
          { ...updatedObj, hour: 0, minute: 0 },
          { ...updatedObj }
        ).length("seconds");
        break;
      case "month":
        interval = Interval.fromDateTimes(
          { ...updatedObj, day: 1, hour: 0, minute: 0 },
          { ...updatedObj }
        ).length("seconds");
        break;
      case "year":
        interval = Interval.fromDateTimes(
          { ...updatedObj, month: 1, day: 1, hour: 0, minute: 0 },
          { ...updatedObj }
        ).length("seconds");
        break;
      default:
        interval = 0;
    }
  } else {
    switch (type) {
      case "top":
      case "day":
        interval = 86400;
        break;
      case "month":
        interval = DateTime.fromObject({ ...entry.date }).daysInMonth * 86400;
        break;
      case "year":
        interval = DateTime.fromObject({ ...entry.date }).daysInYear * 86400;
        break;
      case "hour":
        interval = 3600;
        break;
      case "fiveminute":
        interval = 300;
        break;
      default:
        interval = 0;
    }
  }

  if (interval === 0) return 0;

  return ((entry.rx + entry.tx) * 8) / interval;
}

// Get units to format traffic data

export function getUnits() {
  const options = {
    IEC: {
      base: 1024,
      prefixes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"],
      rates: ["bit/s", "Kibit/s", "Mibit/s", "Gibit/s", "Tibit/s", "Pibit/s", "Eibit/s"], // prettier-ignore
    },
    JEDEC: {
      base: 1024,
      prefixes: ["B", "KB", "MB", "GB", "TB", "PB", "EB"],
      rates: ["bit/s", "Kbit/s", "Mbit/s", "Gbit/s", "Tbit/s", "Pbit/s", "Ebit/s"], // prettier-ignore
    },
    SI: {
      base: 1000,
      prefixes: ["B", "kB", "MB", "GB", "TB", "PB", "EB"],
      rates: ["bit/s", "kbit/s", "Mbit/s", "Gbit/s", "Tbit/s", "Pbit/s", "Ebit/s"], // prettier-ignore
    },
  };
  const units = window.vnStat.units ?? "IEC";
  return options[units];
}
