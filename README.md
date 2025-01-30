# URL Shortener API

## Overview

The URL Shortener API is a web service that allows users to shorten long URLs into shorter, more manageable links. This project provides a simple and efficient way to create, manage, and track shortened URLs. Key features include user authentication, URL shortening for both guests and registered users, and detailed statistics for each shortened URL.

## Features

- User registration and login
- URL shortening for guests and registered users
- Detailed statistics for each shortened URL
- User-specific URL management
- API documentation with Swagger

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sachinthapa572/UrlShortnerApp.git
   cd UrlShortnerApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3001
   MONGO_DB=<your_mongodb_connection_string>
   CLIENT_URL=http://localhost:3000
   JWT_SECRET=<your_jwt_secret>
   IPINFO_API_KEY=<your_ipinfo_api_key>
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Environment Setup

Ensure you have the following installed on your machine:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud instance)

## API Documentation

The API documentation is available at `/api-docs` when the server is running. It provides detailed information about each endpoint, including request and response formats.

## Usage Instructions

1. Register a new user:
   ```bash
   curl -X POST http://localhost:3001/api/v1/register -H "Content-Type: application/json" -d '{"username": "johndoe", "email": "johndoe@example.com", "password": "password123"}'
   ```

2. Login as a user:
   ```bash
   curl -X POST http://localhost:3001/api/v1/login -H "Content-Type: application/json" -d '{"email": "johndoe@example.com", "password": "password123"}'
   ```

3. Shorten a URL as a guest:
   ```bash
   curl -X POST http://localhost:3001/api/v1/shorten-guest -H "Content-Type: application/json" -d '{"mainUrl": "https://example.com"}'
   ```

4. Shorten a URL as a registered user:
   ```bash
   curl -X POST http://localhost:3001/api/v1/shorten-user -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d '{"mainUrl": "https://example.com", "userId": "<your_user_id>"}'
   ```

## Available Endpoints

### Auth

- `POST /register`: Register a new user
- `POST /login`: Login a user

### Shorten

- `POST /shorten-guest`: Shorten a URL as a guest user
- `POST /shorten-user`: Shorten a URL as a registered user

### Redirect

- `GET /:urlId`: Redirect to the original URL

### Stats

- `POST /stats`: Get statistics about URLs and users

### User

- `GET /user/:userId`: Get user details
- `GET /urls/:userId`: Get URLs for a user
- `POST /edit-url`: Edit a shortened URL

## Sample Request and Response Formats

### Register a new user

**Request:**
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "ok": true,
  "data": {
    "_id": "60c72b2f9b1d8e001c8e4b8a",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "createdAt": "2021-06-14T07:00:00.000Z",
    "updatedAt": "2021-06-14T07:00:00.000Z"
  }
}
```

### Shorten a URL as a guest

**Request:**
```json
{
  "mainUrl": "https://example.com"
}
```

**Response:**
```json
{
  "originalUrl": "https://example.com",
  "shortUrl": "http://localhost:3001/abc123",
  "urlId": "abc123",
  "status": "public",
  "date": "2021-06-14T07:00:00.000Z"
}
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Swagger for API documentation

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
