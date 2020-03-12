const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var sessionStore = new MongoDBStore({
    mongooseConnection: mongoose.connection
});

module.exports = sessionStore;
