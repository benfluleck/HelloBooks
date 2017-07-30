var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'BestBooks Library' });
});

router.get('/admin', function(req, res, next) {
    res.render('admin', { title: 'BestBooks Library' });
});



module.exports = router;