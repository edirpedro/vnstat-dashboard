import { DateTime, Interval } from "luxon";

class vnStat {
  _json = [];

  /**
   * Instantiate a vnStat object to manipulate the reports
   * @param {array} json Traffic data retrieved from vnStat
   * @returns {object}
   */
  constructor(json) {
    if (json.interfaces.length === 0) return false;
    this._json = json;
    const traffic = this._json.interfaces[0].traffic;
    Object.keys(traffic).forEach((type) => this.fillGaps(type));
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
    return this.completeDateTime(this._json.interfaces[0].created);
  }

  getUpdated() {
    if (this._json.length === 0) return [];
    return this.completeDateTime(this._json.interfaces[0].updated);
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
        start = end.minus({ hour: 24 });
        splitby = { minutes: 5 };
        break;
      case "hour":
        start = end.minus({ hour: 48 });
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
      data[key] = { ...data[key], ...item };
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
}

export default vnStat;
