require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credential = require("./middleware/credentials");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
mongoose.set("strictQuery", false);
const port = process.env.PORT || 3000;

/* 
  Connect to MongoDB 
*/
connectDB();

/* 
  Custom Middleware Logger 
*/
app.use(logger);

/*
  Handle options credentials check - before CORS!
  and fetch cookies credentials requirement
*/
app.use(credential);

/* 
  Cross Origin Resource Sharing 
*/
app.use(cors(corsOptions));

/* 
  Built-in middleware to handle urlencoded form-data
*/
app.use(express.urlencoded({ extended: false }));

/* 
  Built-in middleware to handle json
*/
app.use(express.json());

/* 
  Middleware for cookie
*/
app.use(cookieParser());

/* 
  Serve Static Files
*/
app.use(express.static(path.join(__dirname, "/public")));

/* 
  Route Handler 
*/
app.use("/", require("./routes/root"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/product", require("./routes/api/productInfo"));
app.use("/api/invoice", require("./routes/api/invoice"));

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB...");

  app.listen(port, () =>
    console.log(`server running on http://localhost:${port}`)
  );
});
