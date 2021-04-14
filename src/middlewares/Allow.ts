import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export class Allow {
    async allowed(request:Request, response:Response, next:NextFunction) {
        try {
            if(!request.query.token && !request.body.token) {
                response.json({notallowed:true})
                return;
            }
    
            let token = '';
    
            if(request.query.token) {
                token = request.query.token.toString();
            }
            if(request.body.token) {
                token = request.body.token;
            }
            if(token == '') {
                response.json({notallowed:true})
                return;
            }
    
            jwt.verify(token, process.env.Secret, (err, decoded) => {
                if(err) return response.status(401).json({error: 'Token invalid'})
            });
    
            next();
        } catch (err) {
            return response.status(400).json({error:err});
        }
    }
}