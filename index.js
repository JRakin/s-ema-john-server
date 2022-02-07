const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri =
  "mongodb+srv://suaad:suaad123@cluster0.tipl2.mongodb.net/ema-john?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const orderCollection = client.db("ema-john").collection("orderCollection");
  console.log("connected");

  app.post("/addOrder", (req, res) => {
    const order = req.body;
    orderCollection.insertOne(order).then((result) => {
      console.log(result);
      if (result.insertedId) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  });

  // client.close();
});

app.listen(port, () => {
  console.log("app is running on port:" + port);
});
