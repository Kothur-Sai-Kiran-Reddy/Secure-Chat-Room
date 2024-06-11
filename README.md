# Secure Chat Room

This is a robust chat room system implemented using JavaScript, Node.js, MySQL, and Express. The application ensures security, user authentication, and interactive communication.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Security Measures](#security-measures)
- [Version Control](#version-control)
- [License](#license)

## Features

- User Registration and Authentication
- Chat Room Creation and Management
- Real-time Messaging
- Profile Viewing
- Friend Requests
- Secure Password Storage

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/secure_chat_room.git
    cd secure_chat_room
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file with the following content:
    ```env
    JWT_SECRET="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU"
    ```

4. Set up your MySQL database and configure the connection in `config/database.js`:
    ```javascript
    const mysql = require('mysql2');

    const pool = mysql.createPool({
        host: 'localhost',
        user: 'your_mysql_username',
        password: 'your_mysql_password',
        database: 'secure_chat_room'
    });

    const db = pool.promise();

    module.exports = db;
    ```

5. Create the database and tables by running the provided SQL commands in your MySQL environment.

6. Start the server:
    ```bash
    node server.js
    ```

7. Open your browser and navigate to `http://localhost:3000/index.html` to register and login.

## Usage

1. **Register:** Navigate to `http://localhost:3000/index.html` and fill out the registration form.
2. **Login:** Use the login form to authenticate.
3. **Chat:** After logging in, you will be redirected to the chat interface where you can create chat rooms, invite participants, and send messages. If not redirected Navigate to `http://localhost:3000/chat.html` and fill out the details of a messages and send it.

## API Endpoints

### Authentication

- **Register a new user**
    ```
    POST /api/register
    Body: { userId, deviceId, name, phone, password }
    ```

- **Login a user**
    ```
    POST /api/login
    Body: { userId, password }
    ```

### Chat Room Management

- **Create a chat room (Prime members only)**
    ```
    POST /api/chatrooms
    Headers: { Authorization: Bearer <token> }
    Body: { roomId, name, password }
    ```

- **Invite participants to a chat room**
    ```
    POST /api/chatrooms/invite
    Headers: { Authorization: Bearer <token> }
    Body: { roomId, inviteeUserId }
    ```

- **Join a chat room as a non-prime member**
    ```
    POST /api/joinroom
    Headers: { Authorization: Bearer <token> }
    Body: { roomId }
    ```

### Real-time Messaging

- **Send a message (via WebSocket)**
    ```
    POST /api/messages
    Headers: { Authorization: Bearer <token> }
    Body: { chatRoomId, message }
    ```

### Profile Management

- **View user profile**
    ```
    GET /api/profile/:userId
    Headers: { Authorization: Bearer <token> }
    ```

### Friend Requests

- **Send a friend request**
    ```
    POST /api/friend-requests
    Headers: { Authorization: Bearer <token> }
    Body: { receiverId }
    ```

## Database Schema

```sql
CREATE DATABASE secure_chat_room;

USE secure_chat_room;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(255) UNIQUE NOT NULL,
    deviceId VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    availCoins INT DEFAULT 0,
    password VARCHAR(255) NOT NULL,
    isPrime BOOLEAN DEFAULT FALSE
);

CREATE TABLE chat_rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roomId VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdBy INT NOT NULL,
    FOREIGN KEY (createdBy) REFERENCES users(id)
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chatRoomId INT NOT NULL,
    userId INT NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chatRoomId) REFERENCES chat_rooms(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE friend_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
    FOREIGN KEY (senderId) REFERENCES users(id),
    FOREIGN KEY (receiverId) REFERENCES users(id)
);


## Security Measures

- **Password Storage:** Passwords are hashed using `bcrypt`.
- **JWT Authentication:** JSON Web Tokens (JWT) are used for user authentication.
- **Input Validation:** Robust validation for user inputs to prevent SQL injection and other attacks.
- **Role-based Access:** Only prime members can create chat rooms.

## Version Control

This project uses Git for version control. Ensure you commit your changes frequently and push to a remote repository to maintain your version history.

This `README.md` provides a comprehensive guide for setting up, using, and understanding your secure chat room application, including detailed information about the API endpoints, database schema, and security measures.
