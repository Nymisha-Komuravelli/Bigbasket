const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//configure CORS
app.use(cors());

//configure express to receive form data
app.use(express.json());

//configure dotenv
dotenv.config({path: "./.env"});

// const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 5000;

//connect to mongodb
mongoose.connect(process.env.MONGO_DB_CLOUD_URL).then((res) => {
    console.log("Connected to Mongodb successfully");
}).catch(err => {
    console.log(err);
    process.exit(1); // stops nodejs process if unable to connect
})

/* app.get("/", (req, res) => {
    res.send("Hello from Bigbasket backend")
}) */

app.use("/api", require("./router/productRouter"));

if(process.env.NODE_ENV === "production"){
    const path = require("path");
    app.use(express.static(path.join(__dirname , 'client' , 'build')));
    app.get('/', (request,response) => {
        response.sendFile(path.join(__dirname , 'client' , 'build' , 'index.html'));
    });
  }

app.listen(port, () => {
    console.log(`Server started at Port ${port}`);
});


