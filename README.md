# 🦷 Dental Booking System - Hệ Thống Đặt Lịch Nha Khoa

Hệ thống đặt lịch khám nha khoa hoàn chỉnh với giao diện hiện đại, quản trị viên mạnh mẽ và tích hợp thanh toán.

## ✨ Tính Năng Chính

### 🎯 Dành cho Khách Hàng
- ✅ Đặt lịch khám online dễ dàng
- ✅ Xem danh sách bác sĩ và dịch vụ
- ✅ Chọn khung giờ phù hợp
- ✅ Giao diện responsive, thân thiện

### 👨‍💼 Dành cho Quản Trị Viên
- ✅ Dashboard thống kê tổng quan
- ✅ Quản lý lịch hẹn (xem, sửa, xóa, cập nhật trạng thái)
- ✅ Quản lý bác sĩ (thêm, sửa, xóa, bật/tắt)
- ✅ Quản lý dịch vụ (thêm, sửa, xóa, bật/tắt)
- ✅ Xác thực JWT bảo mật

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

### Android (Optional)
- Kotlin
- Android SDK

## 📋 Yêu Cầu Hệ Thống

- Node.js 16+ và npm
- PostgreSQL 12+
- Git

## � Hướng Dẫn Cài Đặt

### 1️⃣ Clone Project

```bash
git clone <repository-url>
cd dental-booking
```

### 2️⃣ Cài Đặt Backend

```bash
cd backend
npm install
```

**Cấu hình Database:**
- Tạo database PostgreSQL mới
- Copy file `.env.example` thành `.env`
- Cập nhật `DATABASE_URL` trong file `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dental_db"
JWT_SECRET="your-secret-key-here"
```

**Chạy Migration và Seed:**

```bash
npx prisma migrate dev
npx prisma db seed
```

**Khởi động Backend:**

```bash
npm run dev
```

Backend sẽ chạy tại: `http://localhost:5000`

### 3️⃣ Cài Đặt Frontend

```bash
cd frontend
npm install
```

**Cấu hình:**
- File `.env.local` đã được cấu hình sẵn cho local development
- Không cần thay đổi gì nếu backend chạy ở port 5000

**Khởi động Frontend:**

```bash
npm start
```

Frontend sẽ chạy tại: `http://localhost:3000`

## 👤 Tài Khoản Admin Mặc Định

Sau khi seed database, sử dụng tài khoản sau để đăng nhập:

```
Email: admin@dental.com
Password: admin123
```

**⚠️ LƯU Ý:** Đổi mật khẩu ngay sau lần đăng nhập đầu tiên!

## 📁 Cấu Trúc Thư Mục

```
dental-booking/
├── backend/              # Node.js Backend
│   ├── src/
│   │   ├── controllers/  # API Controllers
│   │   ├── middleware/   # Auth Middleware
│   │   ├── routes/       # API Routes
│   │   └── server.ts     # Entry Point
│   ├── prisma/
│   │   ├── schema.prisma # Database Schema
│   │   └── seed.ts       # Seed Data
│   └── package.json
│
├── frontend/             # React Frontend
│   ├── src/
│   │   ├── components/   # Reusable Components
│   │   ├── pages/        # Page Components
│   │   ├── services/     # API Services
│   │   └── types/        # TypeScript Types
│   └── package.json
│
└── app/                  # Android App (Optional)
```

## 🌐 Deploy Lên Production

### Backend (Render.com)
1. Tạo tài khoản tại [Render.com](https://render.com)
2. Tạo PostgreSQL Database mới
3. Tạo Web Service mới, chọn repository
4. Cấu hình:
   - Build Command: `cd backend && npm install && npx prisma generate`
   - Start Command: `cd backend && npm start`
   - Environment Variables: Thêm `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`

### Frontend (Vercel)
1. Tạo tài khoản tại [Vercel.com](https://vercel.com)
2. Import repository
3. Cấu hình:
   - Root Directory: `frontend`
   - Environment Variables: `REACT_APP_API_URL=<backend-url>`
4. Deploy

Chi tiết xem file `DEPLOYMENT_FREE.md`

## � API Documentation

### Public Endpoints
- `GET /api/services` - Lấy danh sách dịch vụ
- `GET /api/doctors` - Lấy danh sách bác sĩ
- `GET /api/time-slots` - Lấy khung giờ khám
- `POST /api/appointments` - Đặt lịch hẹn

### Admin Endpoints (Yêu cầu JWT Token)
- `POST /api/auth/login` - Đăng nhập admin
- `GET /api/admin/dashboard` - Thống kê dashboard
- `GET /api/admin/appointments` - Quản lý lịch hẹn
- `POST /api/admin/doctors` - Thêm bác sĩ
- `POST /api/admin/services` - Thêm dịch vụ

## 🔧 Scripts Hữu Ích

### Backend
```bash
npm run dev          # Chạy development mode
npm start            # Chạy production mode
npm run build        # Build TypeScript
npx prisma studio    # Mở Prisma Studio (GUI Database)
npx prisma migrate dev  # Tạo migration mới
```

### Frontend
```bash
npm start            # Chạy development mode
npm run build        # Build production
npm test             # Chạy tests
```

## 🐛 Troubleshooting

### Lỗi kết nối Database
- Kiểm tra PostgreSQL đã chạy chưa
- Kiểm tra `DATABASE_URL` trong `.env` đúng chưa
- Chạy lại migration: `npx prisma migrate reset`

### Lỗi CORS
- Kiểm tra `FRONTEND_URL` trong backend `.env`
- Kiểm tra `REACT_APP_API_URL` trong frontend `.env.local`

### Port đã được sử dụng
- Backend: Đổi `PORT` trong `.env`
- Frontend: Chạy `PORT=3001 npm start`

## 📞 Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra file `QUICK_START.md` để xem hướng dẫn nhanh
2. Xem file `DATABASE_SETUP.md` cho vấn đề về database
3. Xem file `DEPLOYMENT_FREE.md` cho vấn đề deploy

## 📄 License

Sản phẩm này được bán với giấy phép sử dụng thương mại. Vui lòng không chia sẻ source code.

---

**Made with ❤️ for Dental Clinics**
