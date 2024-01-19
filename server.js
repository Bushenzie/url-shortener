require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(morgan("tiny"))
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
}));

const linkRouter = require("./routes/links");
app.use("/links",linkRouter)

const errorHandler = require("./middleware/errorHandler");
const notFoundHandler = require("./middleware/notFound");
app.use(errorHandler);
app.use(notFoundHandler);

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