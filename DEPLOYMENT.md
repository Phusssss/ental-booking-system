# 🚀 Hướng Dẫn Deploy Production

Hướng dẫn deploy hệ thống lên các nền tảng hosting miễn phí và trả phí.

## 📋 Tổng Quan

Hệ thống gồm 2 phần cần deploy:
1. **Backend** (Node.js + PostgreSQL)
2. **Frontend** (React Static Site)

## 🆓 Deploy Miễn Phí

### Backend: Render.com

**Bước 1: Tạo Database**
1. Đăng ký tại [Render.com](https://render.com)
2. Dashboard → New → PostgreSQL
3. Chọn Free plan
4. Lưu lại `Internal Database URL`

**Bước 2: Deploy Backend**
1. Dashboard → New → Web Service
2. Connect GitHub repository
3. Cấu hình:
   - **Name:** dental-backend
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command:** `npm start`
   - **Plan:** Free

4. Environment Variables:
   ```
   DATABASE_URL=<Internal Database URL từ bước 1>
   JWT_SECRET=<random-secret-key>
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   FRONTEND_URL=<frontend-url-sau-khi-deploy>
   ```

5. Deploy và đợi hoàn thành

**Bước 3: Seed Database**
```bash
# Chạy từ local
DATABASE_URL="<External Database URL>" npx prisma db seed
```

### Frontend: Vercel

**Bước 1: Deploy**
1. Đăng ký tại [Vercel.com](https://vercel.com)
2. Import GitHub repository
3. Cấu hình:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

**Bước 2: Environment Variables**
```
REACT_APP_API_URL=<backend-url-từ-render>/api
DISABLE_ESLINT_PLUGIN=true
CI=false
```

**Bước 3: Deploy**
- Click Deploy
- Đợi build hoàn thành

**Bước 4: Cập nhật CORS**
- Quay lại Render backend
- Cập nhật `FRONTEND_URL` với URL Vercel vừa tạo
- Redeploy backend

### Các Nền Tảng Khác

#### Backend Alternatives
- **Railway.app** - Tương tự Render
- **Fly.io** - Có free tier
- **Heroku** - Trả phí nhưng ổn định

#### Frontend Alternatives
- **Netlify** - Tương tự Vercel
- **Cloudflare Pages** - Nhanh, miễn phí
- **GitHub Pages** - Miễn phí cho static site

## 💰 Deploy Trả Phí (Khuyến Nghị)

### VPS (DigitalOcean, Linode, Vultr)

**Yêu cầu:**
- Ubuntu 20.04+
- 2GB RAM
- 1 CPU
- 25GB Storage

**Cài đặt:**

```bash
# 1. Cài Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Cài PostgreSQL
sudo apt install postgresql postgresql-contrib

# 3. Cài Nginx
sudo apt install nginx

# 4. Clone code
git clone <your-repo>
cd dental-booking

# 5. Setup Backend
cd backend
npm install
npx prisma migrate deploy
npx prisma db seed
npm run build

# 6. Setup PM2
sudo npm install -g pm2
pm2 start dist/server.js --name dental-backend
pm2 startup
pm2 save

# 7. Setup Frontend
cd ../frontend
npm install
npm run build

# 8. Cấu hình Nginx
sudo nano /etc/nginx/sites-available/dental
```

**Nginx Config:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /path/to/frontend/build;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/dental /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# SSL với Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## 🔒 Bảo Mật Production

### Backend
1. Đổi `JWT_SECRET` thành chuỗi ngẫu nhiên mạnh
2. Đổi mật khẩu admin mặc định
3. Bật HTTPS
4. Giới hạn rate limiting
5. Cấu hình CORS chính xác

### Database
1. Sử dụng connection pooling
2. Backup định kỳ
3. Không expose port ra ngoài
4. Sử dụng SSL connection

### Frontend
1. Không hardcode API keys
2. Sử dụng environment variables
3. Enable HTTPS
4. Minify và optimize assets

## 📊 Monitoring

### Free Tools
- **Uptime Robot** - Monitor uptime
- **Sentry** - Error tracking
- **Google Analytics** - User analytics

### Paid Tools
- **New Relic** - Full monitoring
- **DataDog** - Infrastructure monitoring
- **LogRocket** - Session replay

## 🔄 CI/CD

### GitHub Actions

Tạo file `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: curl ${{ secrets.RENDER_DEPLOY_HOOK }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 🐛 Troubleshooting

### Backend không start
- Kiểm tra logs: `pm2 logs dental-backend`
- Kiểm tra database connection
- Kiểm tra environment variables

### Frontend không load API
- Kiểm tra CORS settings
- Kiểm tra `REACT_APP_API_URL`
- Kiểm tra network tab trong browser

### Database migration failed
- Chạy manual: `npx prisma migrate deploy`
- Kiểm tra DATABASE_URL
- Kiểm tra database có tồn tại không

## 📞 Cần Hỗ Trợ?

Nếu gặp vấn đề khi deploy, liên hệ support với thông tin:
- Platform đang dùng (Render, Vercel, VPS, etc.)
- Error logs
- Screenshots

---

**Chúc bạn deploy thành công! 🎉**
