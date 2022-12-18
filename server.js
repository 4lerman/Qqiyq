if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");


app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout.pug");
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	serverSelectionTimeoutMS: 5000
})
const db = mongoose.connection
db.on("error", err => console.error(err))
db.once("open", () => console.log('Connected to Mongoose'))

app.use("/", indexRouter);
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000);
