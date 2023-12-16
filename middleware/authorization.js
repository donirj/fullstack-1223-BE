// middleware/authorization
// archivo para desncriptar el token y que 
// coincida con la palabra secreta

// 1 imports
const jwt = require("jsonwebtoken")

const unlockingToken = (req, res, next) => {

    const token = req.header("x-auth-token")
    console.log('token', token)

    if(!token){
        return res.status(401).json({
            msg: "no hay un token o es erroneo"
        })
    }

    try {
        const openToken = jwt.verify(token, process.env.SECRET)
        console.log('OPENTOKEN', openToken)

        req.user = openToken.user

        next()

    } catch(error){
        
        console.log(error)
        
        res.status(500).json({
            msgError: "hubo un error en el proceso de token"
        })
    }

    

}



// 3 exports
module.exports = unlockingToken