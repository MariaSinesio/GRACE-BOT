const { MongoClient } = require('mongodb'); ///cuidado, usa-se aqui common js
const {db} = require('./config.json');


const client = new MongoClient(db);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
async function disconnectFromMongoDB() {
}

module.exports = { connectToMongoDB, disconnectFromMongoDB };