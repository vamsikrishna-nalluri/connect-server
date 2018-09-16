const express = require('express');
const router = express.Router();
const auth = require('./auth.route');

var user_controller = require("../controllers/user.controller");

router.post('/', user_controller.register);
router.post('/login', user_controller.login);
router.get('/', auth.required, user_controller.getUserInfo);
router.put('/', auth.required, user_controller.update);

router.use(function(err, req, res, next) {
    if (err.name === 'ValidationError') {
        return res.json({
            errors: Object.keys(err.errors).reduce(function(errors, key) {
                errors[key] = err.errors[key].message;
                return errors;
            }, {})
        })
    }
    return next(err);
});

module.exports = router;
