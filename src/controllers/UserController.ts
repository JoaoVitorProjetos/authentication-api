import { Request, Response } from "express";
import User from "../db/models/User";
import checkToken from "../Auth/checkToken";
import bcrypt from 'bcrypt'

class UserController{
    async create(req: Request, res: Response){
        const { name, email, tel, password  } = req.body

        if(!name || !email || !tel || !password){
            return res.status(422).json({msg: 'something is null'})
        }

        if(tel.length != 16){
            return res.status(422).json({msg: 'invalid number'})
        }

        const userExists = await User.findOne({email: email})
        
        if(!email.includes('@') || userExists){
            return res.status(422).json({msg: 'invalid email'})
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            tel,
            password: passwordHash
        })

        try{
            await user.save()

            return res.status(201).json({msg: 'user signed in'})
        }catch(e){
            return res.status(500).json({msg: 'a server error occurred'})
        }
    }
     
    
    async user(req: Request, res: Response){
        const id = req.params.id

        try{
            const user = await User.findById(id, '-password')

            res.status(200).json({user: user})
        }catch(e){
            res.status(404).json({msg: 'user not found'})
        }
    }
}

export default new UserController()