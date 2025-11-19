const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//Database Connection
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is Running Succesfully at Port ${PORT}`)
});