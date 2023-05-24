import { DateTime, Interval } from "luxon";
import { IvnStat } from "./vnstat.type";

class vnStat {

  private _json: IvnStat.JSON;
  private _unit: IvnStat.Unit;
  private _interface: IvnStat.Interface;

  /**
   * Instantiate a vnStat object to manipulate the reports.
   * @param {array} json - Traffic data retrieved from vnStat
   * @returns {instance}
   */
  constructor(json: IvnStat.JSON) {
    this._json = json;
    this._interface = this._json.interfaces[0]; // shortcut
    this._unit = vnStat.getUnit();
    this.prepare();
    return this;
  }

  // Functions to collect data from the JSON.

  getVersion(): string {
    return this._json.vnstatversion;
  }

  getInterface(): string {
    return this._interface.name;
  }

  getCreated(): IvnStat.Created {
    return this._interface.created;
  }

  getUpdated(): IvnStat.Updated {
    return this._interface.updated;
  }

  getTotal(): IvnStat.Total {
    return this._interface.traffic.total;
  }

  getFiveMinute(gaps: boolean = false): IvnStat.Traffic[] {
    return this.getTraffic("fiveminute", gaps);
  }

  getHour(gaps: boolean = false): IvnStat.Traffic[] {
    return this.getTraffic("hour", gaps);
  }

  getDay(gaps: boolean = false): IvnStat.Traffic[] {
    return this.getTraffic("day", gaps);
  }

  getMonth(gaps: boolean = false): IvnStat.Traffic[] {
    return this.getTraffic("month", gaps);
  }

  getYear(gaps: boolean = false): IvnStat.Traffic[] {
    return this.getTraffic("year", gaps);
  }

  getTop(): IvnStat.Traffic[] {
    return this.getTraffic("top");
  }

  /**
   * Get traffic data, clonning it to avoid replacements.
   * @param {string} type - Type of report top, fiveminute, hour, day, month or year
   * @param {boolean} gaps - Include or not the gaps on the return
   * @returns {IvnStat.Traffic[]}
   */
  getTraffic(type: IvnStat.TrafficKeys, gaps: boolean = false): IvnStat.Traffic[] {
    let traffic = this._interface.traffic;
    let data: IvnStat.Traffic[] = [];
    data = structuredClone(traffic[type]) as IvnStat.Traffic[];
    if (gaps === false) return this.noGaps(data);
    return data;
  }

  /**
   * Get all traffic data, clonning it to avoid replacements.
   * @param {boolean} gaps - Include or not the gaps on the return
   * @returns {IvnStat.Traffics}
   */
  getAllTraffic(gaps: boolean = false): IvnStat.Traffics {
    let traffic = structuredClone(this._interface.traffic) as IvnStat.Traffics;
    let keys = Object.keys(traffic) as Array<keyof typeof traffic>;
    keys.forEach((type) => {
      if (type === "total") return;
      traffic[type] = this.getTraffic(type, gaps);
    });
    return traffic;
  }

  /**
   * Prepare JSON data to be used
   */
  private prepare(): void {
    let traffic = this._interface.traffic;
    let keys = Object.keys(traffic) as Array<keyof typeof traffic>;

    // Fill Gaps

    keys.forEach((type) => type !== 'total' && this.fillGaps(type));

    // Format all traffic data and calculate rates

    keys.forEach((type) => {
      if (type === "total") {
        let data = traffic[type];
        data.rx_formatted = this.formatTraffic(data.rx);
        data.tx_formatted = this.formatTraffic(data.tx);
        data.total = data.rx + data.tx;
        data.total_formatted = this.formatTraffic(data.total);
      } else {
        let data = traffic[type];
        data.forEach((item, index) => {
          const isongoing = index === data.length - 1; // the last item
          const rate = this.calculateTrafficRate(item, type, isongoing);
          item.rx_formatted = this.formatTraffic(item.rx);
          item.tx_formatted = this.formatTraffic(item.tx);
          item.total = item.rx + item.tx;
          item.total_formatted = this.formatTraffic(item.total);
          item.rate = rate;
          item.rate_formatted = this.formatTraffic(rate, 2, true);
        });
      }
    });
  }

  /**
   * Fill the gaps between dates according to the type of report.
   * @param {string} type - Type of report fiveminute, hour, day, month or year
   */
  private fillGaps(type: IvnStat.TrafficKeys): void {

    // Check if we can build gaps

    const allowed = ["fiveminute", "hour", "day", "month", "year"];
    if (!allowed.includes(type)) return;

    // Check if there is more than one date to create an interval

    const traffic = this.getTraffic(type);
    if (traffic.length < 2) return;

    // Prepare period between dates

    let startTraffic = this.completeDateTime(traffic.at(0)!);
    let start = DateTime.fromObject({ ...startTraffic.date, ...startTraffic.time });

    let endTraffic = this.completeDateTime(traffic.at(-1)!);
    let end = DateTime.fromObject({ ...endTraffic.date, ...endTraffic.time });

    let splitby: luxon.DurationLikeObject = {};

    switch (type) {
      case "fiveminute":
        splitby.minute = 5;
        break;
      case "hour":
        splitby.hour = 1;
        break;
      case "day":
        splitby.day = 1;
        break;
      case "month":
        splitby.month = 1;
        break;
      case "year":
        splitby.year = 1;
        break;
      default:
    }

    let dates = Interval.fromDateTimes(start, end);
    let steps = dates.splitBy(splitby).map((d) => d.start);
    let data: IvnStat.Traffic[] = [];

    // Fill with steps

    steps.forEach((el) => {
      if (el === null) return;
      data.push({
        datetime: el.toSQL(),
        date: {
          year: el.year,
          month: el.month,
          day: el.day,
        },
        time: {
          hour: el.hour,
          minute: el.minute,
        },
        rx: 0,
        tx: 0,
      });
    });

    // Add missing step End

    data.push({
      datetime: end.toSQL(),
      date: {
        year: end.year,
        month: end.month,
        day: end.day,
      },
      time: {
        hour: end.hour,
        minute: end.minute,
      },
      rx: 0,
      tx: 0,
    });

    // Fill with real data

    traffic.forEach((item) => {
      let compareTraffic = this.completeDateTime(item);
      let compare = DateTime.fromObject({
        ...compareTraffic.date,
        ...compareTraffic.time,
      }).toSQL();
      const key = data.findIndex((el) => el.datetime === compare);
      if (key >= 0) data[key] = { ...data[key], ...item };
    });

    // Update

    this._interface.traffic[type] = data;

  }

  /**
   * Filter traffic without including the gaps.
   * @param {array} traffic - Traffic array
   * @returns {IvnStat.Traffic[]}
   */
  private noGaps(traffic: IvnStat.Traffic[]): IvnStat.Traffic[] {
    return traffic.filter((el) => el.id);
  }

  /**
   * Add missing date or time objects.
   * @param {array} item - The vnStat single traffic data
   * @returns {IvnStat.Traffic}
   */
  private completeDateTime(item: IvnStat.Traffic): IvnStat.Traffic {
    let traffic = {
      ...item,
      date: {
        year: item.date.year,
        month: item.date.month ?? 1,
        day: item.date.day ?? 1,
      },
      time: {
        hour: item.time?.hour ?? 0,
        minute: item.time?.minute ?? 0,
      },
    };
    return traffic;
  }

  /**
   * Format traffic number.
   * @param {number} bytes - Traffic data
   * @param {number} decimals - Decimals to show
   * @param {boolean} rate - Return in bit rate
   * @returns {string}
   */
  private formatTraffic(bytes: number, decimals: number = 2, bits: boolean = false): string {
    const prefixes = bits ? this._unit.bits : this._unit.bytes;
    if (bytes === 0) return "0 " + prefixes[0];
    const k = this._unit.base;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + prefixes[i];
  }

  /**
   * Calculate traffic rate.
   * https://github.com/vergoh/vnstat/blob/master/src/misc.c - getperiodseconds()
   * @param {array} entry - Data to be calculated
   * @param {string} type - Type of report
   * @param {boolean} isongoing - If data is beeing recorded
   * @returns {number}
   */
  private calculateTrafficRate(entry: IvnStat.Traffic, type: string, isongoing: boolean = false): number {
    let interval = 0;
    let start;
    const updated = this.getUpdated();

    let end = { ...updated.date, ...updated.time };

    if (isongoing) {
      switch (type) {
        case "top":
          interval = 86400;
          break;
        case "fiveminute":
          interval = 300;
          break;
        case "hour":
          start = DateTime.fromObject({ ...end, minute: 0 });
          break;
        case "day":
          start = DateTime.fromObject({ ...end, hour: 0, minute: 0 });
          break;
        case "month":
          start = DateTime.fromObject({ ...end, day: 1, hour: 0, minute: 0 }); // prettier-ignore
          break;
        case "year":
          start = DateTime.fromObject({ ...end, month: 1, day: 1, hour: 0, minute: 0 }); // prettier-ignore
          break;
      }
      if (start)
        interval = Interval.fromDateTimes(start, { ...end }).length("seconds");
    } else {
      switch (type) {
        case "top":
        case "day":
          interval = 86400;
          break;
        case "month":
          interval = DateTime.fromObject({ ...entry.date }).daysInMonth! * 86400;
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
      }
    }

    if (interval === 0) return 0;

    return ((entry.rx + entry.tx) * 8) / interval;
  }

  /**
   * Get current unit to format traffic data.
   * @returns {object}
   */
  static getUnit(): IvnStat.Unit {
    const options = vnStat.getUnitOptions();
    const name = (window as any).vnStat_SETTINGS?.units ?? "IEC";
    return options[name];
  }

  /**
   * Get units options.
   * @returns {object}
   */
  static getUnitOptions(): IvnStat.Units {
    return {
      IEC: {
        name: "IEC",
        base: 1024,
        bytes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"],
        bits: ["bit/s", "Kibit/s", "Mibit/s", "Gibit/s", "Tibit/s", "Pibit/s", "Eibit/s"], // prettier-ignore
      },
      JEDEC: {
        name: "JEDEC",
        base: 1024,
        bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB"],
        bits: ["bit/s", "Kbit/s", "Mbit/s", "Gbit/s", "Tbit/s", "Pbit/s", "Ebit/s"], // prettier-ignore
      },
      SI: {
        name: "SI",
        base: 1000,
        bytes: ["B", "kB", "MB", "GB", "TB", "PB", "EB"],
        bits: ["bit/s", "kbit/s", "Mbit/s", "Gbit/s", "Tbit/s", "Pbit/s", "Ebit/s"], // prettier-ignore
      },
    };
  }
}

export default vnStat;
