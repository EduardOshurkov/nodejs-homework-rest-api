const express = require('express')
const router = express.Router()
const isValidId = require('../../helpers/validId');
const {authenticate}  = require("../../midlewares");
const ctrlWrapper = require('../../helpers/ctrlWraper');
const ctrl  = require("../../controllers/contacts");




router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/',  ctrlWrapper(ctrl.add))

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.remove))

router.put('/:contactId', isValidId, ctrlWrapper(ctrl.update))

router.patch('/:contactId/favorite', isValidId, ctrlWrapper(ctrl.updateFavorite))

module.exports = router;
