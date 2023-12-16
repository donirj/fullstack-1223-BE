// controllers
// 1 imports
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const {validationResult} = require("express-validator")

// 2 controllers
exports.loginUser = async(req, res) => {

    // validacion de formulario
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            msgError: errors.array()
        })
    }

    // obtener datos del formulario
    

    const { email, password } = req.body

    try {
        // verificar que el usuario existe
        let foundUser = await User.findOne({email})
        

        // si no encuentra al usuario
        if(!foundUser){
            return res.status(401).json({
                msgError: "el usuario o contraseña son incorrectos"
            })
        }
       
        // si es exitoso
        console.log("usuario encontrado:", foundUser)


        // 2 verificar password
        const verifiedPassword = await bcryptjs.compare(password, foundUser.hashedPassword)

        // si el password no coincide
        if(!verifiedPassword){
            return res.json(401).json({
                msgError: "el usuario o password son incorrectos"
            })
        }

        // si todo coincide, entrega su credencial token
        const payload = {
            user:  {
                id: foundUser._id
            }
        }

        // b. firma
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 360000
            },
            (error, token) => {

                console.log(error)

                if(error){
                    return res.json(401).json({
                        msgError: "el usuario o password son incorrectos"
                    })
                }

                res.json({
                    data: {
                        token
                    }
                })
            }
        )

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            msgError: "hubo un error creando el usuario"
        })
    }

}


exports.verifyingToken = async (req, res) => {

    try {
        const userData = await User.findById(req.user.id).select("-hashedPassword")

        return res.json({
            data:  {
                user: userData
            }
        })
        
    } catch(error) {

        console.error(error)
        
        return res.status(500).json({
            msgError: "hubo un error en la busqueda del usuario"
        })
    }
}