import { IvnStat } from "services/vnstat.type";
import useSettings, { ISettings } from "./useSettings";

const useHelpers = () => {
  const { settings } = useSettings();

  /** Return formatted traffic.
   * @returns {string}
   */
  function formatTraffic(bytes: number, decimals: number = 2): string {
    const units = getUnit();
    const prefixes = units.bytes;
    if (bytes === 0) return "0 " + prefixes[0];
    const k = units.base;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + prefixes[i];
  }

  /**
   * Get unit to format traffic data.
   * @returns {object}
   */
  function getUnit(
    name: ISettings.Options["units"] = settings.units
  ): IvnStat.Unit {
    return getUnitOptions().filter((el) => el.name === name)[0];
  }

  /**
   * Get units options.
   * @returns {object}
   */
  function getUnitOptions(): IvnStat.Unit[] {
    return [
      {
        name: "IEC",
        base: 1024,
        bytes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"],
        bits: ["bit/s", "Kibit/s", "Mibit/s", "Gibit/s", "Tibit/s", "Pibit/s", "Eibit/s"], // prettier-ignore
      },
      {
        name: "JEDEC",
        base: 1024,
        bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB"],
        bits: ["bit/s", "Kbit/s", "Mbit/s", "Gbit/s", "Tbit/s", "Pbit/s", "Ebit/s"], // prettier-ignore
      },
      {
        name: "SI",
        base: 1000,
        bytes: ["B", "kB", "MB", "GB", "TB", "PB", "EB"],
        bits: ["bit/s", "kbit/s", "Mbit/s", "Gbit/s", "Tbit/s", "Pbit/s", "Ebit/s"], // prettier-ignore
      },
    ];
  }

  return {
    formatTraffic,
    getUnit,
    getUnitOptions,
  };
};

export default useHelpers;
