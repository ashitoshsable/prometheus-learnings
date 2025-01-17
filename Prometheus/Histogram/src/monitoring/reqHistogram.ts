import { Request, Response, NextFunction } from "express";
import client from "prom-client";

const reqCounter = new client.Counter({
    name: 'http_request_total',
    help:'Total number of HTTP requests',
    labelNames:['method','route','status_code']
})

export const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.5, 1.5, 2.5, 3.5, 5, 10, 100, 300, 500] 
});

export const reqCountMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const startTime=Date.now();

    res.on('finish',()=>{
        const endTime=Date.now();
        console.log(`Request took ${endTime-startTime}ms.`);

        reqCounter.inc({
            method:req.method,
            route:req.route?req.route.path:req.path,
            status_code:res.statusCode
        });

        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, endTime-startTime);
        
    });

    next();
}