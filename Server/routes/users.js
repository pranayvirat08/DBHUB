var express = require('express');
var router = express.Router();
const {User, validate} = require("../models/user");
const bcrypt = require("bcrypt");
/* GET users listing. */

router.post("/", async(req,res) => {
    try{
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send({message: error.details[0].message});
        }

        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(409).send({message: "User with specified email already exists"});
        }
        const salt = await bcrypt.genSalt(Number('10'));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "User is created Successfully!!"});
    }catch(error){
        res.status(201).send({message: "There is an Error with server"});

    }

});

module.exports = router;
