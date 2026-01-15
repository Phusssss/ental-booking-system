# 🚀 Deploy lên Hosting Free

## 📋 Tổng quan

**Stack của bạn:**
- Frontend: React + TypeScript
- Backend: Node.js + Express + Prisma
- Database: PostgreSQL (Neon)

**Hosting free tốt nhất:**
- Frontend: **Vercel** hoặc **Netlify**
- Backend: **Render** hoặc **Railway**
- Database: **Neon** (đã có rồi ✅)

---

## 🎯 OPTION 1: Vercel + Render (Khuyến nghị)

### A. Deploy Frontend lên Vercel

**1. Chuẩn bị Frontend**

Tạo file `frontend/.env.production`:
```env
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

Cập nhật `frontend/package.json`:
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

**2. Deploy lên Vercel**

```bash
# Cài Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy frontend
cd frontend
vercel

# Làm theo hướng dẫn:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? dental-booking-frontend
# - Directory? ./
# - Override settings? No
```

**3. Cấu hình Vercel**

Tạo file `frontend/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### B. Deploy Backend lên Render

**1. Chuẩn bị Backend**

Tạo file `backend/render.yaml`:
```yaml
services:
  - type: web
    name: dental-booking-backend
    env: node
    buildCommand: npm install && npx prisma generate && npm run build
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: NODE_ENV
        value: production
```

Cập nhật `backend/package.json`:
```json
{
  "scripts": {
    "start": "node dist/server.js",
    "dev": "ts-node src/server.ts",
    "build": "tsc",
    "seed": "ts-node prisma/seed.ts"
  }
}
```

Tạo file `backend/tsconfig.json` (nếu chưa có):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**2. Deploy lên Render**

1. Truy cập: https://render.com
2. Sign up (dùng GitHub)
3. Click "New +" → "Web Service"
4. Connect GitHub repository
5. Cấu hình:
   - Name: `dental-booking-backend`
   - Environment: `Node`
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Start Command: `npm start`
   - Instance Type: `Free`

6. Thêm Environment Variables:
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_9yo0TiAKzCLH@ep-tiny-wave-a1oxvdaw-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   JWT_SECRET=your-super-secret-key-change-this
   NODE_ENV=production
   PORT=10000
   ```

7. Click "Create Web Service"

**3. Chạy Migration**

Sau khi deploy xong, vào Render Dashboard:
1. Click vào service
2. Tab "Shell"
3. Chạy:
```bash
npx prisma migrate deploy
npx prisma db seed
```

### C. Cập nhật Frontend với Backend URL

1. Vào Vercel Dashboard
2. Project Settings → Environment Variables
3. Thêm:
   ```
   REACT_APP_API_URL=https://dental-booking-backend.onrender.com/api
   ```
4. Redeploy: `vercel --prod`

---

## 🎯 OPTION 2: Netlify + Railway

### A. Deploy Frontend lên Netlify

**1. Chuẩn bị**

Tạo file `frontend/netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**2. Deploy**

```bash
# Cài Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd frontend
netlify deploy --prod

# Làm theo hướng dẫn
```

### B. Deploy Backend lên Railway

1. Truy cập: https://railway.app
2. Sign up với GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Chọn repository
5. Thêm Environment Variables:
   ```
   DATABASE_URL=your-neon-url
   JWT_SECRET=your-secret
   NODE_ENV=production
   ```
6. Railway tự động detect và deploy

---

## 🎯 OPTION 3: Vercel cho cả Frontend + Backend (Serverless)

**Ưu điểm:** Đơn giản nhất, 1 nơi duy nhất
**Nhược điểm:** Backend phải chuyển sang serverless functions

Tạo file `vercel.json` ở root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/build"
      }
    },
    {
      "src": "backend/src/server.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/src/server.ts"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/build/$1"
    }
  ]
}
```

---

## 📝 Checklist Deploy

### Trước khi deploy:

- [ ] Database Neon đã setup xong
- [ ] Đã test local: frontend + backend + database
- [ ] Đã commit code lên GitHub
- [ ] Đã tạo `.env.example` files
- [ ] Đã thêm `.env` vào `.gitignore`

### Frontend:

- [ ] Cập nhật `REACT_APP_API_URL` trong `.env.production`
- [ ] Test build: `npm run build`
- [ ] Deploy lên Vercel/Netlify
- [ ] Kiểm tra domain

### Backend:

- [ ] Cập nhật `DATABASE_URL` với Neon connection string
- [ ] Thêm `JWT_SECRET`
- [ ] Deploy lên Render/Railway
- [ ] Chạy migration: `npx prisma migrate deploy`
- [ ] Chạy seed: `npx prisma db seed`
- [ ] Test API endpoints

### Sau deploy:

- [ ] Test đăng nhập admin
- [ ] Test đặt lịch
- [ ] Test CRUD dịch vụ, bác sĩ
- [ ] Test responsive mobile
- [ ] Cập nhật thông tin liên hệ (phone, email, địa chỉ)

---

## 🔧 Troubleshooting

### Lỗi: CORS

Thêm vào `backend/src/server.ts`:
```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app'
  ],
  credentials: true
}));
```

### Lỗi: Database connection

Kiểm tra:
1. DATABASE_URL có đúng không
2. Neon database có online không
3. IP whitelist (Neon cho phép all IPs)

### Lỗi: Build failed

```bash
# Clear cache và rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Lỗi: API 404

Kiểm tra:
1. Backend URL có đúng không
2. CORS có được config không
3. Routes có đúng không

---

## 💰 Chi phí

**Hoàn toàn FREE:**
- Vercel: Free tier (100GB bandwidth/month)
- Render: Free tier (750 hours/month)
- Netlify: Free tier (100GB bandwidth/month)
- Railway: $5 credit/month (free)
- Neon: Free tier (0.5GB storage)

**Giới hạn:**
- Render free: Sleep sau 15 phút không dùng (cold start ~30s)
- Vercel: 100 deployments/day
- Neon: 1 project, 10 branches

---

## 🎉 Kết quả

Sau khi deploy xong, bạn sẽ có:

- Frontend: `https://dental-booking.vercel.app`
- Backend: `https://dental-booking-backend.onrender.com`
- Database: Neon PostgreSQL (đã có)

**Demo URLs:**
- Landing: `https://dental-booking.vercel.app`
- Admin: `https://dental-booking.vercel.app/admin/login`

---

## 📚 Tài liệu tham khảo

- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- Netlify: https://docs.netlify.com
- Railway: https://docs.railway.app
- Neon: https://neon.tech/docs
