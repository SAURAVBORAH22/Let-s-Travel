//calling the router
const router = require("express").Router();

///calling user
const Pin = require("../models/User");

//calling bcrypt to secure password
const bcrypt = require("bcrypt");
const User = require("../models/User");

//register
router.post("/register", async (req, res) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10); //salt is a random string that makes the hash unpredictable . Here it will be of 10 character length
        //hashing the password
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user model
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and send response
        const user = await newUser.save();
        //if successful
        res.status(200).json(user._id);
    } catch (err) {
        res.status(500).json(err);//if any error than status code 500 and passing the error in json format
    }
});


//login
router.post("/login", async (req, res) => {
    try {
        //find user
        const user = await User.findOne({ username: req.body.username });

        //if no user like that
        !user && res.status(400).json("Wrong username or password!");

        //validate password
        //comparing password to check if wrong credentials
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        //if password is not valid
        !validPassword && res.status(400).json("Wrong username or password!");

        //send successful response if correct credentials
        res.status(200).json({ _id: user._id, username: user.username });

    } catch (err) {
        res.status(500).json(err);
    }
});

//exporting pins model
module.exports = router