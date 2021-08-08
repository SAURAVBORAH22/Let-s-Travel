//calling the router
const router = require("express").Router();

///calling pin 
const Pin = require("../models/Pin");

//create pin
router.post("/", async (req, res) => { //passing request and response as a async function
    const newPin = new Pin(req.body);
    try {
        //awaiting the function
        const savedPin = await newPin.save();//else saving the pin
        res.status(200).json(savedPin);//passing the status code 200 for successful and savedPin in json format
    } catch (err) {
        res.status(500).json(err); //if error is caught then we are passing the statuscode and the err in json format
    }
});


//get all pins
//passing a async function 
router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find(); //finding all the pins in our model
        res.status(200).json(pins);//passing the status code 200 for successful and pins in json format
    } catch (err) {
        res.status(500).json(err); //if error is caught then we are passing the statuscode and the err in json format
    }
});

//exporting pins model
module.exports = router