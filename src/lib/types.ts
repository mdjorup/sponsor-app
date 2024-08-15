export type UUID = string;

export const uuidRegex = new RegExp(
  "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
);

export interface User {
  id: UUID;
  email: string;
  created_at: Date; // ISO 8601 date string
  updated_at: Date; // ISO 8601 date string
}

export interface Entity {
  id: UUID;
  user_id: UUID;
  name: string;
  description?: string;
  type: string;
  link: string;
  created_at: Date; // ISO 8601 date string
  updated_at: Date; // ISO 8601 date string
}

export interface Listing {
  id: UUID;
  entity_id: UUID;
  title: string;
  description?: string;
  reserve_price: number; // assuming it will be handled as a number in JavaScript
  n_winners: number;
  end_date: string; // ISO 8601 date string
  status: string;
  created_at: Date; // ISO 8601 date string
  updated_at: Date; // ISO 8601 date string
}

export interface Bid {
  id: UUID;
  listing_id: UUID;
  bidding_entity_id: UUID;
  amount: number; // assuming it will be handled as a number in JavaScript
  created_at: Date; // ISO 8601 date string
  updated_at: Date; // ISO 8601 date string
}
