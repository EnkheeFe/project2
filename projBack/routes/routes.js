const express = require("express");
const router = express.Router();
const User = require("../models/User");
const signUpTemplateCopy = require("../models/SignUpModals");

const controller = require("../models/LoginModals");

router.post("/signup", (request, response) => {
  User.findOne({
    $or: [{ email: request.body.email }, { username: request.body.username }],
  }).exec((err, user) => {
    if (err) {
      response.status(500).send({ message: err });
      return;
    }
    if (user) {
     response.status(200).send({message: "this user or email already existed!"});
     return;
    } else {
      const signUpUser = new signUpTemplateCopy({
        email: request.body.email,
        username: request.body.username,
        password: request.body.password,
      });
  
      signUpUser
        .save()
        .then((data) => {
         // response.json(data);
          response
        .status(200)
        .send({ message: "the account has successfully created" });
        })
        .catch((err) => {
          response.json(err);
        });
      
      return;
    }
  });
});

router.post("/login", controller.signin);
module.exports = router;
