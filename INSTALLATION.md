# 📦 Hướng Dẫn Cài Đặt Chi Tiết

## 📋 Chuẩn Bị

### Phần Mềm Cần Thiết

1. **Node.js** (phiên bản 16 trở lên)
   - Tải tại: https://nodejs.org/
   - Kiểm tra: `node --version` và `npm --version`

2. **PostgreSQL** (phiên bản 12 trở lên)
   - Tải tại: https://www.postgresql.org/download/
   - Hoặc dùng Docker: `docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres`

3. **Git**
   - Tải tại: https://git-scm.com/

## 🔧 Cài Đặt Từng Bước

### Bước 1: Giải Nén Source Code

```bash
# Giải nén file zip đã tải về
unzip dental-booking.zip
cd dental-booking
```

### Bước 2: Cài Đặt Backend

```bash
cd backend
npm install
```

**Cấu hình Database:**

1. Mở PostgreSQL và tạo database mới:
```sql
CREATE DATABASE dental_db;
```

2. Copy file cấu hình mẫu:
```bash
cp .env.example .env
```

3. Mở file `.env` và cập nhật thông tin:
```env
# Thay đổi thông tin kết nối database
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/dental_db"

# Thay đổi JWT secret (dùng chuỗi ngẫu nhiên)
JWT_SECRET="your-random-secret-key-here-change-this"

# Cấu hình server
PORT=5000
NODE_ENV=development

# URL của frontend (để CORS hoạt động)
FRONTEND_URL="http://localhost:3000"
```

**Chạy Migration:**

```bash
# Tạo bảng trong database
npx prisma migrate dev

# Thêm dữ liệu mẫu (bác sĩ, dịch vụ, admin)
npx prisma db seed
```

**Khởi động Backend:**

```bash
npm run dev
```

✅ Backend đang chạy tại: http://localhost:5000

### Bước 3: Cài Đặt Frontend

Mở terminal mới:

```bash
cd frontend
npm install
```

**Cấu hình:**

File `.env.local` đã được cấu hình sẵn:
```env
REACT_APP_API_URL=http://localhost:5000/api
DISABLE_ESLINT_PLUGIN=true
```

**Khởi động Frontend:**

```bash
npm start
```

✅ Frontend đang chạy tại: http://localhost:3000

### Bước 4: Kiểm Tra Hoạt Động

1. Mở trình duyệt: http://localhost:3000
2. Trang chủ hiển thị danh sách dịch vụ và bác sĩ
3. Thử đặt lịch hẹn
4. Đăng nhập admin tại: http://localhost:3000/admin/login
   - Email: `admin@dental.com`
   - Password: `admin123`

## 🎯 Tài Khoản Mặc Định

### Admin
```
Email: admin@dental.com
Password: admin123
```

### Dữ Liệu Mẫu
- 3 bác sĩ
- 6 dịch vụ nha khoa
- Khung giờ từ 8:00 - 17:00

## 🔍 Kiểm Tra API

Test backend hoạt động:

```bash
# Lấy danh sách dịch vụ
curl http://localhost:5000/api/services

# Lấy danh sách bác sĩ
curl http://localhost:5000/api/doctors

# Lấy khung giờ
curl http://localhost:5000/api/time-slots
```

## 🐛 Xử Lý Lỗi Thường Gặp

### Lỗi: "Cannot connect to database"

**Nguyên nhân:** PostgreSQL chưa chạy hoặc thông tin kết nối sai

**Giải pháp:**
```bash
# Kiểm tra PostgreSQL đang chạy
# Windows: Mở Services, tìm PostgreSQL
# Mac: brew services list
# Linux: sudo systemctl status postgresql

# Kiểm tra kết nối
psql -U postgres -d dental_db
```

### Lỗi: "Port 5000 already in use"

**Giải pháp:**
```bash
# Đổi port trong backend/.env
PORT=5001

# Cập nhật frontend/.env.local
REACT_APP_API_URL=http://localhost:5001/api
```

### Lỗi: "Prisma Client not generated"

**Giải pháp:**
```bash
cd backend
npx prisma generate
```

### Lỗi: "CORS policy blocked"

**Giải pháp:**
- Kiểm tra `FRONTEND_URL` trong `backend/.env` khớp với URL frontend
- Restart backend sau khi thay đổi

### Lỗi: "npm install failed"

**Giải pháp:**
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install

# Hoặc dùng npm cache clean
npm cache clean --force
npm install
```

## 🔄 Reset Database

Nếu muốn reset database về trạng thái ban đầu:

```bash
cd backend
npx prisma migrate reset
npx prisma db seed
```

⚠️ **Cảnh báo:** Lệnh này sẽ xóa toàn bộ dữ liệu!

## 📊 Quản Lý Database

### Prisma Studio (GUI)

```bash
cd backend
npx prisma studio
```

Mở trình duyệt tại: http://localhost:5555

### Tạo Migration Mới

```bash
cd backend
npx prisma migrate dev --name your_migration_name
```

## 🚀 Chạy Production Mode

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve build folder với web server (nginx, apache, etc.)
```

## 📞 Cần Hỗ Trợ?

Nếu gặp vấn đề:
1. Kiểm tra file `README.md`
2. Xem file `DATABASE_SETUP.md`
3. Liên hệ support

---

**Chúc bạn cài đặt thành công! 🎉**
