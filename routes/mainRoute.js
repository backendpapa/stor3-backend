const router = require('express').Router()
const controller = require('../controllers/mainController.js')
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');

router.use(busboy());
router.use(busboyBodyParser());
router.post('/', controller.login)
router.post('/upload', controller.upload)
router.post('/listbuckets', controller.listBuckets)
router.post('/listobjects', controller.listObjects)
router.post('/bucket/new', controller.createBucket)

module.exports = router;