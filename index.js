const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const getPosts = require('./routes/getPosts');

dotenv.config();

const app = express();

// Connect to DB
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbUrl = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.s3yfd.mongodb.net/test?retryWrites=true&w=majority`;
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(dbUrl, mongooseOptions, () => console.log('Connected to DB'));

// Add middlewares
app.use(express.json());

// Route middlewares
app.use('/api/user', authRoute);
app.use('/', getPosts);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));
