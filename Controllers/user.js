const User = require("../Modals/user");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// exports.findUserByEmail = (obj, callback) => {
//   user.findOne(
//     {
//       email: obj.email,
//       password: obj.password
//     },
//     (error, data) => {
//       if (error) {
//         cb(error, null);
//       } else {
//         cb(null, data);
//       }
//     }
//   );
// };

exports.addUser = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({
      error: "Email is taken!"
    });
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({
    message: "Signup success! Please login."
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does no exist. Please Sign Up"
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match"
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, {
      expires: new Date(Date.now() + 900000)
    });
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } });
  });
};

exports.logout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});
