import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";


const authorizationRoute = Router();

authorizationRoute.post('/token', (req: Request, res: Response, next: NextFunction) =>{
    try{
        const authorizationHeader = req.headers['authorization'];
        
       if(!authorizationHeader){
           throw new ForbiddenError('Credenciais não informadas!');//por didática, escreve-se esta frase bem sugestiva, porém não se ultiliza o tratamento desta maneira.
   
       }
       //Basic token
       const [ authenticationType, token] = authorizationHeader.split(' ');
       if(authenticationType !== 'Basic' || !token){
           throw new ForbiddenError('Autenticação Inválido!');

       }
       
   } catch(error){
    next(error);
   }
   


});

export default authorizationRoute;