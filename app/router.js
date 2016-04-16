var express = require('express');
var router = express.Router();

var HomeController = require('app/controllers/home-controller');
var CharacterController = require('app/controllers/character-controller');
var ComicController = require('app/controllers/comic-controller');

router.get('/', HomeController.index);
router.get('/characters', CharacterController.index);
router.get('/characters/:id', CharacterController.show);
router.get('/comics', ComicController.index);
router.get('/comics/:id', ComicController.show);

module.exports = router;
