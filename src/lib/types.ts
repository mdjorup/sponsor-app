export type UUID = string;

export interface User {
  id: UUID;
  email: string;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
}

export interface Entity {
  id: UUID;
  user_id: UUID;
  name: string;
  description?: string;
  type: string;
  link: string;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
}

export interface Listing {
  id: UUID;
  entity_id: UUID;
  title: string;
  description?: string;
  reserve_price: number; // assuming it will be handled as a number in JavaScript
  end_date: string; // ISO 8601 date string
  status: string;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
}

export interface Bid {
  id: UUID;
  listing_id: UUID;
  bidding_entity_id: UUID;
  amount: number; // assuming it will be handled as a number in JavaScript
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
}
