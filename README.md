# 🦷 Hệ Thống Đặt Lịch & Quản Lý Phòng Khám Nha Khoa

Website đặt lịch nha khoa hiện đại với landing page đẹp mắt và hệ thống quản lý hoàn chỉnh.

## 🎯 Tính Năng

### Landing Page (Public)
- ✨ UI/UX hiện đại với Framer Motion
- 📱 Responsive mobile-first
- 🎨 Hero section với gradient đẹp mắt
- 💼 Giới thiệu dịch vụ với card animation
- 👨‍⚕️ Đội ngũ bác sĩ
- ⭐ Feedback khách hàng
- 📅 Form đặt lịch nhanh

### Đặt Lịch (Public)
- Chọn dịch vụ, ngày giờ khám
- Kiểm tra trùng lịch tự động
- Validate form realtime
- Lưu thông tin khách hàng

### Admin Panel
- 🔐 Authentication với JWT
- 📊 Dashboard tổng quan
- 📋 Quản lý lịch hẹn (CRUD, xác nhận, hủy)
- 💉 Quản lý dịch vụ
- 👨‍⚕️ Quản lý bác sĩ
- 🔍 Filter và search

## 🛠️ Stack Công Nghệ

**Frontend:**
- React 18 + TypeScript
- TailwindCSS
- Framer Motion
- React Router v6
- Axios

**Backend:**
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

## 📦 Cài Đặt

### Yêu Cầu
- Node.js >= 18
- PostgreSQL >= 14
- npm hoặc yarn

### 1. Clone & Install

```bash
# Clone project
git clone <repo-url>
cd dental-booking-system

# Install backend
cd backend
npm install

# Install frontend
cd ../frontend
npm install
```

### 2. Setup Database

**Option A: Database Online (Khuyến nghị)**

Xem hướng dẫn chi tiết trong file `DATABASE_SETUP.md`

Nhanh nhất - dùng Neon (miễn phí):
1. Truy cập https://neon.tech
2. Tạo project mới
3. Copy connection string
4. Paste vào `.env`

```bash
cd backend
cp .env.example .env
# Paste DATABASE_URL từ Neon vào file .env

npx prisma migrate dev
npx prisma db seed
```

**Option B: PostgreSQL Local**

```bash
# Cài PostgreSQL trên máy
# Windows: https://www.postgresql.org/download/windows/
# Mac: brew install postgresql

cd backend
cp .env.example .env
# Sửa DATABASE_URL trong .env

npx prisma migrate dev
npx prisma db seed
```

### 3. Chạy Ứng Dụng

```bash
# Terminal 1 - Backend (port 5000)
cd backend
npm run dev

# Terminal 2 - Frontend (port 3000)
cd frontend
npm start
```

Truy cập:
- **Landing Page:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **API:** http://localhost:5000/api

### 4. Tài Khoản Demo

**Admin:**
- Email: `admin@dental.com`
- Password: `admin123`

## 📁 Cấu Trúc Thư Mục

```
dental-booking-system/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── middleware/      # Auth, validation
│   │   ├── routes/          # API routes
│   │   ├── types/           # TypeScript types
│   │   └── server.ts        # Entry point
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.ts          # Seed data
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   │   ├── Landing/     # Landing page sections
    │   │   ├── Booking/     # Booking flow
    │   │   └── Admin/       # Admin panel
    │   ├── services/        # API calls
    │   ├── hooks/           # Custom hooks
    │   ├── types/           # TypeScript types
    │   └── App.tsx
    └── package.json
```

## 🗄️ Database Schema

### Tables
- **users** - Admin accounts
- **doctors** - Bác sĩ
- **services** - Dịch vụ nha khoa
- **appointments** - Lịch hẹn
- **time_slots** - Khung giờ làm việc

## 🚀 Hướng Mở Rộng

### Tính năng có thể thêm:
1. **Thanh toán online**
   - Tích hợp VNPay, MoMo, ZaloPay
   - Đặt cọc trước

2. **Thông báo tự động**
   - SMS qua Twilio/SMSAPI
   - Zalo OA
   - Email reminder

3. **SaaS hóa**
   - Multi-tenant architecture
   - Subscription plans
   - Custom domain cho từng phòng khám

4. **Tính năng nâng cao**
   - Lịch sử khám bệnh
   - Hồ sơ bệnh án điện tử
   - Upload hình ảnh X-quang
   - Video call tư vấn
   - Báo cáo thống kê chi tiết

5. **Mobile App**
   - React Native
   - Push notification

## 📝 License

MIT License - Tự do sử dụng cho mục đích thương mại

## 💡 Support

Để được hỗ trợ, vui lòng tạo issue hoặc liên hệ qua email.
