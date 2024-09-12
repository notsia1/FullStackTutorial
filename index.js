require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const PORT = 3000;
const cors = require('cors');



app.use(cors());
app.use(express.json());



const userRouter = require('./Routes/userRouter');
app.use('/', userRouter);




mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port ' + PORT);
    });
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});



