import { query } from "../pool";
import { Entity } from "../types";
import { getUserId } from "./auth";

export const getEntityById = async (id: string) => {
  try {
    const entityResponse = await query<Entity>(
      `select * from entities where id = $1`,
      [id],
    );
    if (entityResponse.rowCount === 0) {
      return undefined;
    }

    return entityResponse.rows[0];
  } catch {
    return undefined;
  }
};

export const getAllEntities = async () => {
  const entitiesResponse = await query<Entity>(`select * from entities`, []);

  return entitiesResponse.rows || [];
};

export const getUserEntities = async () => {
  const userId = await getUserId();
  if (!userId) {
    return [];
  }
  const entitiesResponse = await query<Entity>(
    `select * from entities where user_id = $1`,
    [userId],
  );

  return entitiesResponse.rows || [];
};
