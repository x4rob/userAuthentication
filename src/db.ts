import { Pool } from "pg";

const connectionString = 'insert db';
const db = new Pool({connectionString});
export default db;