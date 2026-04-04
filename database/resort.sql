CREATE DATABASE resort_management;

USE resort_management;

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  guest_name VARCHAR(100),
  room_number INT,
  check_in DATE,
  check_out DATE
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_number INT,
  room_type VARCHAR(50),
  status VARCHAR(50)
);