const router = require('express').Router();
const {fetchMaker, createMaker, updateMaker, deleteMaker} = require('../controllers/maker');

router.get('/', (req, res, next) => {
    res.status(200).send({success: true, message: "api running successfully", data: []});
});

router.get('/maker', fetchMaker);
router.post('/maker', createMaker);
router.put('/maker', updateMaker);
router.delete('/maker/:id', deleteMaker);

module.exports = router;

