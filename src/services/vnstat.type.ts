export namespace IvnStat {

  export type JSON = {
    vnstatversion: string
    jsonversion: string
    interfaces: [
      {
        name: string
        alias: string
        created: {
          date: Date
        }
        updated: {
          date: Date
          time?: Time
        }
        traffic: {
          total: Total
          fiveminute: Traffic[]
          hour: Traffic[]
          day: Traffic[]
          month: Traffic[]
          year: Traffic[]
          top: Traffic[]
        }
      }
    ]
  }

  export type Date = {
    year: number
    month?: number
    day?: number
  }

  export type Time = {
    hour: number
    minute: number
  }

  export type Traffic = {
    id?: number
    date: Date
    time?: Time
    rx: number
    rx_formatted?: string
    tx: number
    tx_formatted?: string
    total?: number
    total_formatted?: string
    rate?: number
    rate_formatted?: string
    datetime?: string | null
  }

  export type Total = {
    rx: number
    rx_formatted?: string
    tx: number
    tx_formatted?: string
    total?: number
    total_formatted?: string
  };

  export type Interfaces = IvnStat.JSON['interfaces'];

  export type Interface = IvnStat.JSON['interfaces'][number];

  export type Created = Interfaces[number]['created'];

  export type Updated = Interfaces[number]['updated'];

  export type Traffics = Interfaces[number]['traffic'];

  export type TrafficKeys = keyof Omit<Traffics, 'total'>;

  export type Unit = {
    name: string
    base: number
    bytes: string[]
    bits: string[]
  }

}
