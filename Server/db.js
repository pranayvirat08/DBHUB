const mongoose = require("mongoose");


module.exports = () =>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try{
        mongoose.connect("mongodb+srv://jobportaluser:Virat0107@cluster0.vnfivir.mongodb.net/?retryWrites=true&w=majority", connectionParams);
        console.log("Connected to the database successfully");
    }catch(error){
        console.log(error);
        console.log("Could not connect to database");
    }
}