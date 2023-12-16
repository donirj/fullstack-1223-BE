const express = require("express")
const router = express.Router()

const {check} = require("express-validator")

const usersController = require("./../controllers/usersController")
// CRUD users
// get all users

// post - creare personje
router.post("/create", 
[
    check("username", "el nombre es obligatorio").not().isEmpty(), //verifica que la casilla no este vacia
    check("email", "agrega un mail valido").isEmail(),
    check("password", "el password debe ser minimo de 6 caracteres").isLength({min: 6})
]
,usersController.createUser)



module.exports = router 