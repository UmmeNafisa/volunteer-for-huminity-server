const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jo0ws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//insert document
async function run() {
    try {
        await client.connect();
        const database = client.db("Volunteer-for-humanity");
        const eventsCollection = database.collection("events");
        const volunteerCollection = database.collection("volunteer");


        // Get events API
        app.get('/events', async (req, res) => {
            // console.log(req);
            const cursor = eventsCollection.find({});
            events = await cursor.toArray();
            res.json(events)
        })

        //add event
        app.post("/addEvents", async (req, res) => {
            const result = await eventsCollection.insertOne(req.body);
            console.log(result);
        })

        //get search events{
        app.get('/searchEvents', async (req, res) => {
            console.log(req.query.search);
            const result = await eventsCollection.find({ title: { $regex: req.query.search }, }).toArray();
            res.send(result)
        })

        //add volunteer
        app.post("/addVolunteer", async (req, res) => {
            const result = await volunteerCollection.insertOne(req.body);
            console.log(result);
            res.send(result)
        })

        //get all volunteer


    } finally {
        // await client.close();
    }
}

//call the function  
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running from Volunteer-Humanity')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})