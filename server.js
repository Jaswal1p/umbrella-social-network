const express = require('express');
const { appendFile } = require('fs');
const mongoose = require('mongoose');

const app =express()
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// Connect mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/umbrella-social-network', {

    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

appendFile.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));