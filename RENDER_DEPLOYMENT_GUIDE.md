# Render Deployment Guide

## Problem: 404 on `/pricelist`, `/home`, and other routes during refresh

### Root Cause
The frontend build (`miniapp-frontend/dist`) doesn't exist on Render. When you refresh, the server tries to serve static files but can't find them, resulting in 404 errors.

### Solution Overview
1. Set proper build and start commands on Render
2. Ensure frontend is built BEFORE the backend starts
3. Verify build path is correct

---

## Step-by-Step Deployment

### 1. Build Frontend Locally (For Testing)

```bash
cd miniapp-frontend
npm install
npm run build
```

This creates a `dist/` folder in `miniapp-frontend/`.

### 2. Render Deployment - CRITICAL SETTINGS

Go to your Render web service dashboard and set these EXACTLY:

#### Build Command (MOST IMPORTANT)
```bash
cd miniapp-backend && npm install && cd ../miniapp-frontend && npm install && npm run build && cd ../miniapp-backend
```

**What this does:**
1. Installs backend dependencies
2. Installs frontend dependencies  
3. **Builds the frontend to `miniapp-frontend/dist`**
4. Returns to backend directory for start command

#### Start Command
```bash
node server.js
```

#### Environment Variables

Add these in Render Dashboard → Environment:

```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@your-render-host.postgres.render.com:5432/your_db
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=https://web-service-application.onrender.com
FRONTEND_DIST_PATH=../miniapp-frontend/dist
RATE_LIMIT_MAX=120
```

---

## After Deployment

### 1. Clear Render Cache
- Go to your Render service
- Click "Settings" → "Clear Build Cache"
- Manually trigger a deploy

### 2. Monitor Logs
- Click "Logs" tab
- Look for these messages:
  ```
  ✅ Frontend build path: <path>/miniapp-frontend/dist
  ✅ Frontend build exists: true
  Connected to PostgreSQL database
  Server is running on 5000
  ```

### 3. Test in Browser

After deploy succeeds, visit:

```
https://web-service-application.onrender.com/
```

Refresh the page several times. You should NOT see 404 errors.

Test different routes:
- `https://web-service-application.onrender.com/` (redirects to /login)
- `https://web-service-application.onrender.com/login` (loads)
- `https://web-service-application.onrender.com/terms` (loads)

---

## Troubleshooting

### Still getting 404 on `/home` or `/pricelist`?

#### Check 1: Frontend Build Path
Verify the build command includes `npm run build`:
```bash
# ✅ CORRECT
cd ../miniapp-frontend && npm install && npm run build && cd ../miniapp-backend

# ❌ WRONG
cd ../miniapp-backend  # builds only backend, not frontend!
```

#### Check 2: Build Cache
If you changed the build command, clear Render's cache:
1. Go to Render Dashboard
2. Settings → "Clear Build Cache"
3. Redeploy

#### Check 3: Log Output
In Render Logs, look for:
```
Frontend build path: /path/to/miniapp-frontend/dist
Frontend build exists: true
```

If it says `false`, the build didn't run. Check the full build output.

#### Check 4: Test Build Locally
```bash
# Simulate Render's build process locally
cd miniapp-backend
rm -rf ../miniapp-frontend/dist  # Clear previous build
npm install
cd ../miniapp-frontend
npm install && npm run build
cd ../miniapp-backend
npm start
```

Navigate to `http://localhost:5000` and refresh. Should work.

---

## File Structure on Render (After Successful Deploy)

```
/opt/render/project/src/   (Render's working directory)
├── miniapp-backend/
│   ├── src/
│   ├── server.js
│   ├── package.json
│   └── node_modules/
│
├── miniapp-frontend/
│   ├── src/
│   ├── dist/            ✅ MUST EXIST after build
│   │   ├── index.html
│   │   ├── assets/
│   │   └── ...
│   ├── package.json
│   └── node_modules/
```

---

## Common Mistakes

| ❌ WRONG | ✅ CORRECT |
|---------|-----------|
| Build Command: `cd miniapp-backend && npm install` | Build Command: `cd miniapp-backend && npm install && cd ../miniapp-frontend && npm install && npm run build && cd ../miniapp-backend` |
| No `FRONTEND_DIST_PATH` env variable | `FRONTEND_DIST_PATH=../miniapp-frontend/dist` |
| Forgot to rebuild after environment changes | Click "Clear Build Cache" then redeploy |
| Only deployed backend folder | Push entire repo with both folders |

---

## Quick Render Setup Checklist

- [ ] Repository pushed to GitHub (both `miniapp-backend/` and `miniapp-frontend/` folders)
- [ ] Render web service created
- [ ] Build Command set correctly (includes `npm run build`)
- [ ] Start Command: `node server.js`
- [ ] All environment variables added (especially `DATABASE_URL`)
- [ ] Build Cache cleared
- [ ] Manually redeploy triggered
- [ ] Logs show "Frontend build exists: true"
- [ ] Test root URL `/` loads without 404
- [ ] Test refresh on different routes

If all above is done and you still see 404s, **share the Render build log output** and I can help debug further!
