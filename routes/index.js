var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs){
    var chunks = [];
    var chunkSize = 3;
    for(var i=0;i<docs.length;i+=chunkSize){
      chunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: chunks });
  });
});


router.get('/add-to-cart/:id', function(req, res){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  
  Product.findById(productId, function(err, product){
    if (err){
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

router.get('/remove/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/cart');

});

router.get('/cart', function(req, res, next){
  if(!req.session.cart){
    return res.render('shop/cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/cart', {products: cart.generateArray(), price: cart.price});
});

module.exports = router;
