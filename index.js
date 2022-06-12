const express = require('express')
const cors = require('cors');
require('dotenv').config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express()
const port = process.env.PORT || 5000


// middlewar
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.p9hdo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect()
        const projectsCollection = client.db('DEVELOPERABDULLAH').collection('PROJECTS')

        // get all product api
        app.get('/project', async (req, res) => {
            res.send(await projectsCollection.find({}).toArray())
        });


        app.get('/project/:id', async (req, res) => {
            const result = await projectsCollection.findOne({_id: ObjectId(req.params.id)})
            res.send(result)
        });


    }
    finally { }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hey developerabdullah I am Running')
})


app.listen(port, () => {
    console.log('Listning to port', port)
})