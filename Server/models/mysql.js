const mongoose = require("mongoose");

const mySqlSchema = new mongoose.Schema({
	url: { type: String, required: true  },
	username: { type: String, required: true },
	password: { type: String, required: true },
});


module.exports = mongoose.model("mygreSql", mySqlSchema);