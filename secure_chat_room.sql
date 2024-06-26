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
  createdBy INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  maxCapacity INT DEFAULT 6,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (createdBy) REFERENCES users(id)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chatRoomId INT NOT NULL,
  senderId INT NOT NULL,
  message TEXT NOT NULL,
  sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chatRoomId) REFERENCES chat_rooms(id),
  FOREIGN KEY (senderId) REFERENCES users(id)
);

CREATE TABLE friend_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  senderId INT NOT NULL,
  receiverId INT NOT NULL,
  status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
  sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (senderId) REFERENCES users(id),
  FOREIGN KEY (receiverId) REFERENCES users(id)
);

