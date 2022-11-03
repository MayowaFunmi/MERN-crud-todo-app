//import tasks from "./routes/taskRoutes"
const tasks = require("./routes/taskRoutes")
const bodyParser = require('body-parser');
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const register = require("./routes/register")
const login = require("./routes/login")
const verify = require("./routes/verify")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());

app.use("/api/register", register)
app.use("/api/login", login)
app.post("/api/verify", verify)


app.get("/", (req, res) => {
    try {
        res.json("welcome to the todos api...");
    } catch (error) {
        res.status(404).send(error.message)
    }
});
app.use("/api/todos", tasks)

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log(error.message));