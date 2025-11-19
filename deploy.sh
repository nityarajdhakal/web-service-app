#!/bin/bash

# Web Service App - Deployment Script
# This script helps you deploy the application on a Linux VM

set -e  # Exit on error

echo "=================================="
echo "Web Service App - Deployment"
echo "=================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo "✅ Docker installed successfully"
    echo "⚠️  Please log out and log back in for Docker permissions to take effect"
    echo "Then run this script again."
    exit 0
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Installing..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose installed successfully"
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    
    # Generate random JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    DB_PASSWORD=$(openssl rand -base64 16)
    
    # Update .env with generated secrets
    sed -i "s/your_super_secret_jwt_key_change_this_in_production/$JWT_SECRET/" .env
    sed -i "s/miniapp_password_change_this/$DB_PASSWORD/" .env
    
    echo "✅ .env file created with random secrets"
    echo "⚠️  Please review and update .env file if needed"
else
    echo "✅ .env file already exists"
fi

# Stop existing containers
echo ""
echo "🛑 Stopping existing containers (if any)..."
docker-compose down 2>/dev/null || true

# Build and start containers
echo ""
echo "🏗️  Building Docker images..."
docker-compose build --no-cache

echo ""
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be healthy
echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service status
echo ""
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "✅ Deployment completed!"
echo ""
echo "=================================="
echo "Access Information:"
echo "=================================="
echo "🌐 Frontend: http://localhost"
echo "🔌 Backend API: http://localhost:5000"
echo "🗄️  PostgreSQL: localhost:5432"
echo ""
echo "Default Login Credentials:"
echo "Email: test@example.com"
echo "Password: password123"
echo ""
echo "=================================="
echo ""
echo "Useful Commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop services: docker-compose down"
echo "  - Restart services: docker-compose restart"
echo "  - View status: docker-compose ps"
echo ""

