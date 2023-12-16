// 1. imports
const express = require("express")
const app = express()

const cors = require("cors")

const connectDB = require("./config/db")
// 2 middlewares
// variables entorno
require("dotenv").config()

// activar cors
app.use(cors())

// todas las peticiones y retornos van a fluir en json
app.use(express.json({ extended: true}))


// 3 rutas
connectDB()

/*
CRUD
*/
app.use("/api/characters", require("./routes/characters"))
app.use("/api/users", require("./routes/users"))
app.use("/api/auth", require("./routes/auth"))
// 4 srv
app.listen(process.env.PORT, () => {
    console.log("nuestro srv esta activo")
})