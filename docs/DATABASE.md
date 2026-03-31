# Database Schema

## Tables Overview

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20),
  avatar_url VARCHAR(500),
  role ENUM('seeker', 'owner', 'admin') NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  INDEX(email),
  INDEX(role)
);
```

### PG Listings Table
```sql
CREATE TABLE pg_listings (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  property_type ENUM('shared', 'private') NOT NULL,
  address VARCHAR(500) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  rent_amount DECIMAL(10, 2) NOT NULL,
  deposit_amount DECIMAL(10, 2),
  notice_period INTEGER,
  amenities JSON,
  room_types JSON,
  gender_preference ENUM('male', 'female', 'coed'),
  rules_regulations TEXT,
  availability_status ENUM('available', 'booked', 'upcoming'),
  total_beds INTEGER,
  available_beds INTEGER,
  featured BOOLEAN DEFAULT false,
  featured_until TIMESTAMP,
  status ENUM('draft', 'pending_approval', 'approved', 'rejected'),
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX(owner_id),
  INDEX(city),
  INDEX(status),
  INDEX(featured),
  SPATIAL INDEX(geom) /* for location-based queries */
);
```

### Inquiries Table
```sql
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER NOT NULL REFERENCES pg_listings(id),
  seeker_id INTEGER NOT NULL REFERENCES users(id),
  owner_id INTEGER NOT NULL REFERENCES users(id),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status ENUM('new', 'viewed', 'responded', 'rejected') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX(listing_id),
  INDEX(seeker_id),
  INDEX(owner_id),
  INDEX(status),
  UNIQUE(listing_id, seeker_id)
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES conversations(id),
  sender_id INTEGER NOT NULL REFERENCES users(id),
  receiver_id INTEGER NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX(conversation_id),
  INDEX(sender_id),
  INDEX(receiver_id),
  INDEX(read)
);

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  user1_id INTEGER NOT NULL REFERENCES users(id),
  user2_id INTEGER NOT NULL REFERENCES users(id),
  last_message_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user1_id, user2_id)
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER NOT NULL REFERENCES pg_listings(id),
  seeker_id INTEGER NOT NULL REFERENCES users(id),
  owner_id INTEGER NOT NULL REFERENCES users(id),
  check_in_date DATE NOT NULL,
  check_out_date DATE,
  status ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'),
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_status ENUM('pending', 'paid', 'failed', 'refunded'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX(seeker_id),
  INDEX(owner_id),
  INDEX(status)
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER REFERENCES pg_listings(id),
  seeker_id INTEGER REFERENCES users(id),
  owner_id INTEGER REFERENCES users(id),
  reviewer_id INTEGER NOT NULL REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX(listing_id),
  INDEX(seeker_id),
  INDEX(owner_id),
  INDEX(reviewer_id),
  INDEX(is_approved)
);
```

### Favorites Table
```sql
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  listing_id INTEGER NOT NULL REFERENCES pg_listings(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, listing_id),
  INDEX(user_id),
  INDEX(listing_id)
);
```

### Payments Table
```sql
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER NOT NULL REFERENCES bookings(id),
  amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('credit_card', 'debit_card', 'netbanking', 'wallet'),
  transaction_id VARCHAR(255) UNIQUE,
  status ENUM('pending', 'success', 'failed'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX(booking_id),
  INDEX(status)
);
```

### Media Table
```sql
CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER NOT NULL REFERENCES pg_listings(id),
  media_type ENUM('image', 'video'),
  url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX(listing_id)
);
```

## Key Relationships

- **Users → PG Listings**: One user can have many listings
- **Users → Inquiries**: A seeker sends inquiries to owners
- **PG Listings → Inquiries**: One listing receives many inquiries
- **Users → Messages**: Users can send messages to each other
- **Users → Bookings**: A seeker can book multiple listings
- **PG Listings → Reviews**: A listing can have many reviews
- **Users → Favorites**: A user can favorite multiple listings
- **Bookings → Payments**: One booking can have multiple payments
- **PG Listings → Media**: One listing can have multiple images/videos
