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


        // Get events API
        app.get('/events', async (req, res) => {
            // console.log(req);
            const cursor = eventsCollection.find({});
            events = await cursor.toArray();
            res.json(events)
        })

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