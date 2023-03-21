# Ecommerce Admin Dashboard

This is an ecommerce admin dashboard application built using Node.js, React, and MongoDB. It allows admin users to manage products, orders, customers, and more.

## Features

- Product management: add, edit, delete, and view products
- Order management: view, update, and delete orders
- Customer management: view and delete customers
- Sales analytics: view sales data in charts and graphs using Nivo
- Authentication and authorization using JsonWebToken
- Responsive design using Material UI
- Server-side pagination using MongoDB Aggregate
- Client-side pagination and sorting using Material UI Data Grid
- Server-side validation using Dotenv
- Deployment using Render and Railway

## Getting Started

1. Clone the repository
2. Install dependencies
3. Create a `.env` file in the root directory and add the following environment variables:
    ```
    NODE_ENV=development
    PORT=5000
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    ```
4. Start the development server
    ```
    npm run dev
    ```
5. Open your browser and go to http://localhost:5000

## Deployment

This application can be deployed to Render or Railway.

### Render

1. Sign up for a Render account and create a new static site.
2. Set the following environment variables in the Render dashboard:
    ```
    NODE_ENV=production
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    ```
3. Add the following build command:
    ```
    npm run build
    ```
4. Add the following start command:
    ```
    npm run start
    ```
5. Deploy the app to Render.

### Railway

1. Sign up for a Railway account and create a new Node.js app.
2. Set the following environment variables in the Railway dashboard:
    ```
    NODE_ENV=production
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    ```
3. Add the following build command:
    ```
    npm run build
    ```
4. Add the following start command:
    ```
    npm run start
    ```
5. Deploy the app to Railway.
