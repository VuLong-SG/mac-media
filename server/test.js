import express from 'express'
import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'


const app = express()
dotenv.config()
app.use(express.json())

const port = 8080
const url = process.env.MONGO_URL
const dbName = 'Media';
const client = new MongoClient(url);


mongoose.connect(url).then(console.log("connected")).catch('cant connect to Mongodb')



app.get('/', async (req, res) => {
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('test')     
        const documents = await collection.find({}).toArray()
        res.json(documents);
    } catch (err) {
        console.error(err);
        res.status(500).send('something wrong');
      } finally {
        await client.close();  
      }
})


app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
  })