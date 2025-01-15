"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const influxdb_client_1 = require("@influxdata/influxdb-client");
const url = 'http://localhost:8086';
const token = process.env.INFLUXDB_TOKEN;
const org = 'Oracle';
const bucket = 'http_requests';
const client = new influxdb_client_1.InfluxDB({ url, token });
const writeClient = client.getWriteApi(org, bucket, 'ns');
const writePoints = () => {
    for (let i = 0; i < 5; i++) {
        const point = new influxdb_client_1.Point('measurement1')
            .tag('tagname1', 'tagvalue1')
            .intField('field1', i);
        setTimeout(() => {
            writeClient.writePoint(point);
            console.log(`Point written: ${point}`);
        }, i * 1000);
    }
};
writePoints();
