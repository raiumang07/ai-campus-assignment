# Student Management System

A full-stack student management application built with Node.js, Express, and EJS. The project features complete CRUD functionality, a secure JWT-based authentication system, and a clean, responsive UI styled with Tailwind CSS. This project was developed with the assistance of the Gemini AI code assistant.

## Features

- **Secure User Authentication**: JWT-based authentication with password hashing (bcrypt).
- **CRUD Operations**: Create, Read, Update, and Delete student records.
- **Dynamic Data Management**: Pagination, sorting (by name, cgpa, overallPercentage), and filtering (by branch, name).
- **Calculated Fields**: The application automatically calculates two derived fields:
    - `cgpaPercentage`: `(cgpa / 10) * 100`
    - `overallPercentage`: `0.7 * cgpaPercentage + 0.3 * attendance`

## Data Model

The `Student` model includes the following fields:

- **`name`**: String, Required
- **`branch`**: String, Enum (`CSE`, `IT`, `ECE`, `ME`, `CE`), Required
- **`isHosteller`**: Boolean
- **`cgpa`**: Number (0-10), Required
- **`attendance`**: Number (0-100), Required
- **`cgpaPercentage`**: Number, Calculated
- **`overallPercentage`**: Number, Calculated

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Frontend**: EJS (Embedded JavaScript templates), Tailwind CSS
- **Authentication**: JSON Web Tokens (JWT), bcrypt.js for password hashing
- **Development**: `nodemon` for live server reloading

## Local Setup and Installation

Follow these steps to run the project on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd ai-campus-assignment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the `backend` directory. This file is ignored by Git and should contain your secret keys.

    - `MONGODB_URI`: Your full connection string for your MongoDB Atlas database.
    - `JWT_SECRET`: A long, random, and secret string used for signing authentication tokens.

    **Example `.env` file:**
    ```
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
    JWT_SECRET=your-super-secret-and-long-random-string
    ```

4.  **Run the application locally:**
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## API Endpoints

All student-related routes are protected and require authentication.

| Method | Endpoint                 | Description                                          |
| :----- | :----------------------- | :--------------------------------------------------- |
| **Auth** |                          |                                                      |
| `POST` | `/auth/register`         | Register a new user.                                 |
| `POST` | `/auth/login`            | Log in and receive an auth cookie.                   |
| **Students** |                      |                                                      |
| `GET`  | `/students`              | Get a list of all students (HTML response).          |
| `GET`  | `/students/add`          | Display the form to add a new student.               |
| `POST` | `/students/add`          | Create a new student record.                         |
| `GET`  | `/students/edit/:id`     | Display the form to edit a student.                  |
| `POST` | `/students/edit/:id`     | Update a student record.                             |
| `POST` | `/students/delete/:id`   | Delete a student record.                             |

## API Testing with Postman

A Postman collection is included in the root of the project (`postman_collection.json`) to facilitate API testing.

1.  **Import the Collection**: Open Postman, go to `File > Import`, and select the `postman_collection.json` file.
2.  **Authentication**: Run the `POST /auth/register` request to create a user, then run `POST /auth/login`. Postman will automatically save the authentication cookie and use it for all subsequent requests to protected endpoints.
3.  **Testing**: You can now use the requests in the "Students" folder to test the CRUD functionality. For `update` and `delete` requests, remember to set the `studentId` variable in the collection's variable settings.

## Deployment

This application is configured for easy deployment on [Render](https://render.com/).

1.  **Push your code** to a GitHub or GitLab repository.
2.  **Create a new "Web Service"** on Render and connect it to your repository.
3.  **Use the following settings** during creation:
    -   **Runtime:** `Node`
    -   **Build Command:** `npm install`
    -   **Start Command:** `npm start`
4.  **Add Environment Variables**: In the "Environment" tab for your service, add the same `MONGODB_URI` and `JWT_SECRET` key-value pairs that you have in your local `.env` file. For security, ensure you set their type to "Secret".
5.  **Deploy**. Render will automatically build and start your application. It will be available at the URL provided by Render.

---

## AI Assistant Usage Log

This project was developed with the help of Gemini. The following is a log of the prompts used to generate and refine the code:

1.  **Initial Scaffolding**: "generate the initial project scaffolding: Backend: Express app with MongoDB Atlas connection, Student model, and auth routes. Frontend: EJS templates for login and student pages. README.md with project overview."
2.  **Authentication System**: "Add authentication system to the Express app: Register and login routes, use bcrypt.js for password hashing, use JWT for token-based login, store users in MongoDB, protect student CRUD routes so only logged-in users can access them."
3.  **Student Model & Routes**: "Create a Student model with fields: name (string), branch (enum: CSE, IT, ECE, ME, CE), isHosteller (boolean), cgpa (number), virtual field cgpaPercentage = (cgpa/10)*100. Generate Express routes for Create, Read, Update, Delete students using Mongoose."
4.  **API Enhancements**: "Enhance the Student list API with: Pagination (5–10 items per page), Filter by branch, Bonus: Sorting by CGPA and search by name."
5.  **EJS Templates (Initial)**: "Generate EJS templates for: login.ejs (login form), students.ejs (list with pagination, filter, search), form.ejs (add/edit student)."
6.  **Styling (Bootstrap)**: "Use Bootstrap for simple styling."
7.  **Styling (Revision to Tailwind)**: "NO NO use tailwind only not bootstrap"
8.  **Postman Tests**: "Generate Postman test cases for all endpoints (auth + student CRUD). Provide example requests and responses. Explain how to export the Postman collection and include screenshots in README."
9.  **Deployment Instructions**: "Prepare deployment instructions: Deploy backend + EJS frontend on Render, Use MongoDB Atlas connection string from .env, Add environment variable setup in README, Suggest commit messages for deployment."
10. **Final README**: "Generate a professional README.md with: Project overview, Tech stack, Setup instructions, API endpoints summary, Postman usage, Deployment notes, AI usage log (list of Gemini prompts used)."
