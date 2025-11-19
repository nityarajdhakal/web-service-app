#!/bin/bash
set -e

echo "Building miniapp-frontend..."
cd miniapp-frontend
npm install
npm run build
echo "Build completed successfully!"
