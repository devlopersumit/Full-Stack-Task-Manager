const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const taskRouter = require('./routes/taskRoutes');
const logRouter = require('./routes/logRoutes');
require('dotenv').config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//Database Connection
connectDB();

//Routes
app.use('/api/tasks', taskRouter);
app.use('/api/logs', logRouter);

//Test route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is Running Succesfully at Port ${PORT}`)
});