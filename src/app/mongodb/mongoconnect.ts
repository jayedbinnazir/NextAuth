// getting-started.js
const mongoose = require("mongoose");

export default async function mongoconnect() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("database connection successfull");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
