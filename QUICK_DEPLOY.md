# 🚀 Deploy Nhanh - 15 phút

## Bước 1: Chuẩn bị (2 phút)

```bash
# Commit code lên GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Bước 2: Deploy Backend lên Render (5 phút)

1. Truy cập: https://render.com
2. Sign up với GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect repository của bạn
5. Cấu hình:
   - **Name:** `dental-booking-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npx prisma generate`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

6. Click **"Advanced"** → Add Environment Variables:
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_9yo0TiAKzCLH@ep-tiny-wave-a1oxvdaw-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   JWT_SECRET=dental-booking-secret-key-2024
   NODE_ENV=production
   ```

7. Click **"Create Web Service"**
8. Đợi 3-5 phút để build
9. Copy URL backend (ví dụ: `https://dental-booking-backend.onrender.com`)

## Bước 3: Chạy Migration (2 phút)

Sau khi backend deploy xong:

1. Vào Render Dashboard → Service của bạn
2. Click tab **"Shell"** (bên trái)
3. Chạy lệnh:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```
4. Đợi hoàn thành

## Bước 4: Deploy Frontend lên Vercel (5 phút)

```bash
# Cài Vercel CLI (nếu chưa có)
npm install -g vercel

# Login
vercel login

# Deploy frontend
cd frontend
vercel
```

Làm theo hướng dẫn:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → dental-booking
- **Directory?** → `./`
- **Override settings?** → No

## Bước 5: Cấu hình Environment Variables (1 phút)

1. Vào Vercel Dashboard: https://vercel.com/dashboard
2. Click vào project **"dental-booking"**
3. Settings → **Environment Variables**
4. Thêm:
   ```
   Name: REACT_APP_API_URL
   Value: https://dental-booking-backend.onrender.com/api
   ```
5. Click **"Save"**

## Bước 6: Redeploy Frontend

```bash
vercel --prod
```

## ✅ Xong!

**URLs của bạn:**
- Frontend: `https://dental-booking-xxx.vercel.app`
- Backend: `https://dental-booking-backend.onrender.com`
- Admin: `https://dental-booking-xxx.vercel.app/admin/login`

**Login admin:**
- Email: `admin@dental.com`
- Password: `admin123`

---

## 🔧 Nếu có lỗi

### Backend không chạy được

1. Vào Render → Logs
2. Kiểm tra lỗi
3. Thường là:
   - DATABASE_URL sai → Check lại connection string
   - Build failed → Check `package.json` scripts

### Frontend không connect được backend

1. Kiểm tra REACT_APP_API_URL có đúng không
2. Kiểm tra backend có online không (mở URL trong browser)
3. Redeploy frontend: `vercel --prod`

### CORS Error

Thêm frontend URL vào backend CORS config:

File `backend/src/server.ts`:
```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://dental-booking-xxx.vercel.app' // Thêm URL frontend
  ],
  credentials: true
}));
```

Commit và push lại:
```bash
git add .
git commit -m "Fix CORS"
git push
```

Render sẽ tự động redeploy.

---

## 📱 Test sau khi deploy

1. ✅ Mở landing page
2. ✅ Test đặt lịch
3. ✅ Login admin
4. ✅ Test CRUD dịch vụ
5. ✅ Test CRUD bác sĩ
6. ✅ Test quản lý lịch hẹn
7. ✅ Test trên mobile

---

## 💡 Tips

- **Render Free:** Backend sẽ sleep sau 15 phút không dùng. Lần đầu truy cập sẽ mất ~30s để wake up.
- **Vercel:** Unlimited bandwidth, deploy tự động khi push code.
- **Custom Domain:** Có thể thêm domain riêng miễn phí trên cả Vercel và Render.

---

## 🎉 Chúc mừng!

Website của bạn đã online! Share link với bạn bè và khách hàng nhé! 🚀
