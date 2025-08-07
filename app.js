const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const loginRoutes = require('./apis/routes/loginRoutes');
const userRoutes = require('./apis/routes/userRoutes');
const contactRoutes = require('./apis/routes/contactsRoutes');
const workspaceRoutes = require('./apis/routes/workspaceRoutes');
const messageRoutes = require('./apis/routes/messageRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();

mongoose.connect("mongodb+srv://saurabhsolanki:" + process.env.MONGO_URL + "@cluster0.x0iofqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => {
        console.log(err);
    });

app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);
app.use('/workspace', workspaceRoutes);
app.use('/messageTemplate', messageRoutes);

app.use((req, res, next) => {
    const error = new Error('404 not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    })
})

module.exports = app;