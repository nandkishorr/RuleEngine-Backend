const express = require('express');
const routes = express.Router();
const { createRuleData,combineRuleData,evaluateRuleData } = require('../controllers/rule.controller.js');

routes.route('/create').post(createRuleData);
routes.route('/combine').post(combineRuleData);
routes.route('/evaluate').post(evaluateRuleData);

module.exports = routes;