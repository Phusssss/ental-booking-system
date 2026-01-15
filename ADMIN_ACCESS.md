# Hướng dẫn truy cập Admin Panel

## 🔐 Thông tin đăng nhập

**URL Admin:** `http://localhost:3000/admin/login`

**Tài khoản mặc định:**
- Email: `admin@dental.com`
- Password: `admin123`

## 📍 Cách truy cập

### Cách 1: Từ Navbar
1. Mở website: `http://localhost:3000`
2. Click vào link **"ADMIN"** ở góc phải navbar (desktop)
3. Hoặc mở menu mobile và click **"👤 Admin"**

### Cách 2: Trực tiếp URL
1. Mở trình duyệt
2. Nhập: `http://localhost:3000/admin/login`
3. Nhấn Enter

### Cách 3: Từ FloatingActions
1. Click vào nút floating ở góc phải dưới
2. (Có thể thêm link admin vào đây nếu cần)

## 🎯 Các trang Admin

Sau khi đăng nhập, bạn có thể truy cập:

- **Dashboard:** `/admin/dashboard` - Tổng quan
- **Appointments:** `/admin/appointments` - Quản lý lịch hẹn
- **Services:** `/admin/services` - Quản lý dịch vụ
- **Doctors:** `/admin/doctors` - Quản lý bác sĩ

## 🔧 Tạo tài khoản admin mới

Nếu chưa có tài khoản admin trong database:

1. Chạy seed data:
```bash
cd backend
npm run seed
```

2. Hoặc tạo thủ công qua Prisma Studio:
```bash
cd backend
npx prisma studio
```

3. Thêm user mới vào bảng `User` với:
   - email: email của bạn
   - password: hash của password (dùng bcrypt)
   - role: `ADMIN`

## 📝 Ghi chú

- Token JWT được lưu trong localStorage
- Session timeout: 24 giờ
- Cần đăng nhập lại sau khi logout
- Chỉ user có role `ADMIN` mới truy cập được

## 🚀 Khởi động dự án

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

**Database:**
- Đảm bảo PostgreSQL đang chạy
- Connection string trong `backend/.env`
