const Product = require('../models/product.model');

const productController = {};

productController.getAll = function(req, res, next) {
    Product.find({}, function(err, products) {
        if (err) return next(err);
        res.send(products);
    });
};

productController.get = function(req, res, next) {
    Product.findById(req.params.id, function(err, product) {
        if (err) return next(err);
        res.send(product);
    });
};

productController.create = function(req, res, next) {
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

productController.update = function(req, res) {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, product) {
        if (err) return next(err);
        res.send("Product updated");
    });
};

productController.delete = function(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('Product Deleted');
    });
};

module.exports = productController;
