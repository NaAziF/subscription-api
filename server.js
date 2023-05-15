const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ausAtlasDb:<MongoPasswordHere>@mumbaicluster.5wu6fsv.mongodb.net/?retryWrites=true&w=majority";
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


// Connect the client to the server	(optional starting in v4.7)
const connection = client.connect();
// Send a ping to confirm a successful connection
client.db("admin").command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB!");






app.get('/subscribe', async (req, res) => {

    let email = req.query.email;
    const connect = connection;
    connect.then(() => {
        const doc = { email: email };
        const db = client.db('MailSubscribers');
        const coll = db.collection('mails');
        coll.insertOne(doc, (err, result) => {
            if (err) throw err;
        });
    });


    res.send('Subscription Confirmed. you can close this tab now.');

});

app.listen(8080, () => {
    console.log('Listening at port 8080');
});