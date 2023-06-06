const { default: vnStat } = require("./vnstat");

export const iface = {
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
        timestamp: 1672585200,
        rx: 1500000,
        tx: 1500000,
      },
      {
        id: 2,
        date: { year: 2023, month: 1, day: 1 },
        time: { hour: 12, minute: 15 },
        timestamp: 1672586100,
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
        timestamp: 1672592400,
        rx: 1500000,
        tx: 1500000,
      },
    ],
    day: [
      {
        id: 1,
        date: { year: 2023, month: 1, day: 1 },
        timestamp: 1672542000,
        rx: 1500000,
        tx: 1500000,
      },
      {
        id: 2,
        date: { year: 2023, month: 1, day: 3 },
        timestamp: 1672714800,
        rx: 1500000,
        tx: 1500000,
      },
    ],
    month: [
      {
        id: 1,
        date: { year: 2023, month: 1 },
        timestamp: 1672542000,
        rx: 1500000,
        tx: 1500000,
      },
      {
        id: 2,
        date: { year: 2023, month: 3 },
        timestamp: 1677639600,
        rx: 1500000,
        tx: 1500000,
      },
    ],
    year: [
      {
        id: 1,
        date: { year: 2021 },
        timestamp: 1609470000,
        rx: 1500000,
        tx: 1500000,
      },
      {
        id: 2,
        date: { year: 2023 },
        timestamp: 1672542000,
        rx: 1500000,
        tx: 1500000,
      },
    ],
    top: [
      {
        id: 1,
        date: { year: 2023, month: 1, day: 10 },
        timestamp: 1673319600,
        rx: 1500000,
        tx: 1500000,
      },
    ],
  },
};

export const json = {
  vnstatversion: "2.10",
  jsonversion: "2",
  interfaces: [{ ...iface }, { ...iface, name: "en1" }],
};

export const unit = {
  name: "SI",
  base: 1000,
  bytes: ["B", "kB", "MB", "GB", "TB", "PB", "EB"],
  bits: ["bit/s", "kbit/s", "Mbit/s", "Gbit/s", "Tbit/s", "Pbit/s", "Ebit/s"], // prettier-ignore
};

describe("vnStat class", () => {
  const vnstat = new vnStat(json);

  it("Can load JSON", () => {
    expect(vnstat).toBeInstanceOf(vnStat);
  });

  it("getVersion()", () => {
    expect(vnstat.getVersion()).toBe("2.10");
  });

  it("getInterfaces()", () => {
    expect(vnstat.getInterfaces()).toHaveLength(2);
  });
});
