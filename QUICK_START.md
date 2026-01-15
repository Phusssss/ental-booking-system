# ⚡ Quick Start - 5 Phút Setup

Hướng dẫn nhanh nhất để chạy dự án.

## Bước 1: Clone & Install (2 phút)

```bash
# Clone project
git clone <repo-url>
cd dental-booking-system

# Install backend
cd backend
npm install

# Install frontend (terminal mới)
cd ../frontend
npm install
```

## Bước 2: Setup Database Online (2 phút)

### Dùng Neon (Miễn phí, nhanh nhất):

1. Mở https://neon.tech
2. Đăng ký với GitHub/Google
3. Tạo project mới: `dental-booking`
4. Copy connection string (dạng: `postgresql://...`)
5. Tạo file `.env` trong thư mục `backend`:

```bash
cd backend
cp .env.example .env
```

6. Mở file `.env` và paste connection string:

```env
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/dental_booking?sslmode=require"
JWT_SECRET="my-super-secret-key-2024"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"
```

7. Chạy migration:

```bash
npx prisma migrate dev
npx prisma db seed
```

✅ Xong! Database đã sẵn sàng với data mẫu.

## Bước 3: Chạy Ứng Dụng (1 phút)

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Thấy: `🚀 Server đang chạy tại http://localhost:5000`

### Terminal 2 - Frontend:
```bash
cd frontend
cp .env.example .env
npm start
```

Tự động mở: `http://localhost:3000`

## Bước 4: Test Thử

### Landing Page:
- Mở http://localhost:3000
- Scroll xem các section
- Thử đặt lịch khám

### Admin Panel:
- Mở http://localhost:3000/admin
- Login:
  - Email: `admin@dental.com`
  - Password: `admin123`
- Xem dashboard, quản lý lịch hẹn

## 🎉 Xong!

Toàn bộ hệ thống đã chạy:
- ✅ Backend API: http://localhost:5000
- ✅ Frontend: http://localhost:3000
- ✅ Database: Neon (online)
- ✅ Admin: admin@dental.com / admin123

## Troubleshooting

### Backend không chạy:
```bash
# Kiểm tra DATABASE_URL
cd backend
npx prisma studio
# Nếu mở được = database OK
```

### Frontend không gọi được API:
```bash
# Kiểm tra backend đang chạy
curl http://localhost:5000/health
# Phải trả về: {"success":true,...}
```

### Database lỗi:
```bash
# Reset database
cd backend
npx prisma migrate reset
npx prisma db seed
```

## Next Steps

1. **Customize:**
   - Sửa tên phòng khám trong `frontend/src/components/Navbar.tsx`
   - Đổi màu sắc trong `frontend/tailwind.config.js`
   - Thêm dịch vụ mới trong Admin panel

2. **Deploy:**
   - Xem file `DEPLOYMENT.md`
   - Frontend → Vercel (miễn phí)
   - Backend → Railway (miễn phí)

3. **Mở rộng:**
   - Thêm thanh toán online
   - SMS notification
   - Email reminder
   - Mobile app

Happy coding! 🚀
