# Blog Application REST API

A fully functional RESTful Blog API built using Node.js, Express, MongoDB, and JWT authentication.
This API allows users to register, log in, create blog posts, add comments, and manage ownership-based access control.

## Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Protected routes using middleware
- Ownership-based authorization for posts and comments

### Blog Posts
- Create, read, update, delete posts
- Only the post owner can update or delete a post
- Public read access for posts

### Comments
- Add comments to posts
- View comments for a post (public)
- Update/delete comments (only comment owner)
- Post owner can also delete comments on their post

### Testing
- Integration tests using Jest + Supertest
- Authentication tests
- Authorization tests
- Ownership tests

## Tech Stack
- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT (jsonwebtoken)
- Password Security: bcryptjs
- Testing: Jest, Supertest
- Environment Management: dotenv

## Project Structure
```
blog-backend/
│
├── src/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── commentsController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── user.js
│   │   ├── post.js
│   │   └── comments.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── commentRoutes.js
│   └── tests/
│       ├── server.test.js
│       ├── auth.test.js
│       ├── post.test.js
│       └── comments.test.js
│
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md

```


## Auth Routes
| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login`    | Login and get JWT   |


## Post Routes
| Method | Endpoint     | Auth | Description     |
| ------ | ------------ | ---- | --------------- |
| POST   | `/posts`     | ✅    | Create a post   |
| GET    | `/posts`     | ❌    | Get all posts   |
| PUT    | `/posts/:id` | ✅    | Update own post |
| DELETE | `/posts/:id` | ✅    | Delete own post |

## Comment Routes
| Method | Endpoint               | Auth | Description                          |
| ------ | ---------------------- | ---- | ------------------------------------ |
| POST   | `/comments`            | ✅    | Add comment to post                  |
| GET    | `/comments?post_id=ID` | ❌    | Get comments of a post               |
| PUT    | `/comments/:id`        | ✅    | Update own comment                   |
| DELETE | `/comments/:id`        | ✅    | Delete comment (owner or post owner) |


## Authentication Header Format
For protected routes included
```
Authorization: Bearer <JWT_TOKEN>
```

## Running Tests

### Install dependencies
```
npm install
```

### Run tests

```
npm test
```

### Test Coverage
- Server health check
- User registration
- User login
- Protected routes
- Ownership enforcement

## Running the Server
```
npm run dev
```

Server will run at:
```
http://localhost:3000
```

## Key Learnings from This Project
- REST API design
- Express middleware flow
- JWT authentication
- Secure password hashing
- MongoDB relationships using ObjectId
- Ownership-based authorization
- Integration testing with Jest & Supertest
- Debugging real-world backend issues

## Future Improvements (Optional)
- Pagination for posts & comments
- Like / dislike system
- User roles (admin, editor)
- Rate limiting
- Refresh tokens

## Author
Harshal Chavan
MERN Stack Developer

## Project Status
- Completed
- Fully tested
- production ready