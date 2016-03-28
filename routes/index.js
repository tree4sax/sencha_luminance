var express = require('express');
var router = express.Router();
var controller = require('../controllers/color-calculator');

router.get('/', controller.ccalcForm);
router.post('/', controller.ccalcResults);

module.exports = router;
