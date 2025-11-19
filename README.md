# Web Service Mini App

A modern, full-stack web application with login, terms, and pricelist functionality. Built with React, Node.js, and PostgreSQL.

## 📋 Overview

This application features:
- **Login Page**: Secure JWT-based authentication with multilingual support
- **Terms Page**: Dynamic terms and conditions display
- **Pricelist Page**: Interactive product management with real-time updates
- **Responsive Design**: Works seamlessly on mobile (portrait/landscape), tablet, and desktop
- **Multilingual**: Supports English and Swedish

## 🎨 Design

The application features a modern, professional design with:
- Gradient backgrounds and buttons
- Smooth animations and transitions
- Card-based layouts for mobile
- Sticky headers and scrollable tables
- Consistent color scheme using blue (#3498db) as primary color

## 🚀 Live Demo

- **Frontend**: https://web-service-app-one.vercel.app/
- **Backend API**: https://web-service-application.onrender.com/api

### Login Credentials
- **Email**: test@example.com
- **Password**: password123

## 📸 Screenshots

The application matches the reference designs at:
- Login: https://online.123fakturera.se/login/
- Terms: https://online.123fakturera.se/terms/

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.5
- **State Management**: Redux Toolkit 2.10.1
- **HTTP Client**: Axios 1.13.2
- **Styling**: Vanilla CSS (no frameworks)
- **Icons**: Lucide React 0.553.0, React Icons 5.5.0
- **Language**: JavaScript (ES6+)

### Backend
- **Runtime**: Node.js 18.x
- **Framework**: Express 4.18.2
- **Database**: PostgreSQL 15
- **Authentication**: JWT (jsonwebtoken 9.0.0)
- **Password Hashing**: bcryptjs 2.4.3
- **Security**: Helmet 7.0.0, CORS 2.8.5
- **Performance**: Compression 1.7.4, Rate Limiting
- **Logging**: Morgan 1.10.0
- **Language**: JavaScript (ES6+)

### Database
- **PostgreSQL**: 15-alpine
- **ORM/Client**: pg 8.8.0

### DevOps
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (Alpine)
- **Process Manager**: PM2 (optional)

## 📁 Project Structure

```
web-service-app/
├── miniapp-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable components (HamburgerMenu)
│   │   ├── pages/            # Page components (Login, Terms, Pricelist)
│   │   ├── config/           # Configuration files (API)
│   │   ├── features/         # Redux features
│   │   └── App.jsx           # Main app component
│   ├── package.json
│   └── vite.config.js
├── miniapp-backend/           # Node.js backend API
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Auth middleware
│   │   ├── routes/           # API routes
│   │   ├── config/           # Database config
│   │   └── app.js            # Express app
│   ├── scripts/              # Utility scripts
│   ├── database.sql          # Database schema
│   ├── seed_data.sql         # Initial data (25+ products)
│   ├── package.json
│   └── server.js             # Entry point
├── docker-compose.yml         # Docker orchestration
├── Dockerfile.backend         # Backend Docker image
├── Dockerfile.frontend        # Frontend Docker image
├── nginx.conf                 # Nginx configuration
├── deploy.sh                  # Automated deployment script
├── VM-DEPLOYMENT.md           # VM deployment guide
└── README.md                  # This file
```

## 🔧 Features

### Authentication
- JWT-based authentication
- Secure password hashing with bcrypt
- Token-based API protection
- Automatic token validation

### Database
- PostgreSQL with proper schema
- 25+ sample products for testing scrolling
- Indexed columns for performance
- Translations table for multilingual support

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login

#### Products
- `GET /api/products` - Get all products (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)

#### Translations
- `GET /api/translations?page=login&lang=en` - Get translations

#### Health Check
- `GET /health` - Server health status

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL 15 or higher
- npm or yarn

### Local Development

#### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd web-service-app
```

#### 2. Database Setup
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE miniapp_db;

# Create user
CREATE USER miniapp_user WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE miniapp_db TO miniapp_user;

# Exit psql
\q

# Import schema and data
psql -U miniapp_user -d miniapp_db -f miniapp-backend/database.sql
psql -U miniapp_user -d miniapp_db -f miniapp-backend/seed_data.sql
```

#### 3. Backend Setup
```bash
cd miniapp-backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniapp_db
DB_USER=miniapp_user
DB_PASSWORD=your_password
JWT_SECRET=$(openssl rand -base64 32)
PORT=5000
NODE_ENV=development
EOF

# Start backend
npm start

# For development with auto-reload
npm run dev
```

#### 4. Frontend Setup
```bash
cd miniapp-frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

#### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Login**: test@example.com / password123

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Quick deployment
chmod +x deploy.sh
./deploy.sh

# Or manually
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 5000
- Frontend on port 80

### Environment Variables for Docker

Create a `.env` file in the root directory:

```env
DB_NAME=miniapp_db
DB_USER=miniapp_user
DB_PASSWORD=your_secure_password
JWT_SECRET=your_super_secret_jwt_key
```

## ☁️ VM Deployment

For detailed VM deployment instructions, see [VM-DEPLOYMENT.md](VM-DEPLOYMENT.md)

### Quick VM Deploy

```bash
# On your Linux VM
git clone <your-repository-url>
cd web-service-app
chmod +x deploy.sh
./deploy.sh
```

The script automatically:
- Installs Docker and Docker Compose
- Creates secure environment variables
- Builds and starts all services
- Sets up the database with initial data

## 🧪 Testing

### Manual Testing

1. **Login Page**
   - Test email: test@example.com
   - Test password: password123
   - Try invalid credentials
   - Test language switching (EN/SE)
   - Test responsive design on different screen sizes

2. **Pricelist Page**
   - View products (25+ items)
   - Edit product fields
   - Test scrolling functionality
   - Check responsive layout changes
   - Verify JWT authentication

3. **Terms Page**
   - View terms in English and Swedish
   - Test responsive design
   - Verify navigation links

### Responsive Design Testing

Test on these breakpoints:
- **Mobile Portrait**: ≤ 600px
- **Mobile Landscape / Tablet Portrait**: 601px - 768px
- **Tablet Landscape**: 769px - 1024px
- **Desktop**: > 1024px

## 📦 Building for Production

### Frontend

```bash
cd miniapp-frontend
npm run build
# Output: dist/ directory
```

### Backend

```bash
cd miniapp-backend
npm install --production
# Set NODE_ENV=production
```

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Helmet.js security headers
- CORS protection
- Rate limiting (120 requests/minute)
- SQL injection prevention (parameterized queries)
- XSS protection
- Environment variable configuration

## 🌍 Internationalization

Supported languages:
- **English** (EN)
- **Swedish** (SE)

Translations are stored in the database and can be easily extended.

## 📊 Database Schema

### Users Table
```sql
- id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- email (VARCHAR UNIQUE)
- password (VARCHAR - hashed)
- created_at (TIMESTAMP)
```

### Products Table
```sql
- id (SERIAL PRIMARY KEY)
- article_no (VARCHAR)
- product_name (VARCHAR)
- in_price (NUMERIC)
- price (NUMERIC)
- unit (VARCHAR)
- in_stock (INTEGER)
- description (TEXT)
- created_at, updated_at (TIMESTAMP)
```

### Translations Table
```sql
- id (SERIAL PRIMARY KEY)
- page (VARCHAR)
- lang (VARCHAR)
- key (VARCHAR)
- value (TEXT)
- created_at (TIMESTAMP)
```

## 🔧 Configuration

### Frontend Environment Variables

```env
VITE_API_BASE_URL=http://your-backend-url/api
```

### Backend Environment Variables

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniapp_db
DB_USER=miniapp_user
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=production
CORS_ORIGIN=http://your-frontend-url
RATE_LIMIT_MAX=120
```

## 📝 API Documentation

### Authentication

**POST /api/auth/login**
```json
Request:
{
  "email": "test@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "accessToken": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

### Products

**GET /api/products**
- Requires: `Authorization: Bearer <token>`
- Returns: Array of products

**PUT /api/products/:id**
- Requires: `Authorization: Bearer <token>`
- Body: Updated product fields
- Returns: Updated product

### Translations

**GET /api/translations?page=login&lang=en**
- Returns: Key-value pairs of translations

## 🐛 Troubleshooting

### Common Issues

1. **Database connection failed**
   - Check PostgreSQL is running
   - Verify credentials in .env
   - Ensure database exists

2. **Frontend can't connect to backend**
   - Check VITE_API_BASE_URL in frontend .env
   - Verify CORS settings in backend
   - Check backend is running on correct port

3. **JWT authentication fails**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Clear localStorage and re-login

4. **Docker containers won't start**
   - Check port conflicts (80, 5000, 5432)
   - Verify .env file exists
   - Check Docker logs: `docker-compose logs`

## 🔄 Updating

```bash
# Pull latest changes
git pull origin main

# Update backend
cd miniapp-backend
npm install
npm start

# Update frontend
cd miniapp-frontend
npm install
npm run build

# Or with Docker
docker-compose up -d --build
```

## 📄 License

This project is created as a technical assessment.

## 👥 Author

Created for the Web Service App technical assessment.

## 🙏 Acknowledgments

- Reference designs from https://online.123fakturera.se/
- Icons and assets from the original implementation
- Background image from https://storage.123fakturera.se/

## 📞 Support

For deployment issues or questions:
1. Check this README
2. Review [VM-DEPLOYMENT.md](VM-DEPLOYMENT.md)
3. Check application logs
4. Verify environment variables

## 🗺️ Roadmap

Future improvements (not part of current scope):
- User registration
- Product deletion and creation
- Search functionality
- Sorting and filtering
- Export to PDF/Excel
- User profile management
- Admin dashboard

---

**Note**: This application is a technical demonstration and should be deployed with additional security measures for production use (SSL/TLS, environment-specific secrets, monitoring, backups, etc.).

