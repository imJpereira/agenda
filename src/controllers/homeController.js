const HomeModel = require('../models/HomeModel');

exports.getIndex = (req, res) => {
    res.render('index');
};