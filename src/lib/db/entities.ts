import { query } from "../pool";
import { Entity } from "../types";

export const getEntityById = async (id: string) => {
  const entityResponse = await query<Entity>(
    `select * from entities where id = $1`,
    [id],
  );

  if (entityResponse.rowCount === 0) {
    return undefined;
  }

  return entityResponse.rows[0];
};

export const getAllEntities = async () => {
  const entitiesResponse = await query<Entity>(`select * from entities`, []);

  return entitiesResponse.rows || [];
};
