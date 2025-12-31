import express from "express";
import cors from "cors";
import {db} from './config/neondb/dbconection.js'

const app = express();
app.use(express.json()); /** json from client */
app.use(express.urlencoded()); /** form data */

app.use(cors())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`run on ${PORT}`);
});

app.get("/test", (req, res) => {
  db("products")
    .select("id", "name", "price")
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("not found");
    });
});

app.get("/testasync", async (req, res) => {
  try {
    const rows = await db("products").select("id", "name", "price");
    res.json(rows);
  } catch (error) {
    console.log(err);
    res.status(404).send("not found");
  }
});

app.get("/test/:id/", async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await db("products").where({ id });
    res.json(rows);
  } catch (error) {
    console.log(err);
    res.status(404).send("not found");
  }
});

app.get("/search", async (req, res) => {
  const { id } = req.query;
  try {
    const rows = await db("products").where({ id });
    res.json(rows);
  } catch (error) {
    console.log(err);
    res.status(404).send("not found");
  }
});

app.post("/testpost", async (req, res) => {
  const { product_name, product_price } = req.body;
  try {
    const rows = await db("products").insert(
      { name: product_name.toLowerCase(), price: product_price },
      ["id", "name", "price"]
    );
    res.json(rows);
  } catch (error) {
    console.log(err);
    res.status(404).send("not found");
  }
});
