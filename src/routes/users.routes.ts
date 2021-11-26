import { NextFunction, Request, Response, Router } from 'express';
import StatusCode from 'http-status-codes';

const usersRoute = Router();/* uma forma de configurar rotas*/

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) =>{
    const users = [{userName: 'Robson'}];
    res.status(StatusCode.OK).send(users);
    });

usersRoute.get('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) =>{
    const uuid = req.params.uuid;
    res.status(StatusCode.OK).send({uuid});
});
usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) =>{
    const newUser = req.body;
    res.status(StatusCode.CREATED).send(newUser);
    });

usersRoute.put('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) =>{
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;
    res.status(StatusCode.OK).send({modifiedUser});
}); 
usersRoute.delete('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) =>{

    res.sendStatus(StatusCode.OK);
});
export default usersRoute