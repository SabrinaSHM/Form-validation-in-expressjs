var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form validation', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});

/**Here we will have the data to check */
router.post('/submit', function(req,res,next){
  req.check('email','Invalide email adress').isEmail();
  req.check('password','Ironic password').isLength({min: 6}).equals(req.body.confirmPassword);

  var errors = req.validationErrors();
  if(errors){
    req.session.errors = errors;
    req.session.success = false;
  }else{
    req.session.success = true;
  }
  res.redirect('/');
});



module.exports = router;
