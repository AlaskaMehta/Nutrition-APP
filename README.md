# Nutrition App Backend

This is the backend service for the Nutrition App, built using Node.js, Express.js, and MongoDB. It provides RESTful APIs to manage users, nutrition plans, food items, and meal tracking.

## Features
- User authentication (JWT-based login & registration)
- CRUD operations for nutrition plans
- Food item database with nutritional values
- Meal tracking and calorie calculations
- Secure API endpoints with authentication and authorization

## Tech Stack
- **Node.js** - Server runtime environment
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication & authorization
- **dotenv** - Manage environment variables
- **bcryptjs** - Secure password hashing

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps
1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/nutrition-app-backend.git
   cd nutrition-app-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Nutrition Plans
- `GET /api/plans` - Get all nutrition plans
- `POST /api/plans` - Create a new nutrition plan
- `PUT /api/plans/:id` - Update a nutrition plan
- `DELETE /api/plans/:id` - Delete a nutrition plan

### Food Items
- `GET /api/foods` - Get food items and nutritional values
- `POST /api/foods` - Add a new food item

### Meal Tracking
- `POST /api/meals` - Log a meal
- `GET /api/meals/:userId` - Get meals for a user

## Project Structure
```
nutrition-app-backend/
│── config/            # Database and config settings
│── controllers/       # Request handlers
│── models/            # Mongoose schemas
│── routes/            # API routes
│── middleware/        # Authentication middleware
│── utils/             # Helper functions
│── .env               # Environment variables
│── server.js          # Entry point
│── package.json       # Dependencies & scripts
```

## Contribution
Contributions are welcome! Feel free to open an issue or submit a pull request.



