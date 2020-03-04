const express = require("express");
const router = express.Router();
const { login, addUser, logout } = require("../Controllers/user");
const { signupValidator } = require("../validator");

router.post("/login", login);
router.post("/addUser", signupValidator, addUser);
router.get("/logout", logout);

module.exports = router;
