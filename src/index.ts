import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.routes';
const app = express();
//app configs 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//route configs
app.use(usersRoute);
app.use(statusRoute);
app.use(authorizationRoute);
// Error Handlers configs
app.use(errorHandler);
//start server
app.listen(3000, ()=> {
    console.log('Aplicação executando na porta 3000!');
});