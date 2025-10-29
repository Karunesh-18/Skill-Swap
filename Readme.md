# Skill Swap - Competency Exchange Platform for Students

A beginner-friendly Spring Boot application that enables students to exchange skills and knowledge with their peers.

## Project Overview

**Skill Swap** is a digital platform where students can:
- List their expertise and skills they want to learn
- Find matches with students who have complementary skills
- Schedule and manage skill exchange sessions
- Rate and review each other to build a trusted reputation system

## Technologies Used

- **Java 21**
- **Spring Boot 3.5.7**
- **Spring Web** - REST API and web controllers
- **Spring Data JPA** - Database operations
- **Thymeleaf** - Template engine for HTML pages
- **MySQL** - Database
- **Lombok** - Reduce boilerplate code
- **Maven** - Dependency management

## Prerequisites

Before running this application, make sure you have:

1. **Java 21** installed
2. **Maven** installed
3. **MySQL Server** installed and running

## Database Setup

### Step 1: Install MySQL

Download and install MySQL from https://dev.mysql.com/downloads/mysql/

### Step 2: Create Database and User

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE skillswap;
CREATE USER root@localhost IDENTIFIED BY root;
GRANT ALL PRIVILEGES ON skillswap.* TO root@localhost;
FLUSH PRIVILEGES;
```

### Step 3: Update Database Credentials (if needed)

If you want to use different credentials, edit src/main/resources/application.properties

## How to Run

### Using Maven

```bash
mvn spring-boot:run
```

### Using JAR file

```bash
mvn clean install
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

## Accessing the Application

Once the application starts successfully, open your browser and go to:

http://localhost:8080

## Features

### 1. User Management Module
- Register: Create a new account
- Login: Simple session-based authentication
- Profile: View and manage your profile

### 2. Skill Management Module
- Add Skills: List skills you can offer or want to learn
- Skill Types: OFFERED or REQUESTED
- Skill Levels: BEGINNER, INTERMEDIATE, ADVANCED

### 3. Matching Engine Module
- Find Matches: Get recommendations based on your requested skills
- View Providers: See who offers specific skills

### 4. Session Management Module
- Request Session: Schedule a skill exchange
- Confirm Session: Providers can confirm requests
- Complete Session: Mark sessions as completed
- Session Status: PENDING, CONFIRMED, COMPLETED, CANCELLED

### 5. Review Module
- Rate Sessions: Give 1-5 star ratings
- Write Reviews: Leave comments
- User Rating: Automatic calculation of average rating

## Troubleshooting

### MySQL Connection Error

If you see Access denied for user root@localhost, make sure:
1. MySQL server is running
2. The username and password in application.properties are correct
3. The database skillswap exists
4. The user has proper permissions

### Port Already in Use

If port 8080 is already in use, change it in application.properties:
server.port=8081

## Notes for Beginners

- This application uses simple session-based authentication
- Passwords are stored in plain text (for learning only)
- The code follows a simple layered architecture
- No complex security features (JWT, encryption, etc.)

## License

This is a learning project. Feel free to use and modify as needed.
