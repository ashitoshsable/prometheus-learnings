"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const influxdb_client_1 = require("@influxdata/influxdb-client");
const app = (0, express_1.default)();
const port = 3001;
const url = 'http://localhost:8086';
const token = process.env.INFLUXDB_TOKEN;
const org = 'Oracle';
const bucket = 'http_requests';
const client = new influxdb_client_1.InfluxDB({ url, token });
const writeApi = client.getWriteApi(org, bucket, 'ns');
app.get('/user', (req, res) => {
    const route = '/user';
    const point = new influxdb_client_1.Point('http_requests')
        .tag('route', route)
        .intField('request_count', 1);
    writeApi.writePoint(point);
    res.send('Request received for /user route');
});
app.get('/metrics', (req, res) => {
    const route = '/metrics';
    const point = new influxdb_client_1.Point('http_requests')
        .tag('route', route)
        .intField('request_count', 1);
    writeApi.writePoint(point);
    res.send('Request received for /metrics route');
});
setInterval(() => {
    writeApi.flush().catch(err => console.error('Error flushing data:', err));
}, 5000);
app.listen(port, () => {
    console.log(`The server is running on port ${port}.`);
});
