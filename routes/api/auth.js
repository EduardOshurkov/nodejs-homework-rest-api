const express = require('express');
const router = express.Router();
const  {validation, authenticate, upload}  = require("../../midlewares")
const ctrlWrapper = require("../../helpers/ctrlWraper");
const  ctrl  = require("../../controllers/auth");


const { schemas } = require("../../models/user");

router.post("/signup", validation(schemas.registerSchema), ctrlWrapper(ctrl.register)); 
router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));



module.exports = router;