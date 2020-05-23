const router = require("express").Router();
const db = require("./userDb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

//stories
router.get("/", (req, res) => {

});

router.get("/:id", (req, res) => {


});

router.post("/", (req, res) => {


});

router.put("/:id", (req, res) => {


});

router.delete("/:id", (req, res) => {


});




module.exports = router;