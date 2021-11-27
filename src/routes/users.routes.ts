import { NextFunction, Request, Response, Router } from 'express';
import StatusCode from 'http-status-codes';
import userRepository from '../../repositories/user.repository';

const usersRoute = Router();/* uma forma de configurar rotas*/

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) =>{
    const users = await userRepository.findAllUsers();
    res.status(StatusCode.OK).send(users);
    });

usersRoute.get('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) =>{
    const uuid = req.params.uuid;
    const user = await userRepository.findById(uuid);
    res.status(StatusCode.OK).send(user);
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