const express = require('express');
const mongoose = require('mongoose');

const {port, mongoUrl} = require('./config');

const app = express();

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

// routes
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))
app.use("/api/v1", require('./routes'));

app.listen(port, () => console.log(`server on!, Running at ${port}`));