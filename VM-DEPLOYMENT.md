# VM Deployment Guide

This guide will help you deploy the Web Service App on a Linux VM.

## Prerequisites

- A Linux VM (Ubuntu 20.04+, Debian 10+, or CentOS 7+)
- Root or sudo access
- Internet connection
- At least 2GB RAM and 10GB disk space

## Recommended Free VM Providers

1. **Oracle Cloud (Free Tier)** - Best option
   - 2 AMD-based Compute instances (1/8 OCPU and 1 GB memory each)
   - URL: https://www.oracle.com/cloud/free/

2. **Google Cloud Platform (Free Trial)**
   - $300 credit for 90 days
   - URL: https://cloud.google.com/free

3. **AWS (Free Tier)**
   - t2.micro instance (750 hours/month for 12 months)
   - URL: https://aws.amazon.com/free/

4. **Azure (Free Trial)**
   - $200 credit for 30 days
   - URL: https://azure.microsoft.com/free/

## Quick Deployment (Recommended)

### Step 1: Connect to Your VM

```bash
ssh username@your-vm-ip-address
```

### Step 2: Clone the Repository

```bash
# Install git if not already installed
sudo apt update && sudo apt install -y git

# Clone the repository
git clone <your-repository-url>
cd web-service-app
```

### Step 3: Run Deployment Script

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

The script will:
- Install Docker and Docker Compose if not present
- Create .env file with random secure secrets
- Build and start all services (PostgreSQL, Backend, Frontend)
- Set up the database with initial data

### Step 4: Access the Application

After deployment completes, access your application:
- **Frontend**: http://your-vm-ip-address
- **Backend API**: http://your-vm-ip-address:5000
- **Default Login**: test@example.com / password123

## Manual Deployment

If you prefer manual deployment or the script doesn't work:

### 1. Install Docker

```bash
# Update package index
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group
sudo usermod -aG docker $USER

# Log out and log back in for changes to take effect
```

### 2. Install Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker-compose --version
```

### 3. Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit the .env file with your preferred editor
nano .env

# Update these values:
# - DB_PASSWORD: Choose a strong password
# - JWT_SECRET: Generate a random secret (use: openssl rand -base64 32)
```

### 4. Start the Application

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

## Firewall Configuration

### Ubuntu/Debian with UFW

```bash
# Allow SSH (if not already allowed)
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow backend API (if needed externally)
sudo ufw allow 5000/tcp

# Enable firewall
sudo ufw enable
```

### CentOS/RHEL with firewalld

```bash
# Allow HTTP
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-port=5000/tcp

# Reload firewall
sudo firewall-cmd --reload
```

## Cloud Provider Specific Setup

### Oracle Cloud
- Open port 80 in Security List (Networking → Virtual Cloud Networks → Security Lists)
- Configure ingress rule: Source CIDR 0.0.0.0/0, Destination Port 80

### AWS EC2
- Edit Security Group
- Add inbound rule: Type=HTTP, Port=80, Source=0.0.0.0/0

### Google Cloud Platform
- Create firewall rule for port 80
- `gcloud compute firewall-rules create allow-http --allow tcp:80`

### Azure
- Add inbound security rule in Network Security Group
- Port=80, Protocol=TCP, Source=Any, Destination=Any

## Database Access

If you need to access the database directly:

```bash
# Connect to PostgreSQL container
docker exec -it miniapp-postgres psql -U miniapp_user -d miniapp_db

# View all products
SELECT * FROM products;

# View users
SELECT id, name, email FROM users;

# Exit psql
\q
```

## Backup Database

```bash
# Create backup
docker exec miniapp-postgres pg_dump -U miniapp_user miniapp_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
docker exec -i miniapp-postgres psql -U miniapp_user miniapp_db < backup_file.sql
```

## Troubleshooting

### Services won't start

```bash
# Check logs
docker-compose logs

# Check specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```

### Port already in use

```bash
# Check what's using port 80
sudo lsof -i :80

# Kill the process or change port in docker-compose.yml
```

### Database connection issues

```bash
# Restart database
docker-compose restart postgres

# Check database logs
docker-compose logs postgres

# Verify database is ready
docker exec miniapp-postgres pg_isready -U miniapp_user
```

### Frontend can't connect to backend

Update `miniapp-frontend/src/config/api.js`:
```javascript
const API_BASE_URL = 'http://YOUR_VM_IP:5000/api';
```

Then rebuild:
```bash
docker-compose up -d --build frontend
```

## Monitoring

### View all logs in real-time

```bash
docker-compose logs -f
```

### View resource usage

```bash
docker stats
```

### Check container health

```bash
docker-compose ps
```

## Updating the Application

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Or use the deployment script
./deploy.sh
```

## Security Recommendations

1. **Change default passwords** in .env file
2. **Use strong JWT secret** (at least 32 random characters)
3. **Set up SSL/TLS** with Let's Encrypt (see SSL-SETUP.md)
4. **Keep system updated**: `sudo apt update && sudo apt upgrade`
5. **Use firewall** to restrict access
6. **Regular backups** of database
7. **Monitor logs** for suspicious activity

## Performance Optimization

### For production use:

1. **Enable nginx caching** (already configured in nginx.conf)
2. **Use CDN** for static assets
3. **Set up database connection pooling**
4. **Enable database query caching**
5. **Monitor with tools** like Prometheus/Grafana

## Support

For issues or questions:
- Check logs: `docker-compose logs`
- Review this guide
- Check the main README.md file

## Stopping the Application

```bash
# Stop services (keeps data)
docker-compose stop

# Stop and remove containers (keeps data)
docker-compose down

# Stop and remove everything including data
docker-compose down -v
```

