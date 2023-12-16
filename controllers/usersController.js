
const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {validationResult} = require("express-validator")

exports.createUser = async (req, res) => {

    // revision de validaciones

    const errors = validationResult(req)
    console.log(errors)

    if(!errors.isEmpty()){
        return res.status(400).json({
            msgError: errors.array()
        })
    }


    
    // obtener datos de fomulario
    const {
        username,
        email,
        password
    } = req.body

    try {

        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await User.create({
            username,
            email,
            hashedPassword
        })
        console.log(newUser)

        // auth process - JWT
        const payload = {
            user: {
                id: newUser._id
            }
        }

        //credential sign
        jwt.sign(
            payload, //all data
            process.env.SECRET,
            {
                expiresIn: 360000
            }, //server sign
            (error, token) => {
                console.log(error
                    )
                if(error){
                    return res.status(401).json({
                        msgError: "hubo un problema en la creacion del token"
                    })
                }

                return res.json({
                    data: {
                        token
                    }
                })
            } 
        )

        

    } catch (error) {

        console.log(error)

        res.status(500).json({
            msgError: "hubo un problema creando al usuario"
        })
    }


    
}

exports.verifyingToken = async (req, res) => {


    res.send("verificando el token")

}