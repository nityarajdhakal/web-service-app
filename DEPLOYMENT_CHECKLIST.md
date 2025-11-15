# Deployment Checklist

## Backend (Render)

### Environment Variables
Make sure these are set in your Render web service dashboard:

```
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://user:password@your-render-host.postgres.render.com:5432/your_db
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=https://web-service-application.onrender.com
RATE_LIMIT_MAX=120
```

### Verify Routes
Your API routes should respond to:
- `POST /api/auth/login` - Public route for login
- `GET /api/translations?page=login&lang=en` - Public route for translations
- `GET /api/products` - Protected route (requires Authorization header)
- `PUT /api/products/:id` - Protected route (requires Authorization header)

### Testing
Test your backend routes:
```bash
# Test health check
curl https://web-service-application.onrender.com

# Test login endpoint
curl -X POST https://web-service-application.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test translations
curl "https://web-service-application.onrender.com/api/translations?page=login&lang=en"
```

## Frontend Configuration

### .env file
```
VITE_API_BASE_URL=https://web-service-application.onrender.com/api
```

### Verify API Calls
All fetch calls should use the environment variable:
```javascript
import API_BASE_URL from "../config/api";

fetch(`${API_BASE_URL}/auth/login`, {...})
```

## Common Issues & Solutions

### Issue: 404 Not Found
- **Cause**: Route doesn't exist or endpoint is mispelled
- **Fix**: Check route names match exactly (case-sensitive)
- **Solution**: Test with curl or Postman first

### Issue: CORS Error
- **Cause**: Backend doesn't allow requests from frontend origin
- **Fix**: Ensure CORS_ORIGIN is set to your frontend URL
- **Solution**: Check browser console for exact error message

### Issue: 401 Unauthorized
- **Cause**: Missing or invalid JWT token
- **Fix**: Ensure you're sending Authorization header with Bearer token
- **Solution**: Test login first to get valid token

### Issue: Database Connection Error
- **Cause**: DATABASE_URL is invalid or database is down
- **Fix**: Verify DATABASE_URL in Render environment variables
- **Solution**: Check Render PostgreSQL service status
