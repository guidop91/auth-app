const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
  // Validate user register data
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user email exists in database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Email already in use');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  // Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  // Save User to database
  try {
    const savedUser = await user.save();
    res.send({ _id: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  // Validate user login data
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user email exists in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email + password combination incorrect');

  // Check for valid password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Email + password combination incorrect');

  // Generate and set web token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return res.header('auth-token', token).send(token);
});

module.exports = router;
