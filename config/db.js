const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    console.log(
      ("Connected to db " + connection.connection.host).cyan.bold.underline
    );
    return connection;
  } catch (error) {
    console.log(error.red.underline.bold);
    process.exit(1);
  }
};
module.exports = connectDb;
