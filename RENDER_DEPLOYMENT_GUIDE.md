# Render Deployment Guide

## Problem: 404 on `/pricelist` during refresh in production

### Root Cause
When you refresh a page like `/pricelist`, the browser tries to fetch it as a file. Without proper SPA (Single Page Application) configuration, the server returns 404. React Router can't handle the route because it never loads the app.

### Solution Overview
1. Build the frontend
2. Configure the backend to serve the built frontend
3. Set the build path environment variable on Render

---

## Step-by-Step Deployment

### 1. Build Frontend Locally

```bash
cd miniapp-frontend
npm install
npm run build
```

This creates a `dist/` folder in `miniapp-frontend/`.

### 2. Frontend Build Output
The `dist/` folder should contain:
```
dist/
├── index.html       (main entry point)
├── assets/          (JS, CSS bundles)
└── ...
```

### 3. Backend Configuration (Already Done ✅)

Your `app.js` now:
- Serves static files from `miniapp-frontend/dist`
- Catches all non-API routes and serves `index.html`
- React Router then handles the routing on the client-side

### 4. Render Deployment

#### Option A: Frontend + Backend in Same Service (Monorepo)

**In Render Dashboard:**

1. **Build Command:**
   ```bash
   cd miniapp-backend && npm install && cd ../miniapp-frontend && npm install && npm run build && cd ../miniapp-backend
   ```

2. **Start Command:**
   ```bash
   node server.js
   ```

3. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=5000
   FRONTEND_DIST_PATH=../miniapp-frontend/dist
   DATABASE_URL=<your-postgres-url>
   JWT_SECRET=<your-jwt-secret>
   CORS_ORIGIN=https://web-service-application.onrender.com
   ```

#### Option B: Separate Services

**Frontend Service (Vercel/Netlify):**
- Deploy only `miniapp-frontend/dist` contents
- Set backend URL in `VITE_API_BASE_URL`

**Backend Service (Render):**
- Deploy just `miniapp-backend/`
- Set `CORS_ORIGIN` to your frontend URL

---

## Testing

### Local Testing (Before Deploying)

```bash
# Terminal 1: Start backend
cd miniapp-backend
npm run dev

# Terminal 2: Build frontend
cd miniapp-frontend
npm run build

# Terminal 3: Serve built frontend with backend
# Navigate to http://localhost:5000/pricelist and refresh
# Should NOT get 404
```

### Production Testing

After deploying to Render:

```bash
# Test API route
curl https://web-service-application.onrender.com/api/auth/login

# Test SPA route (should return HTML, not 404)
curl https://web-service-application.onrender.com/pricelist
curl https://web-service-application.onrender.com/terms
curl https://web-service-application.onrender.com/

# All should return HTML content, not 404
```

---

## Troubleshooting

### Issue: Still getting 404 on `/pricelist`

**Checklist:**

1. ✅ Is frontend built? Check if `miniapp-frontend/dist` exists
2. ✅ Is `FRONTEND_DIST_PATH` set correctly on Render?
3. ✅ Did you rebuild the service after changing environment variables?
4. ✅ Check Render logs: Does it say "Connected to PostgreSQL"?

**View Logs on Render:**
- Go to your service
- Click "Logs"
- Look for errors during startup

### Issue: Frontend working but API calls fail (CORS)

- Check `CORS_ORIGIN` environment variable
- Ensure backend is responding to OPTIONS requests
- Verify `Authorization` header is being sent with requests

### Issue: Database connection error

- Verify `DATABASE_URL` is correct
- Check if PostgreSQL service is running
- Try connecting with a database client to confirm credentials

---

## File Structure for Render Deployment

```
web-service-app/
├── miniapp-backend/
│   ├── src/
│   ├── server.js
│   └── package.json
├── miniapp-frontend/
│   ├── dist/               (created by `npm run build`)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── .git/
```

---

## Quick Render Setup

1. **Create a new Web Service** in Render
2. **Connect your GitHub repo** (web-service-app)
3. **Set Build Command:**
   ```
   cd miniapp-backend && npm install && cd ../miniapp-frontend && npm install && npm run build && cd ../miniapp-backend
   ```
4. **Set Start Command:**
   ```
   node server.js
   ```
5. **Add Environment Variables** (from .env and backend setup)
6. **Deploy!**

After deployment, navigate to your site and refresh pages to verify no more 404 errors.
