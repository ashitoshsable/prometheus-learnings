import express from "express";
import client from "prom-client";
import { reqCountMiddleware } from "./monitoring/reqCount";

const app = express();
const port = 3000;

app.use(reqCountMiddleware);

app.get("/metrics",async(req,res)=>{
    const metrics = await client.register.metrics();
    res.set('Content-Type',client.register.contentType);
    res.end(metrics);
});

app.get("/user",(req,res)=>{
    res.json({
        Name: "Ashitosh Madhukar Sable"
    });
});

app.post("/user",(req,res)=>{
    res.json({
        Name: "Ashitosh Madhukar Sable"
    });
});

app.listen(port,()=>{
    console.log(`The server is running on port ${port}.`);
});