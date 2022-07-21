require('dotenv').config()
const express = require('express');
const authMiddleware = require('../middlewares/auth');
const UserSchema = require("../models/UserSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET;
const router = express.Router();

router.use(authMiddleware);

function generateToken(params = {}) {
    return jwt.sign(params, SECRET, {
        expiresIn: 86400,
    });
}

const getAll = async (req, res) => {
    UserSchema.find(function (err, user){
        res.status(200).send(user)
    }) 
  }

const checkId = async (req, res) => {
    const id = req.params.id

    // check user
    try {
        const user = await UserSchema.findById(id, '-password');
        res.status(200).json( {user} )
    }
    catch {
         return res.status(404).json({ msg: 'Usuário não encontrado'})
    }

    function checkToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]

        if(!token) {
            return res.status(401).json({msg: 'Acesso negado!'})
        }

    }
} 

const createUser = async (req, res) => {

    try {
        const {name, email, password, Img, XP, level, currentClass} = req.body

        //Validations
        if(!name) {
            return res.status(422).json({msg: 'Nome é obrigatório'})
        }
        if(!email) {
            return res.status(422).json({msg: 'Email é obrigatório'})
        }
        if(!password) {
            return res.status(422).json({msg: 'Senha é obrigatória'})
        }

        // check if user exists
        const userExists = await UserSchema.findOne({ email: email})

        if (userExists) {
            return res.status(422).json({ msg: 'Por favor, utilize outro e-mail'})
        }

        // create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new UserSchema({
            name,
            email,
            password: passwordHash,
            Img,
            XP,
            level,
            currentClass,
            progress: [{
                classname: "HTML",
                progress: "0%",
                description: "Aprenda a criar incríveis paginas na Web",
                title: "Tags",
                courseimg: "content1",
                level: 1,
                badge: "",
              },
            {
                classname: "CSS3",
                progress: "0%",
                title: "Estilos",
                description: "Descubra como personalizar a sua ideia",
                courseimg: "content2",
                level: 1,
                badge: "",
              },
            {
                classname: "Java Script",
                progress: "0%",
                title: "Variáveis",
                description: "Libere a sua criatividade com o JavaScript",
                courseimg: "content3",
                level: 1,
                badge: "",
              },
            {
                classname: "React",
                title: "Componentes",
                description: "Que tal uma nova forma de criar suas aplicações?",
                progress: "0%",
                courseimg: "content4",
                level: 1,
                badge: "",
              },
              {
                classname: "Node",
                courseId: "62cdb21b9b7b7a443bfb1566",
                title: "Controladores",
                description: "De mais poder para sua aplicação",
                progress: "0%",
                courseimg: "content6",
                level: 1,
                badge: "",
              },   
            ]
        })

        await user.save()

        res.status(200).json({
            message: "User adicionado com sucesso!",
            user,
            token: generateToken({ id: user.id}), 
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    const {email, password} = req.body

    // Validations
    if(!email) {
        return res.status(422).json({msg: 'Email é obrigatório'})
    }
    if(!password) {
        return res.status(422).json({msg: 'Senha é obrigatória'})
    }

    // Check if user exists
    const user = await UserSchema.findOne({ email: email})
    

    if (!user) {
        return res.status(422).json({ msg: 'Usuário não encontrado'})
    }

    // Check pass match
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(404).json({msg: 'Senha Inválida'})
    }

    try {
    
        res.status(200).json({
            msg: "Autenticação realizada com sucesso", 
            token: generateToken({ id: user.id}), 
            id: user._id})

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Erro encontrado, tente novamente mais tarde!',
        })
    }

}

const updateUserById = async (req, res) => {
    try {
        const { currentClass, XP, level } = req.body;

        const findUser = await UserSchema.findOneAndUpdate({"_id": req.params.id},{
            $set: {"currentClass": currentClass, "XP": XP, "level": level}
        }, { new: true })

        const savedUser = await findUser.save()

        res.status(200).json({
            message: "Usuário atualizada com sucesso!",
            savedUser
        })

    } catch (error) {
        console.error(error)
    }
}

const updateUserByIdByCourse = async (req, res) => {
    try {
        const { progress } = req.body;
        const { badge } = req.body;

        const findUser = await UserSchema.findOneAndUpdate({"_id": req.params.id, "progress._id": req.params.courseid}, {
            $set: {"progress.$.progress": progress, "progress.$.badge": badge}
        }, { new: true })

        const savedUser = await findUser.save()

        res.status(200).json({
            message: "Progresso atualizado com sucesso!",
            savedUser
        })

    } catch (error) {
        console.error(error)
    }
}

const deleteUserById = async (req, res) => {
    try {
        const userFound = await UserSchema.findById(req.params.id)

       await userFound.delete()

       res.status(200).json({
           mensagem: `Usuário '${userFound.email}' deletada com sucesso!`
       })

    } catch (err) {
        res.status(400).json({
            mensagem: err.message
        })
    }
} 

module.exports = {
    getAll,
    checkId,
    createUser,
    login,
    updateUserById,
    updateUserByIdByCourse,
    deleteUserById
}
