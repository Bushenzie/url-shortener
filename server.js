require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

app.use(helmet());
app.use(cors());

const linkRouter = require("./routes/links");
app.use("/links",linkRouter)

start();

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB.")
        app.listen(PORT,() => { console.log(`Server started on PORT ${PORT}.`)})
    } catch(err) {
        throw new Error("Something went wrong while starting the server.")
    }
}