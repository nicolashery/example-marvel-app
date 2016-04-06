var express = require('express');
var router = express.Router();

var HomeController = require('app/controllers/home-controller');
var CharacterController = require('app/controllers/character-controller');

router.get('/', HomeController.index);
router.get('/characters', CharacterController.index);
router.get('/characters/:id', CharacterController.show);

module.exports = router;
