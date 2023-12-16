const express = require("express")
const router = express.Router()

const charactersController = require("./../controllers/charactersController")

// CRUD
// get
router.get("/get-all", charactersController.getAllCharacters)

// post - creare personje
router.post("/create", charactersController.createCharacter)

//put - update
router.put("/update", charactersController.updateCharacter)

//delete
router.delete("/delete", charactersController.deleteCharacter)

module.exports = router