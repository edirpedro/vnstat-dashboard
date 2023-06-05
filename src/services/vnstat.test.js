const { default: vnStat } = require("./vnstat");

const json = {
  vnstatversion: "2.9",
  jsonversion: "2",
  interfaces: [
    {
      name: "en0",
      alias: "Network",
      created: { date: { year: 2019, month: 8, day: 8 } },
      updated: {
        date: { year: 2023, month: 9, day: 14 },
        time: { hour: 10, minute: 15 },
      },
      traffic: {
        total: { rx: 1500000, tx: 1500000 },
        fiveminute: [
          {
            id: 1,
            date: { year: 2023, month: 1, day: 1 },
            time: { hour: 12, minute: 0 },
            rx: 1500000,
            tx: 1500000,
          },
          {
            id: 2,
            date: { year: 2023, month: 1, day: 1 },
            time: { hour: 12, minute: 15 },
            rx: 1500000,
            tx: 1500000,
          },
        ],
        hour: [
          {
            id: 1,
            date: { year: 2023, month: 1, day: 1 },
            time: { hour: 12, minute: 0 },
            rx: 1500000,
            tx: 1500000,
          },
          {
            id: 2,
            date: { year: 2023, month: 1, day: 1 },
            time: { hour: 14, minute: 0 },
            rx: 1500000,
            tx: 1500000,
          },
        ],
        day: [
          {
            id: 1,
            date: { year: 2023, month: 1, day: 1 },
            rx: 1500000,
            tx: 1500000,
          },
          {
            id: 2,
            date: { year: 2023, month: 1, day: 3 },
            rx: 1500000,
            tx: 1500000,
          },
        ],
        month: [
          {
            id: 1,
            date: { year: 2023, month: 1 },
            rx: 1500000,
            tx: 1500000,
          },
          {
            id: 2,
            date: { year: 2023, month: 3 },
            rx: 1500000,
            tx: 1500000,
          },
        ],
        year: [
          { id: 1, date: { year: 2021 }, rx: 1500000, tx: 1500000 },
          { id: 2, date: { year: 2023 }, rx: 1500000, tx: 1500000 },
        ],
        top: [
          {
            id: 1,
            date: { year: 2023, month: 1, day: 10 },
            rx: 1500000,
            tx: 1500000,
          },
        ],
      },
    },
  ],
};

const unit = {
  name: "SI",
  base: 1000,
  bytes: ["B", "kB", "MB", "GB", "TB", "PB", "EB"],
  bits: ["bit/s", "kbit/s", "Mbit/s", "Gbit/s", "Tbit/s", "Pbit/s", "Ebit/s"], // prettier-ignore
};

describe("vnStat class", () => {
  const reports = new vnStat(json, unit);

  it("Can load JSON", () => {
    expect(reports).toBeInstanceOf(vnStat);
  });

  it("getVersion()", () => {
    expect(reports.getVersion()).toBe("2.9");
  });

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
});
