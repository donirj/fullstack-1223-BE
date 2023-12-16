
const Character = require("../models/Character")

exports.getAllCharacters = async(req, res) => {

    try {

        const characters = await Character.find({})

        console.log(characters)

        return res.json({
            data: characters
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            data: null,
            errorMsg: "hubo un error interno, prueba más tarde"
        })
    }

    res.json({
        data: "hola mundo"
    })

}

exports.createCharacter = async (req, res) => {

    // obtener datos de fomulario
    const {
        name,
        pictureUrl,
        age,
        gender,
        isAlive,
        description
    } = req.body

    try {

        const newCharacter = await Character.create({
            name,
            pictureUrl,
            age,
            gender,
            isAlive,
            description
        })

        return res.json({
            data: newCharacter,
            msg: "personaje creado de forma exitosa"
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            errorMsg: "hubo un error al crear al personaje"
        })
    }

}

exports.updateCharacter = async (req, res) => {

    const  {
        id,
        name,
        pictureUrl,
        age,
        gender,
        isAlive,
        description
        } = req.body

        try {

            const updatedCharacter = await Character.findByIdAndUpdate(id, {
                name,
                pictureUrl,
                age,
                gender,
                isAlive,
                description
            }, {new: true}) 

            return res.json({
                data: updatedCharacter
            })

        } catch (error) {

            console.log(error)

            return res.status(500).json({
                msgError: "hubo un error actualizando"
            })
        }

}

exports.deleteCharacter = async (req, res) => {

    const { id } = req.body

    try {

        const deletedCharacter = await Character.findByIdAndRemove({ _id: id})

        return res.json({
            data: deletedCharacter,
            msg: "Este personaje fue borrado exitosamente"
        })

    } catch  (error) {

        console.log(error)

        return res.status(500).json({
            msgError: "Hubo un error al borrar la mascota"
        })
    }

}