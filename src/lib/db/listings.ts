import { query } from "../pool";
import { Listing } from "../types";

export const getAllListings = async () => {
  const entitiesResponse = await query<Listing>(`select * from listings`, []);

  return entitiesResponse.rows || [];
};

export const getListingById = async (id: string) => {
  const entityResponse = await query<Listing>(
    `select * from listings where id = $1`,
    [id],
  );

  if (entityResponse.rowCount === 0) {
    return undefined;
  }

  return entityResponse.rows[0];
};
