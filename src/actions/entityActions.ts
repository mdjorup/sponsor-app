"use server";

import { getUserId } from "@/lib/db/auth";
import { query } from "@/lib/pool";
import { Entity } from "@/lib/types";

export const createEntity = async (
  name: Entity["name"],
  description: Entity["description"],
  type: Entity["type"],
  link: Entity["link"],
) => {
  const userId = await getUserId();

  if (!userId) {
    return undefined;
  }

  const newEntity = await query<Entity>(
    `INSERT INTO entities (user_id, name, description, type, link) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, name, description, type, link],
  );

  if (newEntity.rowCount === 0) {
    return undefined;
  }

  return newEntity.rows[0];
};
