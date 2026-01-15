# 🚀 Hướng Dẫn Deploy

## Deploy Backend

### Option 1: Railway (Khuyến nghị)

1. Tạo tài khoản tại https://railway.app
2. Tạo PostgreSQL database
3. Deploy backend:
   ```bash
   # Trong thư mục backend
   railway login
   railway init
   railway up
   ```
4. Set environment variables trên Railway dashboard
5. Chạy migration:
   ```bash
   railway run npx prisma migrate deploy
   railway run npx prisma db seed
   ```

### Option 2: Heroku

1. Tạo app:
   ```bash
   heroku create dental-booking-api
   heroku addons:create heroku-postgresql:mini
   ```

2. Deploy:
   ```bash
   cd backend
   git init
   heroku git:remote -a dental-booking-api
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

3. Setup:
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   heroku run npx prisma migrate deploy
   heroku run npx prisma db seed
   ```

### Option 3: VPS (DigitalOcean, AWS, etc.)

1. Setup server với Node.js + PostgreSQL
2. Clone code:
   ```bash
   git clone <repo-url>
   cd backend
   npm install
   ```

3. Setup environment:
   ```bash
   cp .env.example .env
   # Sửa DATABASE_URL và các biến khác
   ```

4. Run migration:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

5. Start với PM2:
   ```bash
   npm install -g pm2
   npm run build
   pm2 start dist/server.js --name dental-api
   pm2 startup
   pm2 save
   ```

6. Setup Nginx reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Deploy Frontend

### Option 1: Vercel (Khuyến nghị)

1. Tạo tài khoản tại https://vercel.com
2. Import project từ Git
3. Set build settings:
   - Framework: Create React App
   - Root Directory: frontend
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Set environment variables:
   - `REACT_APP_API_URL`: URL backend của bạn
5. Deploy!

### Option 2: Netlify

1. Tạo tài khoản tại https://netlify.com
2. Drag & drop thư mục `frontend/build` sau khi build
3. Hoặc connect với Git repository
4. Set environment variables trong Netlify dashboard

### Option 3: VPS

1. Build frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Copy build folder lên server
3. Setup Nginx:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/dental-booking/build;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

## Database Migration

Khi có thay đổi schema:

```bash
# Development
npx prisma migrate dev --name description

# Production
npx prisma migrate deploy
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=production
FRONTEND_URL="https://yourdomain.com"
```

### Frontend (.env)
```
REACT_APP_API_URL=https://api.yourdomain.com/api
```

## SSL Certificate

Sử dụng Let's Encrypt (miễn phí):

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Monitoring & Logs

### Backend logs với PM2:
```bash
pm2 logs dental-api
pm2 monit
```

### Database backup:
```bash
# PostgreSQL
pg_dump -U username dbname > backup.sql

# Restore
psql -U username dbname < backup.sql
```

## Performance Tips

1. **Enable gzip compression** trong Nginx
2. **CDN** cho static assets (Cloudflare)
3. **Database indexing** cho các query thường dùng
4. **Caching** với Redis (optional)
5. **Rate limiting** để tránh abuse

## Security Checklist

- ✅ HTTPS enabled
- ✅ Environment variables secured
- ✅ CORS configured properly
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS protection
- ✅ Rate limiting
- ✅ Input validation
- ✅ JWT token expiration
- ✅ Password hashing (bcrypt)

## Troubleshooting

### Backend không kết nối được database
- Kiểm tra DATABASE_URL
- Kiểm tra firewall/security group
- Verify PostgreSQL đang chạy

### Frontend không gọi được API
- Kiểm tra CORS settings
- Verify REACT_APP_API_URL
- Check network tab trong browser

### Migration failed
- Backup database trước
- Kiểm tra schema conflicts
- Reset database nếu cần (development only)

## Support

Nếu gặp vấn đề, tạo issue trên GitHub hoặc liên hệ support.
