const express = require('express');
const router = express.Router();
const User = require("../models/User");

//Get all users
router.get('/', async (req, res) => {

  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(404).send([]);
  }

})


//Add New User
router.post('/add', (req, res) => {

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    idusuario: req.body.idusuario
  })
  newUser.save((err) => {
    if (!err) {
      res.send('User added.')
    } else {
      res.send(err)
    }
  })
})

//Get an user data
router.post('/obtenerdatausuario', (req, res) => {
  User.find({ idusuario: req.body.idusuario }, function (docs, err) {
    if (!err) {
      res.send(docs)
    } else {
      res.send(err)
    }
  })
})

//Edit User Data
router.post('/edit', (req, res) => {
  User.findOneAndUpdate({ idusuario: req.body.idusuario }, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  }, (err) => {
    if (!err) {
      res.send('Data saved succesfully.')
    } else {
      res.send(err)
    }
  })

})

//Delete User 
router.post('/deleteUser', (req, res) => {
  User.findOneAndDelete({ idusuario: req.body.idusuario }, (err) => {
    if (!err) {
      res.send('User deleted.')
    } else {
      res.send(err)
    }
  })

})

module.exports = router;