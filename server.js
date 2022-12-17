if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const indexRouter = require("./routes/index");

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout.pug");
app.use(express.static("public"));

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

MongoClient.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
})
	.then(db, () => console.log("Connected to MongoDB"))
	.catch((err) => {
		console.log(`Error occured: ${err.stack}`);
		process.exit(1);
	});

app.use("/", indexRouter);
app.listen(process.env.PORT || 3000);
