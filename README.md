
# RBAC App - User and Role Management

This is a Role-Based Access Control (RBAC) web application designed to manage users, roles, and permissions. The app provides functionality to:

- **User Management**: Add, delete, and update user details.
- **Role Management**: Create, delete, and modify roles.
- **Permission Management**: Update permissions for each role.
- **CRUD Operations**: Perform create, read, update, and delete operations for users, roles, and permissions.

The application was built using **React.js** for the frontend, and the backend is powered by **Node.js** with **Express** for handling CRUD operations.

## Features

- **User Management**:
  - Add new users to the system.
  - Delete existing users.
  - Update user details such as email, username, and roles.
  
- **Role Management**:
  - Create new roles.
  - Delete roles.
  - Update permissions assigned to each role.

- **Permission Management**:
  - Toggle permissions for each role (CRUD functionality for permissions).
  
- **Authentication**: Login and logout functionality (optional based on your implementation).

## Technologies Used

- **Frontend**:
  - **React.js**: For building the user interface.
  - **Redux Toolkit**: For state management across the app.
  - **Axios**: For making API requests to the backend.
  - **Tailwind CSS**: For responsive design and styling.
  
- **Backend**:
  - **Node.js** and **Express**: For building the backend API that handles CRUD operations.
  - **MongoDB** (or another database): For storing user, role, and permission data.

- **Others**:
  - **JWT Authentication** (optional): For secure access to the app.

## Project Setup

### 1. Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/rbac-app.git
cd rbac-app
```

### 2. Install Dependencies

Next, install the necessary dependencies for both the frontend and backend.

- **Frontend** (React app):

```bash
cd Frontend
npm install
```

- **Backend** (Node.js/Express API):

```bash
cd Backend
npm install
```

### 3. Configure Environment Variables

Both the frontend and backend may require environment variables for proper setup.

- **Backend** (`.env`):
  - This file is used for configuring sensitive data such as database URLs and JWT secrets.

  Example `.env` file for the backend:
  ```
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/rbacDB
  ```

- **Frontend** (`.env`):
  - Used for configuring API endpoints and other frontend-specific settings.

  Example `.env` file for the frontend:
  ```
  VITE_BACKEND_URL=http://localhost:5000
  ```

### 4. Running the Application

After installing dependencies and setting up environment variables, you can run both the backend and frontend locally.

#### Start the Backend

In the `backend` directory, run the following command to start the backend server:

```bash
cd Backend
npm run dev
```

This command starts the backend API server and watches for changes. It will be running on `http://localhost:5000` (or the port specified in the `.env` file).

#### Start the Frontend

In the `frontend` directory, run the following command to start the React application:

```bash
cd Frontend
npm run dev
```

This will start the React app and make it accessible at `http://localhost:5173`.

### 5. Access the App

Once both the frontend and backend are running, open your browser and visit `http://localhost:5173` to access the app.

You should be able to interact with the user and role management features of the app.

### 6. API Endpoints

The backend provides the following API endpoints to manage users, roles, and permissions:

#### User Management

- **GET `/api/users`**: Fetch all users.
- **POST `/api/users`**: Create a new user.
- **PUT `/api/users/:id`**: Update a user by ID.
- **DELETE `/api/users/:id`**: Delete a user by ID.

#### Role Management

- **GET `/api/roles`**: Fetch all roles.
- **POST `/api/roles`**: Create a new role.
- **PUT `/api/roles/:id`**: Update a role by ID (modify permissions).
- **DELETE `/api/roles/:id`**: Delete a role by ID.

#### Permission Management

- **GET `/api/permissions`**: Fetch all permissions.
- **POST `/api/permissions`**: Add a new permission.
- **PUT `/api/permissions/:id`**: Update a permission by ID.
- **DELETE `/api/permissions/:id`**: Delete a permission by ID.

### 7. Running Tests

To run tests (if available), use the following command in either the frontend or backend directory:

```bash
npm test
```

This command will run any existing tests and give you feedback about the test results.

### 8. Build for Production

To build the application for production, use the following command in both the frontend and backend:

- For the frontend:
  ```bash
  cd frontend
  npm run build
  ```

- For the backend, build and deploy the server as per your deployment process.

### 9. Folder Structure

Below is an overview of the folder structure in the project:

```bash
/rbac-app
│
├── /frontend                    # React app (UI)
│   ├── /public
│   ├── /src
│   ├── package.json
│   └── .env
│
└── /backend                     # Backend API (Node.js/Express)
    ├── /controllers
    ├── /models
    ├── /routes
    ├── package.json
    └── .env
```

## How We Built This App

This app was developed using **React.js** for the frontend to ensure a dynamic and responsive user interface. **Redux Toolkit** is employed for efficient state management to store and update the state of users, roles, and permissions across the application.

The **Node.js** backend, built with **Express**, is responsible for handling CRUD operations. Data is stored in **MongoDB** (or another database of your choice). 

### User Management:
- The backend exposes API routes that allow creating, updating, and deleting users. These routes handle incoming requests from the frontend using Axios.

### Role and Permission Management:
- Similar to user management, roles and permissions can be created, updated, and deleted via the backend API. The frontend sends requests to the API to perform actions like role creation and permission assignment.





## Acknowledgments

- [React.js](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)

For any issues or feature requests, feel free to create an issue on GitHub or contact me directly.



### Steps to Access the Dashboard

1. **Landing Page**:  
   - When you open the website link or run the code on localhost, you will be greeted by a landing page.

2. **Navigate to the Dashboard**:  
   - On the landing page, locate the **Dashboard** button in the navigation bar (navbar).  
   - Click on this button to proceed.

3. **Login Page**:  
   - You will be redirected to the **Login Page**, where you need to enter the required credentials.

4. **Login Credentials**:  
   - Use the following credentials to log in:  
     - **Email**: `test@gmail.com`  
     - **Password**: `test@123`

5. **Explore the Dashboard**:  
   - After logging in, you will be directed to the dashboard.  
   - You can explore all its features, which are fully functional and responsive for both mobile and desktop devices.

---

**Note**:  
The backend is deployed on **Render**, which may cause some delays in API responses. Please be patient during these delays. Each API call provides a pop-up notification after a successful operation.
