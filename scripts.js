const express = require("express");
const mongoose = require("mongoose");
const individualRouter = require("./routes/Individual-routes");
const organizationRouter = require("./routes/Organization-routes");
const adminRouter = require("./routes/Admin-routes");
const requestRouter = require("./routes/Request-routes");
const historyRouter = require("./routes/History-routes");
const signinRouter = require('./routes/SignIn-routes')
const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/individuals", individualRouter);
app.use("/organizations", organizationRouter);
app.use("/admins", adminRouter);
app.use("/request", requestRouter);
app.use("/history", historyRouter);
app.use("/signin", signinRouter)


mongoose
  .connect(
    "mongodb://root:root@localhost:27017/testdb?&authSource=admin"
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));