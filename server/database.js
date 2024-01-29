
const mongoose = require('mongoose');
console.log("ENV VARS ", process.env.MONGO_CONNECT);
module.exports = () => {
    mongoose
      .connect(
        process.env.MONGO_CONNECT,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: true
        }
      )
      .then(() => console.log("Connected to Mongodb......"));
}