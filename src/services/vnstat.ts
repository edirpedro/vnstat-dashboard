import Reports from "./reports";
import { IvnStat } from "./vnstat.type";

class vnStat {

  private _json: IvnStat.JSON;

  /**
   * Instantiate a vnStat object to manipulate the reports
   * @param {array} json Traffic data retrieved from vnStat
   * @returns {object}
   */
  constructor(json: IvnStat.JSON) {
    this._json = json;
    return this;
  }

  // Functions to collect data from the JSON.

  getVersion() {
    return this._json.vnstatversion;
  }

  getInterfaces() {
    return this._json.interfaces.map((item) => ({
      name: item.name,
      alias: item.alias,
    }));
  }

  /**
   * Get the reports of an interface
   * @param {string} iface - Interface name "en0" or "en0+en1"
   * @param {object} unit -  Unit values to format data
   * @returns {Reports}
   */
  getReports(iface: string, unit: IvnStat.Unit): Reports {
    let data: IvnStat.Interface;
    if (iface.indexOf("+") > 0) {
      data = this.mergeInterfaces(iface);
    } else {
      data = this._json.interfaces.filter((item) => item.name === iface).shift() as IvnStat.Interface;
    }
    return new Reports(data, unit);
  }

  /**
   * Merge interfaces data
   * @param {string} ifaces - Interface names like "en0+en1"
   * @returns {IvnStat.Interface}
   */
  mergeInterfaces(ifaces: string): IvnStat.Interface {
    const interfaces = ifaces.split("+");
    const json = this._json.interfaces.filter((item) =>
      interfaces.includes(item.name)
    );
    let data = this.clone(json[0]) as IvnStat.Interface;
    data.name = ifaces;
    data.alias = "";

    json.forEach((item, index) => {
      if (index === 0) return;
      data.traffic.total.rx += item.traffic.total.rx;
      data.traffic.total.tx += item.traffic.total.tx;
      data.traffic.fiveminute = this.mergeTraffic(
        data.traffic.fiveminute,
        item.traffic.fiveminute
      );
      data.traffic.hour = this.mergeTraffic(
        data.traffic.hour,
        item.traffic.hour
      );
      data.traffic.day = this.mergeTraffic(data.traffic.day, item.traffic.day);
      data.traffic.month = this.mergeTraffic(
        data.traffic.month,
        item.traffic.month
      );
      data.traffic.year = this.mergeTraffic(
        data.traffic.year,
        item.traffic.year
      );
      data.traffic.top = this.mergeTraffic(data.traffic.top, item.traffic.top);
    });

    // Sorting Top
    data.traffic.top.sort((a, b) => b.rx - a.rx);

    return data;
  }

  /**
   * Merge the traffic of a report, used by mergeReports()
   * @returns {}
   */
  mergeTraffic(traffic: IvnStat.Traffic[], items: IvnStat.Traffic[]): IvnStat.Traffic[] {
    items.forEach((item, n) => {
      const index = traffic.findIndex((t) => t.timestamp === item.timestamp);
      if (index >= 0) {
        traffic[index].rx += item.rx;
        traffic[index].tx += item.tx;
      } else {
        traffic.push(item);
      }
    });
    traffic.sort((a, b) => a.timestamp - b.timestamp);
    return traffic;
  }

  /**
   * Support for structuredClone() function if not available at Node 16-
   * @param {object} obj - Simple objects
   * @returns {object}
   */
  private clone(obj: object): object {
    if (typeof structuredClone === 'function')
      return structuredClone(obj);
    return JSON.parse(JSON.stringify(obj));
  }

}

export default vnStat;
