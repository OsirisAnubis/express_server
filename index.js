const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const middlewareFunction = express.json();
app.use(middlewareFunction);

let db = null;

app.get('/books', async (req, res) => {
  let books = await db.books.find({}).toArray();
  res.send(books);
});

app.get('/books/:id', async (req, res) => {
  const book = await db.books.findOne({_id: ObjectId(req.params.id)});
  res.send(book);
});

app.delete('/books/:id', async (req, res) => {
  await db.books.deleteOne({_id: ObjectId(req.params.id)});
  res.send();
});

app.post('/books', async (req, res) => {
  const newBook = {
    title: req.body.title,
    author: req.body.author
  };
  await db.books.insertOne(newBook);
  res.send(newBook);
});

const { MongoClient, ObjectId } = require("mongodb");
// Connection URI
const uri =
  "mongodb+srv://admin:admin@cluster0.cnhztso.mongodb.net/?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  await client.connect();

  db = {
    books: client.db("library").collection("books")
  };

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
run().catch(console.dir);


