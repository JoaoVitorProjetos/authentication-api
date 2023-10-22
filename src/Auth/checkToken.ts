import { Request, Response, NextFunction } from "express"

import jwt, { Secret } from 'jsonwebtoken'
import type { JwtPayload } from "jsonwebtoken"

function checkToken(req: Request, res: Response, next: NextFunction){
    const id = req.params.id
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(404).json({msg: 'acess denied'})
    }

    try{
        const secret = process.env.SECRET

        const tokenId = jwt.verify(token,secret as Secret) as JwtPayload

        if(id != tokenId.id){
            return res.status(400).json({msg: 'acess denied'})
        }else{
            next()
        }
    }catch(e){
        return res.status(400).json({msg: 'invalid token'})
    }
}

export default checkToken