# ⚡ Quick Start Guide

Hướng dẫn nhanh để chạy project trong 5 phút.

## 🚀 Bắt Đầu Nhanh

### 1. Cài Đặt Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (terminal mới)
cd frontend
npm install
```

### 2. Setup Database

```bash
# Tạo database PostgreSQL
createdb dental_db

# Hoặc dùng psql
psql -U postgres
CREATE DATABASE dental_db;
\q
```

### 3. Cấu Hình Environment

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Sửa DATABASE_URL trong .env
```

**Frontend (.env.local):**
```bash
cd frontend
# File đã có sẵn, không cần sửa
```

### 4. Chạy Migration & Seed

```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

### 5. Start Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## ✅ Kiểm Tra

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Admin: http://localhost:3000/admin/login
  - Email: `admin@dental.com`
  - Password: `admin123`

## 🐛 Lỗi Thường Gặp

**Database connection failed:**
```bash
# Kiểm tra PostgreSQL đang chạy
# Kiểm tra DATABASE_URL trong backend/.env
```

**Port already in use:**
```bash
# Đổi PORT trong backend/.env
# Cập nhật REACT_APP_API_URL trong frontend/.env.local
```

## 📚 Tài Liệu Chi Tiết

- [INSTALLATION.md](INSTALLATION.md) - Hướng dẫn cài đặt chi tiết
- [DATABASE_SETUP.md](DATABASE_SETUP.md) - Cấu hình database
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy production

---

**Cần hỗ trợ? Xem file INSTALLATION.md hoặc liên hệ support.**
