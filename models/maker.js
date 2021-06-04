const {Schema, model} = require('mongoose');
let labelCounterModel = require('./labelCounter');

let makerSchema = new Schema({
    id: {type: Number, default: 1},
    year: {type: Number},
    make: {type: String},
    model: {type: String}
}, {
    collection: 'makerDetails'
});

makerSchema.pre('save', function(next) {
    let makerDocument = this;
    labelCounterModel.findOneAndUpdate({'_id': 1}, {$inc: {'labelCounter': 1}}, {upsert: true, new: true}, (err, data)=> {
        if (err)
          return next(err);
          makerDocument.id = data.labelCounter;
        next();
    })
})


module.exports = model('makerModel', makerSchema);