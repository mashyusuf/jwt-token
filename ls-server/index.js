const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const jwt = require('jsonwebtoken')
// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ziugtg4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Ensure the client is connected
    await client.connect();
    
    const userCollection = client.db('JWT-TOKEN').collection('users');
    //-JWT Token AREA START HERE!--
    app.post('/jwt',async (req,res)=>{
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '7d'
      });
      res.send({token});
    })

    // User POST route
    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = {email: user.email}
      const existingUser = await userCollection.findOne(query);
      if(existingUser) {
        return res.send({message: 'User Already Exits' , intertedId:null})
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    //-MIddle Wares----
    const verifyToken = ( req, res, next)=>{
      console.log('yooo there is Every Thing',req.headers.authorization)
      if(!req.headers.authorization){
        return res.status(401).send({message: 'forbidden access'})
      }
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, decode)=>{
        if(err){
          return res.status(401).send({message: 'forbidden access'})
        }
        req.decoded = decode;
        next()
      })
      //next()
    }

    // User GET route
    app.get('/users',verifyToken, async (req, res) => {
     
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    console.log("Connected to MongoDB and routes are set up.");
    
  } catch (err) {
    console.error("An error occurred while connecting to MongoDB or setting up routes:", err);
  } finally {
    // Uncomment this if you want to close the connection after each operation,
    // but usually, you'll want to keep it open for the duration of the server's life
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Any Body Can Dance');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
