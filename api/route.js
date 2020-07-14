const controller  = require('./controller');
const express = require('express');
const Router = express.Router();

Router.post('/create',controller.create);
Router.put('/update/:_id',controller.update);
Router.get('/find',controller.find);
// Router.get('/find/:_id',controller.find)
module.exports = Router