const Product = require('../models/product.model');

exports.getAll = function(req, res) {
  Product.find({}, function(err, products){
      if(err) return next(err);
      res.send(products);
  }); 
};

exports.get = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) return next(err);
        res.send(product);
    });
};

exports.create = function(req, res) {
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    product.save(function(err) {
        if (err) {
            return next(err);
        }
        res.send('Product created successfully')
    })
};

exports.update = function(req, res) {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, product) {
        if (err) return next(err);
        res.send("Product updated");
    });
};

exports.delete = function(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('Product Deleted');
    });
};
