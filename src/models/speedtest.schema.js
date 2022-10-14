const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { Types } = Schema;

const PingSchema = new Schema({
  jitter: {
    type: Types.Number,
    default: 0.00
  },
  latency: {
    type: Types.Number,
    default: 0.00
  },
  low: {
    type: Types.Number,
    default: 0.00
  },
  high: {
    type: Types.Number,
    default: 0.00
  }
});

const LatencySchema = new Schema({
  jitter: {
    type: Types.Number,
    default: 0.00
  },
  low: {
    type: Types.Number,
    default: 0.00
  },
  high: {
    type: Types.Number,
    default: 0.00
  },
  iqm: {
    type: Types.Number,
    default: 0.00
  }
});

const BandwidthSchema = new Schema({
  bandwidth: {
    type: Types.Number,
    default: 0
  },
  bytes: {
    type: Types.Number,
    default: 0
  },
  elapsed: {
    type: Types.Number,
    default: 0
  },
  latency: {
    type: LatencySchema
  }
});

const InterfaceSchema = new Schema({
  internalIp: {
    type: Types.String
  },
  name: {
    type: Types.String
  },
  macAddr: {
    type: Types.String
  },
  isVpn: {
    type: Types.Boolean
  },
  externalIp: {
    type: Types.String
  }
});

const ServerSchema = new Schema({
  id: {
    type: Types.Number,
    default: 0
  },
  host: {
    type: Types.String
  },
  port: {
    type: Types.Number,
    default: 0
  },
  name: {
    type: Types.String
  },
  location: {
    type: Types.String
  },
  country: {
    type: Types.String
  },
  ip: {
    type: Types.String
  },
});

const ResultSchema = new Schema({
  id: {
    type: Types.String
  },
  url: {
    type: Types.String
  },
  persisted: {
    type: Types.Boolean
  }
});

const SpeedTestSchema = new Schema({
  type: {
    type: Types.String
  },
  timestamp: {
    type: Types.Date
  },
  ping: {
    type: PingSchema
  },
  download: {
    type: BandwidthSchema
  },
  upload: {
    type: BandwidthSchema
  },
  packetLoss: {
    type: Types.Number,
    default: 0
  },
  isp: {
    type: Types.String
  },
  interface: {
    type: InterfaceSchema
  },
  server: {
    type: ServerSchema
  },
  result: {
    type: ResultSchema
  }
});

const SpeedTest = model("SpeedTest", SpeedTestSchema);

module.exports = SpeedTest;