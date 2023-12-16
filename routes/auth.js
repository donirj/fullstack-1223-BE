const express = require("express")
const router = express.Router()

const authController = require("./../controllers/authController")

const authorization  = require("./../middleware/authorization")

const { check } = require("express-validator")

// no es crud, es ruta de auth
// entrega credenciales y verifica

// login
// post - auth
router.post("/login", [
    check("email", "ingresa un email valido").isEmail(),
    check("password", "no enviaste un password adecuado").not().isEmpty()
], authController.loginUser)

// verificar token
router.get("/verifying-token", authorization, authController.verifyingToken)


module.exports = router 