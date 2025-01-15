"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqCountMiddleware = exports.activeRequestsGauge = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const reqCounter = new prom_client_1.default.Counter({
    name: 'http_request_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});
exports.activeRequestsGauge = new prom_client_1.default.Gauge({
    name: 'active_requests',
    help: 'Number of active requests'
});
const reqCountMiddleware = (req, res, next) => {
    const startTime = Date.now();
    exports.activeRequestsGauge.inc();
    res.on('finish', () => {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms.`);
        reqCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
        exports.activeRequestsGauge.dec();
    });
    next();
};
exports.reqCountMiddleware = reqCountMiddleware;
