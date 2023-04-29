const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const postgreSqlSchema = new mongoose.Schema({
	url: { type: String, required: true  },
	username: { type: String, required: true },
	password: { type: String, required: true },
});


module.exports = mongoose.model("postgreSql", postgreSqlSchema);

