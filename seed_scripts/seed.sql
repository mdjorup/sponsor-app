\c sponsor_hunt;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table users (
    id UUID primary key default uuid_generate_v4(),
    email varchar(255) unique not null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

create table entities (
    id UUID primary key default uuid_generate_v4(),
    user_id UUID not null references users(id),
    name varchar(255) not null,
    description text,
    type varchar(50) not null, 
    link varchar(255) not null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

create table listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID NOT NULL REFERENCES entities(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    reserve_price numeric(10, 2) not null,
    n_winners int4 not null default 1,
    end_date TIMESTAMP WITH TIME ZONE not null,
    status VARCHAR(50) DEFAULT 'open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

create table bids (
    id UUID PRIMARY KEY default uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id),
    bidding_entity_id UUID NOT NULL REFERENCES entities(id),
    amount decimal(10, 2) not null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_entities_user_id ON entities(user_id);
CREATE INDEX idx_listings_entity_id ON listings(entity_id);
CREATE INDEX idx_bids_listing_id ON bids(listing_id);
CREATE INDEX idx_bids_bidder_id ON bids(bidding_entity_id);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_user_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_entity_modtime
    BEFORE UPDATE ON entities
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_listing_modtime
    BEFORE UPDATE ON listings
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_bid_modtime
    BEFORE UPDATE ON bids
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();