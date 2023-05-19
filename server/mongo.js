const mongoose = require("mongoose");
// const { model, Schema } = mongoose;

// MongoDB connection URL
// const MONGO_URL = "mongodb://mongo:27017/mydatabase";
const MONGO_URL = "mongodb://localhost:27017/my_database";

// Connect to MongoDB
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Connected to MongoDB", {
      databaseName: db?.connection?.db?.databaseName,
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

process.on("uncaughtException", (error) => {
  console.error(error);
  mongoose.disconnect();
});

// const noteSchema = new Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// });

// const Note = model("Note", noteSchema);

// const note = new Note({
//   content: "This is my first note helloworld",
//   date: new Date(),
//   important: true,
// });

// note
//   .save()
//   .then((res) => {
//     console.log({ res });
//     mongoose.connection.close();
//   })
//   .catch((err) => console.log({ err }));
