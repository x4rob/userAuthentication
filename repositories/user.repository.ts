import db from '../src/db';
import User from '../src/models/user.model';



class UserRepository{
   
    async findAllUsers(): Promise<User[]>{
        const query = `
        SELECT uuid, username
        FROM application_user
    `;
    const { rows } = await db.query<User>(query);
    /*const result = await db.query<User>(query);
    const rows = result.rows;
    *como dentro do Query já tem o atributo rows
    *podemos simplificar extraindo somente o rows
    * 
    **/
        return rows || [];
    }
    async findById(uuid: string): Promise<User>{
        const query = `
            SELECT uuid, username
            FROM application_user
            WHERE uuid = $1 
        `
        /**o $ funciona para passarmos parametros para query sem expôr-la */
        const values = [uuid];
        const { rows } = await db.query<User>(query, values);
        const [ user ] = rows;
        return user;
    }
};
export default new UserRepository;