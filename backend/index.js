//calling express
const express = require("express");
//calling mongoose
const mongoose = require("mongoose");
//calling .env file
const dotenv = require("dotenv");
//calling our app
const app = express();
///calling the pins file
const pinRoute = require("./routes/pins");
//calling the users file
const userRoute = require("./routes/users");

//configuring the dotenv
dotenv.config();

//using json
app.use(express.json())

//connecting mongodb 
// go to https://mongoosejs.com/docs/connections.html
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, //allow users to fall back to the old parser if they find a bug in the new parser
    useUnifiedTopology: true, //unified topology
})
    .then(() => { //if connected to the mongodb url
        console.log("MongoDB Connected!")
    }).catch((err) => console.log(err)); //if error then we are just console loging


//defining the route
app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

//deciding the port
app.listen(8800, () => {
    console.log("Backend server is running");
});