import express from "express";
import ServerlessHttp from "serverless-http";

import appRouter from "../src/app";

const api = express();
api.use('/',appRouter);

const handler = ServerlessHttp(api)

module.exports.handler = async(event, context)=>{
  const result = await handler(event, context);
  return result;
}