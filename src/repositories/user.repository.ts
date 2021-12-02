import { strictEqual } from 'assert';
import  DatabaseError  from '../models/errors/database.errors.model';
import db from '../db';
import User from '../models/user.model';



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
        try{
            
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

        } catch (error){
           throw new DatabaseError('Error na consulta por 10 ',error);
        }
    }
    async create(user: User): Promise<string>{
        const script = `
        INSERT INTO application_user{
            username,
            password
        }
        VALUES ($1, crypt($2, 'banana'))
        RETURNING uuid
        `;

        /**lembrando que banana é a senha, então precisa-se transforma, no caso $3, em uma variável de ambiente ou algo mais seguro */
        const values = [user.username, user.password];
        const { rows} = await db.query<{uuid: string}>(script, values);
        const [newUser] = rows;
        return newUser.uuid;
    }
    async update(user: User): Promise<void>{
        const script = `
        UPDATE application_user
        SET 
            username = $1
            password = crypt($2, 'banana')
        WHERE uuid = $3    `;
        const values = [user.username, user.password, user.uuid];
        await db.query(script, values);
        

    }
    async remove(uuid: string): Promise<void>{
        const cript = `
        DELETE
        FROM appllication_user
        WHERE uuid = $1
        `;
        const values = [uuid];
        await db.query(cript, values);
    }
};
export default new UserRepository;