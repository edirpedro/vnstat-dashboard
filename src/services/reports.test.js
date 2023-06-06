import vnStat from "./vnstat";
import { json, unit } from "./vnstat.test";

describe("Reports class", () => {
  const vnstat = new vnStat(json);
  const reports = vnstat.getReports("en0", unit);

  it("getInterface()", () => {
    expect(reports.getInterface()).toBe("en0");
  });

  it("getCreated()", () => {
    expect(reports.getCreated()).toHaveProperty("date");
  });

  it("getUpdated()", () => {
    const updated = reports.getUpdated();
    expect(updated).toHaveProperty("date");
    expect(updated).toHaveProperty("time");
  });

  it("getTotal()", () => {
    const total = reports.getTotal();
    expect(total).toHaveProperty("rx");
    expect(total).toHaveProperty("tx");
  });

  it("getFiveMinute()", () => {
    expect(reports.getFiveMinute()).toHaveLength(2);
    expect(reports.getFiveMinute(true)).toHaveLength(4);
  });

  it("getHour()", () => {
    expect(reports.getHour()).toHaveLength(2);
    expect(reports.getHour(true)).toHaveLength(3);
  });

  it("getDay()", () => {
    expect(reports.getDay()).toHaveLength(2);
    expect(reports.getDay(true)).toHaveLength(3);
  });

  it("getMonth()", () => {
    expect(reports.getMonth()).toHaveLength(2);
    expect(reports.getMonth(true)).toHaveLength(3);
  });

  it("getYear()", () => {
    expect(reports.getYear()).toHaveLength(2);
    expect(reports.getYear(true)).toHaveLength(3);
  });

  it("getTop()", () => {
    expect(reports.getTop()).toHaveLength(1);
  });

  it("Can calculate rate traffic", () => {
    const traffic = reports.getDay()[0];
    expect(traffic.rate).toBe(277.77777777777777);
  });

  it("Can format traffic", () => {
    const traffic = reports.getDay()[0];
    expect(traffic.rx_formatted).toBe("1.5 MB");
    expect(traffic.rate_formatted).toBe("277.78 bit/s");
  });

  it("Has all traffic details", () => {
    const traffic = reports.getDay()[0];
    expect(traffic).toHaveProperty("datetime");
    expect(traffic).toHaveProperty("rx_formatted");
    expect(traffic).toHaveProperty("tx_formatted");
    expect(traffic).toHaveProperty("total");
    expect(traffic).toHaveProperty("total_formatted");
    expect(traffic).toHaveProperty("rate");
    expect(traffic).toHaveProperty("rate_formatted");
    expect(traffic).toHaveProperty("rx_formatted");
  });

  it("Is merging traffic data", () => {
    const reports = vnstat.getReports("en0+en1", unit);
    const traffic = reports.getDay()[0];
    expect(traffic.rx).toBe(3000000);
  });
});
