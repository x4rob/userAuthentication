import { Pool } from "pg";

const connectionString = 'insert a db';
const db = new Pool({connectionString});
export default db;