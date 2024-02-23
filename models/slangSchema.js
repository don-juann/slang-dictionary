const mongoose = require('mongoose');

const slangSchema = new mongoose.Schema({
    word: String,
    meaning: String
},
{ 
    collection: "slangDictionary",
    timestamps: true
});

module.exports = mongoose.model('Slang', slangSchema);
