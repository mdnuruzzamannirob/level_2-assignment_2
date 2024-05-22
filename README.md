# batch-3-assignment-2

## Introduction

Welcome to this assignment! This project serves as a comprehensive backend solution built using Express.js, TypeScript, Mongoose, MongoDB, and Zod. The primary objective of this assignment is to demonstrate proficiency in developing scalable and maintainable backend applications using modern technologies and best practices.

### Live server link:

- https://level-2-assignment-2-zeta-eight.vercel.app/

### Project Scope

The assignment entails the creation of a modular backend system that handles various HTTP requests, interacts with a MongoDB database using Mongoose, and enforces data validation using Zod schemas. The application follows a modular pattern to enhance code organization, readability, and maintainability.

### Features

- **Express.js Framework:** Leveraging Express.js to create a robust and efficient backend server.
- **TypeScript Support:** Utilizing TypeScript for static typing, enhancing code quality and developer productivity.
- **Mongoose ORM:** Interacting with MongoDB database using Mongoose for seamless data modeling and querying.
- **Zod Schema Validation:** Implementing Zod schemas for validating incoming data and ensuring data integrity.
- **Modular Design:** Adopting a modular architecture to organize code into separate modules for better scalability and maintainability.

### Assignment Goals

- Develop a RESTful API with CRUD operations for managing resources.
- Ensure data validation and error handling throughout the application.
- Write comprehensive documentation and instructions for project setup, usage, and contribution.
- Follow best practices for code quality, security, and performance optimization.
- Demonstrate understanding of asynchronous programming and middleware usage in Express.js.
- Encapsulate business logic into separate services and controllers.

### How to Use This Project

This documentation provides a detailed guide on setting up the project, running the server, accessing the API endpoints, understanding the project structure, and contributing to the project. Each section is designed to assist developers in navigating through the assignment requirements and successfully completing the tasks.

Now, let's dive into the project setup and explore the functionalities of our backend application!

#### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)

## Installation

To get started with the project, follow these steps:

## 1. **Clone the repository:**

```bash
git clone https://github.com/mdnuruzzamannirob/level_2-assignment_2.git
```

## 2. **Install dependencies:**

```npm
npm install
```

## 3. **Set up environment variables:**

- Create a `.env` file in the root directory.
- Define the following variables:
  - `PORT`: Port number for the server.
  - `DATABASE_URL`: MongoDB connection URI.

#### Example `.env` file:

```dotenv
PORT=5000
DATABASE_URL=mongodb+srv://level-two-assignment-two:c0lIObSIJ3KMX6PT@cluster0.tlfhvjw.mongodb.net/level-two-assignment-two?retryWrites=true&w=majority&appName=Cluster0
```

## Usage

#### To start the server, run:

```npm
npm run start:dev
```

#### Access the API at http://localhost:5000.

## API Documentation

- Product (POST method) http://localhost:5000/api/products

- Product (GET method) http://localhost:5000/api/products

- Product (GET method) http://localhost:5000/api/products?searchTerm=watch

- Product (GET method) http://localhost:5000/api/products/664deb50bdbdcc7bd6c33a6d

- Product (PUT method) http://localhost:5000/api/products/664deb50bdbdcc7bd6c33a6d

- Product (DELETE method) http://localhost:5000/api/products/664deb50bdbdcc7bd6c33a6d

- Orders (POST method) http://localhost:5000/api/orders

- Orders (GET method) http://localhost:5000/api/orders

- Orders (GET method) http://localhost:5000/api/orders?email=level2@programming-hero.com
