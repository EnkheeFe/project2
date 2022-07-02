const User = require("./User");

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    var passwordIsValid = req.body.password === user.password;
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }
    res.status(200).send({
      username: user.username,
      email: user.email,
      success: true,
    });
  });
};
