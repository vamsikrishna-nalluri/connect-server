const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/', product_controller.getAll);
router.get('/:id', product_controller.get);
router.post('/create', product_controller.create);
router.put('/:id/update', product_controller.update);
router.delete('/:id', product_controller.delete);


module.exports = router;