import { Router } from "../dependencies.js";
import {multiParser} from 'https://raw.githubusercontent.com/deligenius/multiparser/master/mod.ts';

import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
const URI = "mongodb://127.0.0.1:27017";

// Mongo Connection Init
const client = new MongoClient();
try {
  await client.connect(URI);
  console.log("Database successfully connected");
} catch (err) {
  console.log(err);
}

const db = client.database("test"); 
const orders = db.collection("orders");

const router = new Router();

router
  .get("/", async (context) => {
    context.render(`${Deno.cwd()}/views/index.ejs`);
  })
  .get("/dashboard", async (context) => {
    // const result = await orders.find();
    context.render(`${Deno.cwd()}/views/dashboard.ejs`);
  })
  .get("/orders", async (context) => {
    // const result = await orders.find();
    context.response.body = await orders.find({}).toArray();
    // context.render(`${Deno.cwd()}/views/dashboard.ejs`);
  })
  .get("/new_order", async(context) => {
    context.render(`${Deno.cwd()}/views/index.ejs`);
  })
  .post("/new_order", async(context) => {
    const form = JSON.stringify(await multiParser(context.request.serverRequest));
    const parse = JSON.parse(form);
    // console.log(parse["fields"]["quantity"]);
    const {products, companies, quantity} = parse["fields"];
    await orders.insertOne({
      products,
      companies,
      quantity
    });
    context.render(`${Deno.cwd()}/views/index.ejs`);
  });

export { router };