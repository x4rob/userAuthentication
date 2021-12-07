import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";


async function basicAuthenticationMiddleware (req:Request ,res: Response, next:NextFunction){

    try {
        const authorizationHeader = req.headers['authorization'];
        
        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais não informadas!');//por didática, escreve-se esta frase bem sugestiva, porém não se ultiliza o tratamento desta maneira.
    
        }
        //Basic token
        const [ authenticationType, token] = authorizationHeader.split(' ');
        if(authenticationType !== 'Basic' || !token){
            throw new ForbiddenError('Autenticação Inválido!');
 
        }
        //validando senha e usuário
        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        const [username, password] = tokenContent.split(':');
 
        if(!username || !password){
         throw new ForbiddenError('Usuário não encontrado ou senha inválida!')
        }
 
        const user = await userRepository.findByUsernameAndPassword(username, password);
 
        if(!user){
         throw new ForbiddenError('Usuário não encontrado ou senha inválida!')
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }


}


export default basicAuthenticationMiddleware;