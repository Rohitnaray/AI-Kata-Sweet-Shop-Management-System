# 🍬 Sweet Shop Management System

A full-stack web application for managing a sweet shop's inventory with user authentication and role-based access control.

![Sweet Shop](screenshots/home.png)

## 🎯 Project Overview

This project is a comprehensive sweet shop management system that allows users to browse, search, and purchase sweets, while admins can manage the inventory. Built as part of a TDD (Test-Driven Development) kata to demonstrate modern full-stack development practices.

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.1.5
- **Language**: Java 17
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: BCrypt
- **Testing**: JUnit 5, Mockito

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Custom CSS with responsive design

## ✨ Features

### User Features
- ✅ User registration and login
- ✅ Browse all available sweets
- ✅ Search sweets by name, category, or price range
- ✅ Purchase sweets (decreases inventory)
- ✅ View real-time stock availability

### Admin Features
- ✅ All user features
- ✅ Add new sweets to inventory
- ✅ Update sweet details
- ✅ Delete sweets from inventory
- ✅ Restock items

## 📋 Prerequisites

Before running this project, ensure you have:

- Java 17 or higher
- Maven 3.6+
- MongoDB 4.4+
- Node.js 18+ and npm
- Git

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/sweet-shop.git
cd sweet-shop
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies and build
mvn clean install

# Start MongoDB (if not running)
mongod --dbpath /path/to/your/data/directory

# Run the application
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

**Note**: Update `application.properties` if your MongoDB is on a different host/port:
```properties
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=sweetshop
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start on `http://localhost:5173`

### 4. Create Admin User (Optional)

To test admin features, you need to manually set a user as admin in MongoDB:
```bash
# Connect to MongoDB
mongosh

# Use the sweetshop database
use sweetshop

# Update a user to be admin
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { isAdmin: true } }
)
```

## 📸 Screenshots

### Login Page
![Login](screenshots/login.png)

### Sweet Shop Dashboard
![Dashboard](screenshots/dashboard.png)

### Search & Filter
![Search](screenshots/search.png)

### Add Sweet (Admin)
![Add Sweet](screenshots/add-sweet.png)

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
mvn test
```

Test coverage includes:
- User registration and login
- Sweet CRUD operations
- Purchase logic with quantity validation
- Admin authorization

### Test Report