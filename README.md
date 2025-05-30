# 📚 Course Critique

A comprehensive course review platform built with Next.js 15, TypeScript, PostgreSQL, and Prisma. Users can browse courses, read authentic reviews, and share their learning experiences.

<div align="center">
    <img src="./public/logoWithWhiteBG.png" alt="Course Critique" style="background-color: white; padding: 20px; border-radius: 10px;" width="300"/>
</div>

## ✨ Features

- **Browse Courses**: Discover courses with advanced filtering and sorting
- **Authentic Reviews**: Read and write detailed course reviews
- **User Authentication**: Secure JWT-based authentication system
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Responsive Design**: Modern UI with Tailwind CSS
- **Real-time Data**: Live course ratings and review counts
- **User Authorization**: Users can only edit/delete their own reviews

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS, Framer Motion
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** database server
- **Git** for version control

## 🎬 Demo Video

[![Watch the Demo Video](https://img.youtube.com/vi/b1vRvwYap-g/0.jpg)](https://www.youtube.com/watch?v=b1vRvwYap-g)

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/d5e8aa55-8da8-4c12-a193-ada1d3e41440)

![image](https://github.com/user-attachments/assets/059e0443-f81c-4f1e-851d-dc847c86a791)

![image](https://github.com/user-attachments/assets/8679ed01-7489-465f-b2c1-632e76c46f9e)

![image](https://github.com/user-attachments/assets/36f3abfa-1de4-4e63-9b45-8fdf0d6e1e4c)

![image](https://github.com/user-attachments/assets/dbcc275e-7894-4b03-9083-d49721c6bfe9)

![image](https://github.com/user-attachments/assets/e3c9cec6-47e7-4ab6-afab-38821d53d101)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd course-critique
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/course_critique_db"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-here"

# Next.js API URL (for client-side API calls)
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

**Important Notes:**
- Replace `username`, `password` with your PostgreSQL credentials
- Replace `course_critique_db` with your database name
- Generate a secure JWT secret (you can use online generators or `openssl rand -base64 32`)

### 4. Set Up the Database

#### Create PostgreSQL Database

```bash
# Connect to PostgreSQL as superuser
psql -U postgres

# Create database
CREATE DATABASE course_critique_db;

# Create user (optional)
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE course_critique_db TO your_username;

# Exit PostgreSQL
\q
```

#### Initialize Prisma and Seed Data

```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed the database with sample data
npm run db:seed
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
course-critique/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Database seeding script
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── auth/             # Authentication pages
│   │   ├── courses/          # Course-related pages
│   │   └── page.tsx          # Home page
│   ├── components/           # Reusable UI components
│   ├── contexts/            # React contexts (Auth)
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
└── package.json
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:seed      # Seed database with sample data
npm run db:reset     # Reset and reseed database

# Code Quality
npm run lint         # Run ESLint
```

## 🧪 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Courses
- `GET /api/courses` - Get all courses (with filtering/pagination)
- `GET /api/courses/[id]` - Get specific course

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/[id]` - Get specific review
- `POST /api/courses/[id]/reviews` - Create review for course
- `PUT /api/reviews/[id]` - Update review
- `DELETE /api/reviews/[id]` - Delete review

## 👥 Default Users

After seeding, you can login with these test accounts:

```
Email: alice@example.com
Password: password123

Email: bob@example.com  
Password: password123

Email: carol@example.com
Password: password123

Email: david@example.com
Password: password123

Email: eva@example.com
Password: password123
```

## 🎨 Key Features Demo

### 1. Browse Courses
- Visit the courses page to see all available courses
- Use filters to find courses by category, level, or rating
- Sort by rating, student count, price, or date

### 2. Course Details
- Click on any course to view detailed information
- Read authentic student reviews and ratings
- See course statistics and enrollment information

### 3. Write Reviews
- Login to your account
- Navigate to a course and click "Write Review"
- Share your experience with title, content, rating, pros/cons

### 4. Manage Reviews
- Edit your existing reviews
- Delete reviews you no longer want to keep
- Only authors can modify their own reviews

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Authorization**: Route-level and API-level access control
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Proper API security measures

## 🤝 Contributing

This project is developed and maintained by **[Trong-tra](https://github.com/Trong-tra)**.

<div align="center">
    <img src="https://emerald-imaginative-dingo-160.mypinata.cloud/ipfs/bafybeihqjecymbqxilbfttpd27llvyuf3no3h72me55er2an5ebjiwzz7i" alt="Contributor NFT" width="200"/>
</div>

---
