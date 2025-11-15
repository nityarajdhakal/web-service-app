#!/bin/bash
# Diagnostic script for Render deployment

echo "=== Checking Frontend Build ==="
if [ -d "../miniapp-frontend/dist" ]; then
  echo "✅ Frontend dist folder exists"
  ls -la ../miniapp-frontend/dist | head -20
  
  if [ -f "../miniapp-frontend/dist/index.html" ]; then
    echo "✅ index.html found"
  else
    echo "❌ index.html NOT found"
  fi
  
  if [ -d "../miniapp-frontend/dist/assets" ]; then
    echo "✅ assets folder exists"
    echo "Files: $(ls ../miniapp-frontend/dist/assets | wc -l)"
  else
    echo "❌ assets folder NOT found"
  fi
else
  echo "❌ Frontend dist folder does NOT exist"
  echo "Run: cd ../miniapp-frontend && npm install && npm run build"
fi

echo ""
echo "=== Checking Environment Variables ==="
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "FRONTEND_DIST_PATH: $FRONTEND_DIST_PATH"
echo "DATABASE_URL: $(echo $DATABASE_URL | sed 's/.*@/[HIDDEN]@/')"

echo ""
echo "=== Current Directory ==="
pwd
ls -la | grep -E "^d|package.json"

echo ""
echo "=== Backend Dependencies ==="
npm list --depth=0 2>/dev/null | head -10
