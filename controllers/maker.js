const maker = require('../models/maker');

exports.fetchMaker = async (req, res, next) => {
    try {
        let receivedLimit = parseInt(req.query.limit) || 100;
        let receivedPageNo = parseInt(req.query.pageNo) > 0 ? req.query.pageNo : 1;
        let offset = (receivedLimit * receivedPageNo) - receivedLimit;
        console.log(offset);
    
        let records = await maker.find({}, {
            _id: 0
        }, {
            skip: offset,
            limit: receivedLimit
        }).exec();
    
        console.log(records);
        res.status(200).send({success: true, message: "records returned successfully", data: records});
    } catch(err) {
        res.status(500).send({success: false, message: "error occured due to some server issues", data: []});
    }
}

exports.createMaker = async (req, res, next) => {
    try {
        let receivedMaker = req.body.make;
        let receivedModel = req.body.model;
        let receivedYear = req.body.year;

        if (!receivedMaker || !receivedModel || !receivedYear) {
            res.status(400).send({success: false, message: "bad input parameters", data: []});
            return;
        }

        let checkMaker = await maker.findOne({
            make: receivedMaker,
            model: receivedModel,
            year: receivedYear
        });

        if (checkMaker) {
            res.status(409).send({success: false, message: "duplicate records already exists", data: []});
            return;
        }

        const newMaker = new maker({
            make: receivedMaker,
            model: receivedModel,
            year: receivedYear
        });

        newMaker.save((err) => {
            if (err) {
                console.log(err)
                res.status(400).send({success: false, message: "bad input parameters", data: []});
                return;
            } 
            res.status(201).send({success: true, message: "maker has been created", data: []});
        });

    } catch(err) {
        console.log(err)
        res.status(500).send({success: false, message: "error occured due to some server issues", data: []});
    }
}

exports.updateMaker = async (req, res, next) => {
    try {
        let receivedMaker = req.body.make;
        let receivedModel = req.body.model;
        let receivedYear = req.body.year;
        let receivedId = req.body.id;

        if (!receivedMaker || !receivedModel || !receivedYear || !receivedId) {
            res.status(400).send();
            return;
        }

        let checkMaker = await maker.findOne({
            make: receivedMaker,
            model: receivedModel,
            year: receivedYear
        });

        if (checkMaker) {
            res.status(404).send();
            return;
        }

        await maker.updateOne({
            id: receivedId
        }, {
            model: receivedModel,
            year: receivedYear
        }, null,  function(err, result) {
            if (err) {
                res.status(400).send();
                return;
            }
            res.status(200).send();
        })

    } catch(err) {
        res.status(500).send();
    }
}

exports.deleteMaker = async (req, res, next) => {
    try {
        let receivedId = req.params.id;

        if (!receivedId) {
            res.status(400).send({success: false, message: "bad input parameters", data: []});
            return;
        }

        await maker.deleteOne({id: receivedId}, null, (err) => {
            if (err) {
                res.status(400).send({success: false, message: "bad input parameters", data: []});
                return;
            }
            res.status(200).send({success: true, message: "maker has been deleted", data: []});
        })
        

    } catch(err) {
        console.log(err);
        res.status(500).send({success: false, message: "error occured due to some server issues", data: []})
    }
}

