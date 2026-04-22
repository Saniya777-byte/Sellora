# Sellora - Fine Jewelry E-Commerce Platform

A production-ready full-stack e-commerce application for fine jewelry with modern architecture, comprehensive testing, and automated CI/CD deployment to AWS EC2.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Local Development Setup](#local-development-setup)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Sellora is a modern e-commerce platform built with React and Express, featuring:
- Product browsing with search, filtering, and pagination
- User authentication with JWT
- Shopping cart functionality
- Order management
- Admin product management
- Responsive design
- Comprehensive testing (unit, integration, E2E)
- Automated CI/CD pipeline

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │ Components   │  │   Context    │      │
│  │  (Routing)   │  │  (Reusable)  │  │  (State)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                            │                                │
│                    ┌───────▼───────┐                        │
│                    │  API Service │                        │
│                    └───────┬───────┘                        │
└────────────────────────────┼────────────────────────────────┘
                             │ HTTP/REST
┌────────────────────────────┼────────────────────────────────┐
│                    ┌───────▼───────┐                        │
│                    │   Express    │                        │
│                    │   Server     │                        │
│                    └───────┬───────┘                        │
│                            │                                │
│  ┌────────────────────────┼────────────────────────┐      │
│  │                        │                        │      │
│  ▼                        ▼                        ▼      │
│ ┌────────┐           ┌────────┐              ┌────────┐ │
│ │ Auth   │           │Product │              │ Order  │ │
│ │Middleware        │Controller           │Controller│ │
│ └────────┘           └────────┘              └────────┘ │
│  │                        │                        │      │
│  └────────────────────────┴────────────────────────┘      │
│                            │                                │
│                    ┌───────▼───────┐                        │
│                    │   Mongoose    │                        │
│                    │   (ODM)       │                        │
│                    └───────┬───────┘                        │
│                            │                                │
│                    ┌───────▼───────┐                        │
│                    │   MongoDB    │                        │
│                    │   Database    │                        │
│                    └───────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: CSS3 with component-based styles
- **State Management**: React Context (CartContext, AuthContext)
- **Routing**: React Router
- **Icons**: Lucide React
- **Testing**: Vitest, React Testing Library, Playwright (E2E)
- **Linting**: ESLint, Prettier

### Backend
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Testing**: Jest, Supertest, MongoDB Memory Server
- **Linting**: ESLint, Prettier

### DevOps
- **CI/CD**: GitHub Actions
- **Deployment**: AWS EC2 with PM2
- **Version Control**: Git with Husky pre-commit hooks
- **Dependency Management**: Dependabot
- **Containerization**: Docker (optional)

## ✨ Features

### User Features
- **Product Browsing**: View jewelry products with images, prices, and ratings
- **Search**: Search products by name/keyword
- **Filtering**: Filter products by category (rings, necklaces, earrings, bracelets)
- **Sorting**: Sort by price (low to high, high to low)
- **Pagination**: Navigate through product pages
- **Authentication**: Register and login with JWT
- **Shopping Cart**: Add/remove items, view cart
- **Order Management**: Place orders, view order history

### Admin Features
- **Product CRUD**: Create, read, update, delete products
- **Order Management**: View all orders, update order status
- **Protected Routes**: Admin-only endpoints with role-based access

### Technical Features
- **Error Handling**: Global error boundaries and middleware
- **Responsive Design**: Mobile-first approach
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks
- **Testing**: 70%+ coverage with unit, integration, and E2E tests
- **CI/CD**: Automated testing and deployment on push to main

## 📚 API Documentation

### Base URL
- Development: `http://localhost:5000`
- Production: `https://your-ec2-domain.com`

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Products

#### Get All Products
```http
GET /api/products?keyword=rings&category=rings&page=1&sort=price

Query Parameters:
- keyword: Search term (optional)
- category: Filter by category (optional)
- page: Page number (default: 1)
- sort: Sort order - "price" (asc), "-price" (desc) (optional)

Response:
{
  "products": [...],
  "page": 1,
  "pages": 10
}
```

#### Get Product by ID
```http
GET /api/products/:id

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Gold Petite Micropave Ring",
  "description": "...",
  "price": 299.99,
  "category": "rings",
  "stock": 10,
  "image": "https://...",
  "rating": { "rate": 4.8, "count": 312 }
}
```

#### Create Product (Admin)
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "rings",
  "stock": 10
}

Response: Product object
```

#### Update Product (Admin)
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Product",
  "price": 149.99
}

Response: Updated product object
```

#### Delete Product (Admin)
```http
DELETE /api/products/:id
Authorization: Bearer <token>

Response:
{
  "message": "Product removed successfully"
}
```

### Orders

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderItems": [
    {
      "product": "507f1f77bcf86cd799439011",
      "name": "Product Name",
      "quantity": 2,
      "price": 99.99,
      "image": "https://..."
    }
  ]
}

Response: Order object with total price
```

#### Get My Orders
```http
GET /api/orders/myorders
Authorization: Bearer <token>

Response: Array of user's orders
```

#### Get All Orders (Admin)
```http
GET /api/orders
Authorization: Bearer <token>

Response: Array of all orders with user details
```

#### Update Order Status (Admin)
```http
PUT /api/orders/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "shipped"
}

Response: Updated order object
```

### Health Check
```http
GET /api/health

Response:
{
  "status": "ok",
  "message": "Backend is running",
  "timestamp": "2026-04-21T11:00:00.000Z"
}
```

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/sellora
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Production (.env.production)
```env
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/sellora?retryWrites=true&w=majority
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
```

## 💻 Local Development Setup

### Prerequisites
- Node.js 20 LTS or higher
- MongoDB (local or Atlas)
- Git
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Saniya777-byte/Sellora.git
cd Sellora
```

2. **Install backend dependencies**
```bash
cd server
npm install
```

3. **Install frontend dependencies**
```bash
cd ../client
npm install
```

4. **Set up environment variables**
```bash
# Backend
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Frontend
cd ../client
cp .env.example .env
# Edit .env with your API URL
```

5. **Start MongoDB**
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or use MongoDB Atlas (recommended for production)
```

6. **Run development servers**
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

7. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/api/health

## 🧪 Testing

### Backend Testing
```bash
cd server
# Run all tests with coverage
npm test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint
npm run lint:fix

# Format code
npm run format
```

### Frontend Testing
```bash
cd client
# Run unit/integration tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run linting
npm run lint
npm run lint:fix

# Format code
npm run format
```

### Test Coverage
- Backend: 70%+ coverage threshold
- Frontend: 70%+ coverage threshold
- E2E: Critical user flows tested

## 🚀 CI/CD Pipeline

### GitHub Actions Workflows

1. **Backend CI** (`.github/workflows/backend-ci.yml`)
   - Triggers: Push/PR to main/develop (server changes only)
   - Steps:
     - Checkout code
     - Setup Node.js 20
     - Install dependencies
     - Run ESLint
     - Run Jest tests with coverage
     - Upload coverage to Codecov

2. **Frontend CI** (`.github/workflows/ci.yml`)
   - Triggers: Push/PR to main/develop
   - Steps:
     - Checkout code
     - Setup Node.js 20
     - Install dependencies
     - Run ESLint
     - Run Vitest tests with coverage
     - Build production bundle
     - Upload build artifact (main branch only)
     - Deploy to EC2 (main branch only)

3. **Deploy to EC2** (`.github/workflows/deploy.yml`)
   - Triggers: Push to main
   - Steps:
     - Build frontend
     - Deploy frontend dist to EC2 via SSH
     - Deploy backend code to EC2 via SSH
     - Install dependencies and restart with PM2
     - Health check

4. **Commit Lint** (`.github/workflows/commitlint.yml`)
   - Triggers: Pull requests
   - Validates commit messages follow conventional format

### Required GitHub Secrets
```
EC2_HOST=your-ec2-ip
EC2_USER=ubuntu
EC2_SSH_KEY=your-ssh-private-key
EC2_PORT=22 (optional, default: 22)
CODECOV_TOKEN=your-codecov-token (optional)
```

## 🌐 Deployment

### AWS EC2 Deployment

#### Initial Server Setup
```bash
# Run the setup script on your EC2 instance
./scripts/setup-server.sh
```

This script:
- Updates system packages
- Installs Node.js 20
- Configures Nginx
- Sets up firewall (UFW)
- Creates application directory

#### Manual Deployment
```bash
# Deploy frontend
EC2_HOST=your-ip EC2_USER=ubuntu EC2_KEY=~/.ssh/key.pem ./scripts/deploy.sh
```

#### Automated Deployment
Push to `main` branch triggers automatic deployment via GitHub Actions.

### Deployment Architecture
```
┌─────────────────────────────────────────┐
│          GitHub Repository               │
│         (main branch push)                │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│      GitHub Actions Workflow             │
│  - Build frontend                        │
│  - Run tests                             │
│  - Deploy via SSH                        │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│           AWS EC2 Instance               │
│  ┌──────────────┐  ┌──────────────┐    │
│  │   Nginx      │  │   PM2        │    │
│  │  (Frontend)  │  │  (Backend)   │    │
│  │  Port 80     │  │  Port 5000   │    │
│  └──────────────┘  └──────────────┘    │
│         │                  │            │
│         └────────┬─────────┘            │
│                  │                      │
│         ┌────────▼────────┐             │
│         │   MongoDB       │             │
│         │   (Atlas/Local) │             │
│         └─────────────────┘             │
└─────────────────────────────────────────┘
```

## 📁 Folder Structure

```
Sellora/
├── .github/
│   ├── workflows/
│   │   ├── backend-ci.yml      # Backend CI/CD pipeline
│   │   ├── ci.yml              # Frontend CI/CD pipeline
│   │   ├── deploy.yml          # EC2 deployment workflow
│   │   └── commitlint.yml      # Commit message validation
│   └── dependabot.yml          # Dependency auto-updates
├── client/
│   ├── e2e/                    # Playwright E2E tests
│   │   ├── login.spec.ts
│   │   ├── products.spec.ts
│   │   └── cart.spec.ts
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── context/            # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── hooks/              # Custom hooks
│   │   ├── pages/              # Page components
│   │   │   ├── CartPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   └── ProductsPage.jsx
│   │   ├── services/           # API services
│   │   │   └── api.js
│   │   ├── tests/              # Unit/integration tests
│   │   ├── App.jsx
│   │   ├── App.test.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .eslintrc.cjs
│   ├── .prettierrc
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   │   └── db.js
│   │   ├── controllers/        # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── orderController.js
│   │   │   └── productController.js
│   │   ├── middleware/         # Express middleware
│   │   │   ├── authMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   ├── models/             # Mongoose models
│   │   │   ├── Order.js
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   ├── routes/             # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── productRoutes.js
│   │   ├── utils/              # Utility functions
│   │   │   └── generateToken.js
│   │   ├── app.js
│   │   └── index.js
│   ├── tests/                  # Backend tests
│   │   ├── setup.js
│   │   ├── app.test.js
│   │   ├── authController.test.js
│   │   ├── generateToken.test.js
│   │   ├── orderController.test.js
│   │   └── productController.test.js
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── jest.config.js
│   └── package.json
├── scripts/                    # Deployment scripts
│   ├── deploy.sh               # Frontend deployment
│   └── setup-server.sh         # Server initialization
├── .commitlintrc.json          # Commit linting rules
├── .husky/                    # Git hooks
│   ├── pre-commit
│   └── commit-msg
├── .lintstagedrc.json          # Lint-staged config
├── docker-compose.yml          # Docker configuration
├── playwright.config.ts        # Playwright config
├── README.md
└── Idea.md
```

## 🤝 Contributing

### Commit Message Convention
We follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding/updating tests
- `chore:` Maintenance tasks
- `ci:` CI/CD changes

Example:
```bash
feat: add product search functionality
fix: resolve login authentication error
test: add E2E tests for checkout flow
```

### Development Workflow
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run tests: `npm test` (both client and server)
4. Run linting: `npm run lint`
5. Commit with conventional message
6. Push and create PR
7. Wait for CI checks to pass
8. Merge to main

### Pre-commit Hooks
- Lint-staged runs ESLint and Prettier on staged files
- Commitlint validates commit message format
- Tests run automatically on PR

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with React and Express
- Icons by Lucide
- Inspired by modern e-commerce platforms
- Deployed on AWS EC2

---

For questions or support, please open an issue on GitHub.
