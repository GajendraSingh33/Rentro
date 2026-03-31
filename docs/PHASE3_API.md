# Phase 3: PG Owner Features - API Documentation

## Overview

Phase 3 implements comprehensive PG Owner features including listing management, media upload, availability tracking, inquiry handling, and owner dashboard analytics.

## Base URL

```
Development: http://localhost:3001/api
Production: https://api.rentro.com
```

## Authentication

All protected endpoints require JWT Bearer token:

```
Authorization: Bearer <access_token>
```

---

## Listings API

### Create Listing
```http
POST /listings
Authorization: Bearer <owner_token>
Content-Type: application/json

{
  "title": "Spacious PG near Metro Station",
  "description": "Well-ventilated rooms with all amenities...",
  "rent_amount": 8000,
  "deposit_amount": 16000,
  "address": "123 Main Street, Koramangala",
  "city": "Bangalore",
  "state": "Karnataka",
  "pincode": "560034",
  "room_type": "double",
  "sharing_type": 2,
  "gender_preference": "any",
  "food_available": true,
  "food_type": "both",
  "amenities": ["wifi", "ac", "parking", "power_backup"],
  "contact_name": "John Doe",
  "contact_phone": "9876543210",
  "contact_email": "john@example.com"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "title": "Spacious PG near Metro Station",
  "status": "draft",
  "created_at": "2024-03-31T12:00:00Z"
}
```

### Get All Listings
```http
GET /listings?page=1&limit=10&city=Bangalore&min_rent=5000&max_rent=15000
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| city | string | Filter by city |
| min_rent | number | Minimum rent amount |
| max_rent | number | Maximum rent amount |
| room_type | string | single, double, triple, dormitory |
| gender_preference | string | male, female, any |
| food_available | boolean | Filter by food availability |

**Response:**
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

### Get Single Listing
```http
GET /listings/:id
```

### Update Listing
```http
PUT /listings/:id
Authorization: Bearer <owner_token>
```

### Delete Listing
```http
DELETE /listings/:id
Authorization: Bearer <owner_token>
```

### Update Listing Status
```http
PATCH /listings/:id/status
Authorization: Bearer <owner_token>

{
  "status": "active" // draft, active, inactive
}
```

### Submit for Approval
```http
POST /listings/:id/submit
Authorization: Bearer <owner_token>
```

---

## Media API

### Upload Image
```http
POST /media/upload/image
Authorization: Bearer <owner_token>
Content-Type: multipart/form-data

file: <image_file>
listing_id: 1
```

**Response:**
```json
{
  "id": 1,
  "url": "https://s3.../image.webp",
  "thumbnail_url": "https://s3.../thumb_image.webp",
  "type": "image",
  "display_order": 1
}
```

### Upload Video
```http
POST /media/upload/video
Authorization: Bearer <owner_token>
Content-Type: multipart/form-data

file: <video_file>
listing_id: 1
```

### Delete Media
```http
DELETE /media/:id
Authorization: Bearer <owner_token>
```

### Set Cover Image
```http
PATCH /media/:id/cover
Authorization: Bearer <owner_token>
```

---

## Availability API

### Get Listing Availability
```http
GET /listings/:listingId/availability
```

### Update Room Availability
```http
PUT /listings/:listingId/availability/:roomNumber
Authorization: Bearer <owner_token>

{
  "available_beds_in_room": 2,
  "status": "available" // available, occupied, maintenance
}
```

### Bulk Update
```http
PATCH /listings/:listingId/availability/bulk
Authorization: Bearer <owner_token>

{
  "updates": [
    { "room_number": "A1", "available_beds_in_room": 1, "status": "available" },
    { "room_number": "A2", "available_beds_in_room": 0, "status": "occupied" }
  ]
}
```

### Add New Room
```http
PUT /listings/:listingId/availability/rooms
Authorization: Bearer <owner_token>

{
  "room_number": "B1",
  "total_beds": 3
}
```

---

## Inquiries API

### Create Inquiry (Seeker)
```http
POST /inquiries
Authorization: Bearer <seeker_token>

{
  "listing_id": 1,
  "message": "I'm interested in this PG. Is it available?",
  "preferred_move_in_date": "2024-04-15"
}
```

### Get My Inquiries
```http
GET /inquiries?status=new
Authorization: Bearer <token>
```

### Get Inquiry Details
```http
GET /inquiries/:id
Authorization: Bearer <token>
```

### Update Inquiry Status (Owner)
```http
PATCH /inquiries/:id/status
Authorization: Bearer <owner_token>

{
  "status": "viewed" // new, viewed, responded, rejected, closed
}
```

### Respond to Inquiry (Owner)
```http
POST /inquiries/:id/respond
Authorization: Bearer <owner_token>

{
  "response_message": "Thank you for your interest! The room is available..."
}
```

### Reveal Contact (Owner)
```http
POST /inquiries/:id/reveal-contact
Authorization: Bearer <owner_token>
```

**Response:**
```json
{
  "email": "seeker@example.com",
  "phone": "9876543210",
  "name": "Seeker Name"
}
```

### Get Inquiry Stats (Owner)
```http
GET /inquiries/stats/owner
Authorization: Bearer <owner_token>
```

---

## Owner Dashboard API

### Get Dashboard Overview
```http
GET /owner/dashboard/overview
Authorization: Bearer <owner_token>
```

**Response:**
```json
{
  "listings": { "total": 5, "active": 3, "draft": 2 },
  "views": { "total": 1250 },
  "inquiries": { "total": 45, "new": 5, "responded": 38 },
  "inquiryRate": "3.60"
}
```

### Get Top Listings
```http
GET /owner/dashboard/top-listings
Authorization: Bearer <owner_token>
```

### Get Views Over Time
```http
GET /owner/dashboard/views-over-time?days=30
Authorization: Bearer <owner_token>
```

### Get Inquiries Over Time
```http
GET /owner/dashboard/inquiries-over-time?days=30
Authorization: Bearer <owner_token>
```

---

## Location API

### Geocode Address
```http
POST /location/geocode

{
  "address": "Koramangala, Bangalore, Karnataka"
}
```

**Response:**
```json
{
  "lat": 12.9352,
  "lng": 77.6245,
  "formatted_address": "Koramangala, Bengaluru, Karnataka 560034",
  "place_id": "ChIJ...",
  "city": "Bangalore",
  "state": "Karnataka",
  "postal_code": "560034"
}
```

### Autocomplete
```http
GET /location/autocomplete?input=Koram
```

### Find Nearby Landmarks
```http
POST /location/nearby

{
  "lat": 12.9352,
  "lng": 77.6245,
  "radius": 1000
}
```

---

## Moderation API (Admin)

### Get Pending Listings
```http
GET /admin/moderation/pending?page=1&limit=20
Authorization: Bearer <admin_token>
```

### Approve Listing
```http
POST /admin/moderation/listings/:id/approve
Authorization: Bearer <admin_token>
```

### Reject Listing
```http
POST /admin/moderation/listings/:id/reject
Authorization: Bearer <admin_token>

{
  "reason": "Incomplete information. Please add more photos."
}
```

### Flag Listing
```http
POST /admin/moderation/listings/:id/flag
Authorization: Bearer <admin_token>

{
  "reason": "Reported for spam content"
}
```

### Get Moderation Stats
```http
GET /admin/moderation/stats
Authorization: Bearer <admin_token>
```

---

## Error Responses

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    { "field": "title", "message": "Title must be at least 10 characters" }
  ]
}
```

**Common Status Codes:**
| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limits

| Endpoint Category | Rate Limit |
|------------------|------------|
| Authentication | 5 requests/minute |
| Listings (read) | 100 requests/minute |
| Listings (write) | 20 requests/minute |
| Media upload | 10 requests/minute |
| Search | 50 requests/minute |

---

## Webhooks (Future)

Planned webhook events:
- `listing.approved`
- `listing.rejected`
- `inquiry.created`
- `inquiry.responded`
