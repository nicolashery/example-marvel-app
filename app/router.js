var express = require('express');
var router = express.Router();

var CharacterController = require('./controllers/character-controller');

router.get('/', CharacterController.index);
router.get('/characters', CharacterController.index);
router.get('/characters/:id', CharacterController.show);

module.exports = router;
