import { DateTime, Interval } from "luxon";

class vnStat {
  _json = [];
  _units = {};

  /**
   * Instantiate a vnStat object to manipulate the reports
   * @param {array} json Traffic data retrieved from vnStat
   * @returns {object}
   */
  constructor(json) {
    if (json.interfaces.length === 0) return false;
    this._json = json;
    this._units = vnStat.getUnits();
    this.prepare();
    return this;
  }

  // Functions to collect data from the JSON.

  getVersion() {
    return this._json.vnstatversion;
  }

  getInterface() {
    return this._json.interfaces[0].name;
  }

  getCreated() {
    if (this._json.length === 0) return [];
    return this._json.interfaces[0].created;
  }

  getUpdated() {
    if (this._json.length === 0) return [];
    return this._json.interfaces[0].updated;
  }

  getTotal() {
    if (this._json.length === 0) return [];
    return this._json.interfaces[0].traffic.total;
  }

  getFiveMinute(gaps = false) {
    return this.getTraffic("fiveminute", gaps);
  }

  getHour(gaps = false) {
    return this.getTraffic("hour", gaps);
  }

  getDay(gaps = false) {
    return this.getTraffic("day", gaps);
  }

  getMonth(gaps = false) {
    return this.getTraffic("month", gaps);
  }

  getYear(gaps = false) {
    return this.getTraffic("year", gaps);
  }

  getTop() {
    return this.getTraffic("top");
  }

  /**
   * Get traffic data, clonning it to avoid replacements.
   * @param {string} type Type of report fiveminute, hour, day, month or year
   * @param {boolean} gaps Include or not the gaps on the return
   * @returns {array}
   */
  getTraffic(type = null, gaps = false) {
    if (this._json.length === 0) return [];
    let traffic = structuredClone(this._json.interfaces[0].traffic);
    if (type) {
      traffic = type in traffic ? traffic[type] : [];
      if (gaps === false) traffic = this.noGaps(traffic);
    } else if (gaps === false) {
      Object.keys(traffic).forEach((type) => {
        if (type === "total") return;
        traffic[type] = this.noGaps(traffic[type]);
      });
    }
    return traffic;
  }

  /**
   * Prepare JSON data to be used
   */
  prepare() {
    let traffic = this._json.interfaces[0].traffic;

    // Fill Gaps

    Object.keys(traffic).forEach((type) => this.fillGaps(type));

    // Format all traffic data and calculate rates

    Object.keys(traffic).forEach((type) => {
      let data = traffic[type];
      if (type === "total") {
        data.rx_formatted = this.formatTraffic(data.rx);
        data.tx_formatted = this.formatTraffic(data.tx);
        data.total = data.rx + data.tx;
        data.total_formatted = this.formatTraffic(data.total);
      } else {
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
   * @param {string} type Type of report fiveminute, hour, day, month or year
   * @returns {class}
   */
  fillGaps(type) {
    // Check if we can build gaps

    const allowed = ["fiveminute", "hour", "day", "month", "year"];
    if (!allowed.includes(type)) return this;

    // Check if there is more than one date to create an interval

    const traffic = this.getTraffic(type);
    if (traffic.length < 2) return this;

    // Prepare period between dates

    let start = this.completeDateTime(traffic.at(0));
    start = DateTime.fromObject({ ...start.date, ...start.time });

    let end = this.completeDateTime(traffic.at(-1));
    end = DateTime.fromObject({ ...end.date, ...end.time });

    let splitby;

    switch (type) {
      case "fiveminute":
        splitby = { minutes: 5 };
        break;
      case "hour":
        splitby = { hour: 1 };
        break;
      case "day":
        splitby = { day: 1 };
        break;
      case "month":
        splitby = { month: 1 };
        break;
      case "year":
        splitby = { year: 1 };
        break;
      default:
    }

    let dates = Interval.fromDateTimes(start, end);
    let steps = dates.splitBy(splitby).map((d) => d.start);
    let data = [];

    // Fill with steps

    steps.forEach((el) => {
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
      let compare = this.completeDateTime(item);
      compare = DateTime.fromObject({
        ...compare.date,
        ...compare.time,
      }).toSQL();
      const key = data.findIndex((el) => el.datetime === compare);
      if (key >= 0) data[key] = { ...data[key], ...item };
    });

    // Update

    this._json.interfaces[0].traffic[type] = data;

    return this;
  }

  /**
   * Filter traffic without including the gaps.
   * @param {array} traffic Traffic array
   * @returns {array}
   */
  noGaps(traffic) {
    return traffic.filter((el) => el.id);
  }

  /**
   * Add missing date or time objects.
   * @param {*} item The vnStat single traffic data
   * @returns {object}
   */
  completeDateTime(item) {
    let obj = {
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
    return obj;
  }

  /**
   * Format traffic
   * @param {integer} bytes Traffic data
   * @param {integer} decimals Decimals to show
   * @param {boolean} rate Return in bit rate
   * @returns {string}
   */
  formatTraffic(bytes, decimals = 2, rate = false) {
    const prefixes = rate ? this._units.rates : this._units.prefixes;
    if (bytes === 0) return "0 " + prefixes[0];
    const k = this._units.base;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + prefixes[i];
  }

  /**
   * Calculate traffic rate
   * https://github.com/vergoh/vnstat/blob/master/src/misc.c - getperiodseconds()
   * @param {data} entry Data to be calculated
   * @param {string} type Type of report
   * @param {boolean} isongoing If data is beeing recorded
   * @returns
   */
  calculateTrafficRate(entry, type, isongoing = false) {
    let interval;
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
        default:
          interval = 0;
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

  /**
   * Get current units to format traffic data
   * @returns {}
   */
  static getUnits() {
    const options = {
      IEC: {
				name: "IEC",
        base: 1024,
        prefixes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"],
        rates: ["bit/s", "Kibit/s", "Mibit/s", "Gibit/s", "Tibit/s", "Pibit/s", "Eibit/s"], // prettier-ignore
      },
      JEDEC: {
				name: "JEDEC",
        base: 1024,
        prefixes: ["B", "KB", "MB", "GB", "TB", "PB", "EB"],
        rates: ["bit/s", "Kbit/s", "Mbit/s", "Gbit/s", "Tbit/s", "Pbit/s", "Ebit/s"], // prettier-ignore
      },
      SI: {
				name: "SI",
        base: 1000,
        prefixes: ["B", "kB", "MB", "GB", "TB", "PB", "EB"],
        rates: ["bit/s", "kbit/s", "Mbit/s", "Gbit/s", "Tbit/s", "Pbit/s", "Ebit/s"], // prettier-ignore
      },
    };
    const units = window.vnStat_UNITS ?? "IEC";
   	return options[units] ?? options.IEC;
  }
}

export default vnStat;
