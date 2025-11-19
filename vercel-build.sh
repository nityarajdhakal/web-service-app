#!/bin/bash
set -e

echo "🏗️  Building miniapp-frontend..."
cd miniapp-frontend || exit 1
echo "📦 Installing dependencies..."
npm ci
echo "🔨 Building project..."
npm run build
echo "✅ Build completed successfully!"
