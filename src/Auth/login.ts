import { Response, Request } from "express"

import User from "../db/models/User"

import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'


async function  login(req: Request, res: Response){
    const { email, password } = req.body

    if(!email || !password){
        return res.status(422).json({msg: 'something is null'})
    }

    const user = await User.findOne({email: email})

    if(!user){
        return res.status(422).json({msg: 'user not found'})
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
        return res.status(422).json({msg: 'password incorrect'})
    }

    try{
        const secret = process.env.SECRET

        const token = jwt.sign({id: user._id}, secret as Secret)

        return res.status(200).json({msg: 'user logged in', token: token, id: user._id})
    }catch(e){
        return res.status(500).json({msg: 'a server error occurred'})
    }
}

export default login 