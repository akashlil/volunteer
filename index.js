const express = require("express");
const cors = require("cors");
const { MongoClient } =require ("mongodb");
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hr7oi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const addevent = client.db("volunteer").collection("addevent");

        //services get by database
        app.get("/showallevents", async (req, res) => {
            const cursor = addevent.find({});
            const result = await cursor.toArray();
            res.send(result)
        })
        //srvices addevent database
        app.post("/addevent", async (req, res) => {
            const data = req.body;
            const result = await addevent.insertOne(data);
            res.json(result)
        })
        // p5bCn2(f42BEH)g
    } finally {
        
     }
}
 
run().catch(() => console.log("error"));

app.listen(port, () => {
    console.log("server runing 5000");
})