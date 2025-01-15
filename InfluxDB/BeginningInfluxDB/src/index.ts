import { InfluxDB, Point } from '@influxdata/influxdb-client';

const url = 'http://localhost:8086';
const token = process.env.INFLUXDB_TOKEN;
const org = 'Oracle';
const bucket = 'http_requests';

const client = new InfluxDB({ url, token });
const writeClient = client.getWriteApi(org, bucket, 'ns');

const writePoints = (): void => {
  for (let i = 0; i < 5; i++) {
    const point = new Point('measurement1')
      .tag('tagname1', 'tagvalue1')
      .intField('field1', i);

    setTimeout(() => {
      writeClient.writePoint(point);
      console.log(`Point written: ${point}`);
    }, i * 1000);
  }
}

writePoints();
