const express = require('express');
const router = express.Router();
const  {validation, authenticate}  = require("../../midlewares")
const ctrlWrapper = require("../../helpers/ctrlWraper");
const  ctrl  = require("../../controllers/auth");


const { schemas } = require("../../models/user");

router.post("/signup", validation(schemas.registerSchema), ctrlWrapper(ctrl.register)); 
router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));


module.exports = router;