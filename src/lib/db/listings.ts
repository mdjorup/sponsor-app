import { query } from "../pool";
import { Listing } from "../types";

export const getAllListings = async () => {
  const entitiesResponse = await query<Listing>(`select * from listings`, []);

  return entitiesResponse.rows || [];
};
