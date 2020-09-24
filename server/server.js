//IMPORT

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000;

//CONFIG
const app = express();
mongoose.connect("mongodb://localhost:27017/keeper", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const NoteSchema = new mongoose.Schema({
  title: String,
  note: String,
});

const Note = new mongoose.model("Notes", NoteSchema);

//MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
//ROUTE
app
  .route("/Notes")
  .get((req, res) => {
    Note.find((err, result) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(result);
      }
    });
  })
  .post((req, res) => {
    const { title, note } = req.body;
    new Note({
      title: title,
      note: note,
    }).save((err) => {
      if (!err) {
        res.json("add new note");
      }
    });
  })
  .delete((req, res) => {
    const { id } = req.body;
    Note.deleteOne({ _id: id }, (err) => {
      if (!err) {
        res.json("deleted");
      }
    });
  })
  .put((req, res) => {
    const { id, title, note } = req.body;
    Note.updateOne({ _id: id }, { title: title, note: note }, (err, result) => {
      if (!err) {
        res.json("Update");
      }
    });
  });

//SERVER

app.listen(5000, () => {
  console.log(`listening port ${port}`);
});
