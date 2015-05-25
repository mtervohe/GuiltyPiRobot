var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log('router.get called - rendering index.welcome Soy template');
  // template is located in views/index.soy
  // {package index}
  // {template .welcome}
  res.render('index', {'function': 'welcome', title: 'Express' });
});

module.exports = router;
