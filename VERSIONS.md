# Version Information

This document lists all versions of frameworks, libraries, and tools used in the Web Service App.

## Frontend

### Core
- **React**: 19.1.1
- **React DOM**: 19.1.1
- **React Router DOM**: 7.9.5
- **JavaScript**: ES6+ (No TypeScript)

### Build & Development
- **Vite**: 7.1.7
- **@vitejs/plugin-react**: 5.0.4
- **Node.js**: 18.x (recommended)

### State Management & Data
- **Redux Toolkit** (@reduxjs/toolkit): 2.10.1
- **React Redux**: 9.2.0
- **TanStack React Query** (@tanstack/react-query): 5.90.7
- **Axios**: 1.13.2

### UI & Forms
- **React Hook Form**: 7.66.0
- **React Hot Toast**: 2.6.0
- **Lucide React** (Icons): 0.553.0
- **React Icons**: 5.5.0

### Code Quality
- **ESLint**: 9.36.0
- **@eslint/js**: 9.36.0
- **eslint-plugin-react-hooks**: 5.2.0
- **eslint-plugin-react-refresh**: 0.4.22
- **globals**: 16.4.0

### Styling
- **CSS**: Vanilla CSS (No frameworks like Tailwind, Bootstrap, Material-UI)
- Custom CSS modules with responsive design

## Backend

### Core
- **Node.js**: 18.x
- **Express**: 4.18.2
- **JavaScript**: ES6+ (No TypeScript)

### Database
- **PostgreSQL**: 15 (Alpine Docker image)
- **pg** (Node.js PostgreSQL client): 8.8.0

### Authentication & Security
- **jsonwebtoken** (JWT): 9.0.0
- **bcryptjs** (Password hashing): 2.4.3
- **Helmet** (Security headers): 7.0.0
- **CORS**: 2.8.5
- **Express Rate Limit**: 6.8.0

### Utilities & Performance
- **dotenv** (Environment variables): 16.0.3
- **Compression**: 1.7.4
- **Morgan** (Logging): 1.10.0

### Development
- **nodemon**: 3.1.10

## DevOps & Deployment

### Containerization
- **Docker**: Latest (Docker Engine 20.10+)
- **Docker Compose**: v2.x
- **PostgreSQL Docker Image**: postgres:15-alpine
- **Node Docker Image**: node:18-alpine
- **Nginx Docker Image**: nginx:alpine

### Web Server
- **Nginx**: Alpine (latest)
- Configuration: Custom nginx.conf with gzip, caching, and security headers

### Deployment Platforms Tested
- **Vercel**: Frontend deployment (✅ Working)
- **Render**: Backend deployment (✅ Working)
- **Oracle Cloud**: VM deployment (✅ Recommended for free tier)
- **AWS EC2**: VM deployment (✅ Compatible)
- **Google Cloud**: VM deployment (✅ Compatible)
- **Azure**: VM deployment (✅ Compatible)

## Operating Systems

### Development
- **Windows**: 10/11
- **macOS**: 12+ (Monterey and above)
- **Linux**: Ubuntu 20.04+, Debian 10+

### Production (Linux VM)
- **Ubuntu**: 20.04 LTS, 22.04 LTS (Recommended)
- **Debian**: 10, 11
- **CentOS**: 7, 8
- **RHEL**: 8, 9
- **Amazon Linux**: 2

## Browser Compatibility

### Supported Browsers
- **Chrome**: 90+ (Recommended)
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

### Tested Resolutions
- **Mobile Portrait**: 320px - 600px
- **Mobile Landscape**: 600px - 768px
- **Tablet Portrait**: 768px - 1024px
- **Tablet Landscape**: 1024px - 1280px
- **Desktop**: 1280px - 1920px
- **Large Desktop**: 1920px+

## Development Tools

### Recommended
- **VS Code**: Latest
- **Git**: 2.30+
- **npm**: 9.x+ (comes with Node.js 18)
- **Postman** or **Insomnia**: API testing
- **pgAdmin**: Database management (optional)
- **Docker Desktop**: For Windows/Mac development

### Extensions (VS Code)
- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
- Docker
- PostgreSQL

## Package Managers

### Used
- **npm**: 9.x+ (Primary)

### Compatible
- **yarn**: 1.22+ (Alternative)
- **pnpm**: 7.x+ (Alternative)

## Build Output Sizes

### Frontend (Optimized Production Build)
- **Total**: ~800KB (gzipped: ~250KB)
- **Main JS**: ~400KB (gzipped: ~120KB)
- **Main CSS**: ~50KB (gzipped: ~10KB)
- **Assets**: ~350KB (icons, fonts)

### Docker Images
- **Backend**: ~150MB (Node Alpine + dependencies)
- **Frontend**: ~45MB (Nginx Alpine + built files)
- **PostgreSQL**: ~240MB (Postgres Alpine)
- **Total**: ~435MB (all containers)

## Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

### Load Times
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Largest Contentful Paint**: < 2.5s

## Database

### PostgreSQL Version
- **Version**: 15.x
- **Encoding**: UTF-8
- **Locale**: en_US.UTF-8

### Tables
- **users**: User accounts
- **products**: Product inventory (25+ records)
- **translations**: Multi-language content

### Indexes
- article_no (products)
- product_name (products)
- page, lang (translations)
- key (translations)

## API Specifications

### REST API
- **Version**: v1 (implicit in /api routes)
- **Format**: JSON
- **Authentication**: JWT Bearer tokens
- **Rate Limiting**: 120 requests/minute
- **CORS**: Configured for multiple origins

### Endpoints
- Authentication: 2 endpoints
- Products: 2 endpoints
- Translations: 1 endpoint
- Health: 1 endpoint

## Security

### Protocols
- **HTTPS**: Recommended for production (not configured in demo)
- **TLS**: 1.2+ (when SSL is configured)

### Headers (Helmet.js)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: (when HTTPS enabled)

## Monitoring & Logging

### Logging
- **Morgan**: HTTP request logging
- **Console**: Application logs
- **Log Format**: Combined (production), Dev (development)

### Health Checks
- Backend: /health endpoint
- Database: Connection pooling with health checks
- Docker: Container health checks configured

## Testing

### Manual Testing
- All pages tested across 5 breakpoints
- JWT authentication verified
- CRUD operations tested
- Responsive design validated

### Test Data
- 1 test user
- 25+ sample products
- English and Swedish translations

## Documentation

### Included Files
- **README.md**: Complete setup and usage guide
- **VM-DEPLOYMENT.md**: Detailed VM deployment instructions
- **VERSIONS.md**: This file (version information)
- **docker-compose.yml**: Container orchestration
- **nginx.conf**: Web server configuration
- **env.example**: Environment variable template

## Version Control

### Git
- **Version**: 2.30+
- **Platform**: GitHub, GitLab, or Bitbucket compatible
- **.gitignore**: Configured for Node.js, React, and environment files

## Updates

### Last Updated
- Application Version: 1.0.0
- Documentation: November 2025
- Dependencies: All up-to-date as of Nov 2025

### Update Strategy
- Regular security updates recommended
- Check for framework updates quarterly
- Database migrations as needed

---

**Note**: All version numbers are current as of the deployment date. For the latest versions of dependencies, run `npm outdated` in respective directories.

