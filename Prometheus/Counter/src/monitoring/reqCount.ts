import { Request, Response, NextFunction } from "express";
import client from "prom-client";

const reqCounter = new client.Counter({
    name: 'http_request_total',
    help:'Total number of HTTP requests',
    labelNames:['method','route','status_code']
})

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
    });

    next();
}