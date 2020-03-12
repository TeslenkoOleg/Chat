const mongoose = require('mongoose');
const conf = require('../conf');
mongoose.connect(conf.get("mongoose:uri"), conf.get('mongoose:options'));



module.exports = mongoose;
