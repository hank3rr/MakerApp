const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let labelCounterSchema = new Schema({
    _id: {type: Number, default: 1},
    labelCounter: {type: Number, default: 1}
},
{
    collection: 'labelCounter'
});

module.exports = mongoose.model('labelCounterModel', labelCounterSchema);