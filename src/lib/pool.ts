import dotenv from "dotenv";
import { Pool, PoolConfig, QueryResult, types } from "pg";

dotenv.config();

const dbConfig: PoolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT ?? "5432"),
  ssl:
    process.env.DB_HOST === "localhost" ? false : { rejectUnauthorized: false },
  max: 20,
};

types.setTypeParser(types.builtins.NUMERIC, (val) => parseFloat(val));
types.setTypeParser(types.builtins.INT8, (val) => parseInt(val));
types.setTypeParser(types.builtins.INT4, (val) => parseInt(val));
types.setTypeParser(types.builtins.JSONB, (val) => JSON.parse(val));

const pool = new Pool(dbConfig);

interface QueryResponse<T> {
  rows: T[];
  rowCount: number;
  error?: string;
}

export async function query<T>(
  queryString: string,
  params?: any[],
): Promise<QueryResponse<T>> {
  const client = await pool.connect();

  try {
    const result: QueryResult = await client.query(queryString, params);
    return {
      rows: result.rows as unknown as T[],
      rowCount: result.rowCount ?? 0,
    };
  } catch (error) {
    console.error(error);
    return {
      rows: [],
      rowCount: 0,
      error: "Error Fetching Data from Database",
    };
  } finally {
    client.release();
  }
}
