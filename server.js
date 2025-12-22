require("dotenv").config();

const app = require("./src/app.js")

const PORT = process.env.PORT || 3000;  // This line means "Use the PORT given by the system, otherwise use 3000"
// process.env.PORT → comes from environment
// || 3000 → fallback value

const connectDB = require("./src/config/db.js");

const startServer = async () => {
  try{
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch(err ) {
    console.log("Can not connect to database due to the error: " + err);
  }
}

startServer();