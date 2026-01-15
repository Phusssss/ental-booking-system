# Cập nhật Database - Thêm imageUrl cho Services

## 🔄 Chạy Migration

Để thêm field `imageUrl` vào bảng services, chạy lệnh sau:

```bash
cd backend
npx prisma migrate dev --name add_imageurl_to_services
```

Hoặc nếu đã có migration file:

```bash
cd backend
npx prisma migrate deploy
```

## 🔄 Cập nhật Prisma Client

Sau khi chạy migration, cập nhật Prisma Client:

```bash
cd backend
npx prisma generate
```

## 📝 Thay đổi

### Database Schema
- Thêm field `imageUrl` (TEXT, nullable) vào bảng `services`
- Tự động cập nhật các dịch vụ hiện có với URL ảnh mặc định từ Unsplash

### Frontend
- Thêm field `imageUrl` vào Service interface
- Cập nhật form quản lý dịch vụ với input URL hình ảnh
- Preview ảnh khi nhập URL
- Hiển thị ảnh thay vì emoji trong danh sách dịch vụ (admin)
- Landing page ưu tiên `imageUrl` từ database

### Backend
- Field `imageUrl` được thêm vào Service model
- API tự động hỗ trợ field mới

## 🎨 Cách sử dụng

### 1. Thêm/Sửa dịch vụ trong Admin Panel

1. Vào `/admin/services`
2. Click "Thêm dịch vụ" hoặc "Sửa" dịch vụ có sẵn
3. Nhập URL hình ảnh (ví dụ từ Unsplash)
4. Xem preview ảnh
5. Lưu

### 2. Tìm ảnh trên Unsplash

1. Truy cập: https://unsplash.com
2. Tìm kiếm: "dental", "dentist", "teeth", "orthodontics", etc.
3. Click vào ảnh
4. Click nút "Share" → Copy URL
5. Hoặc right-click → Copy image address

### 3. Format URL Unsplash

URL chuẩn:
```
https://images.unsplash.com/photo-[id]?w=400&h=300&fit=crop
```

Ví dụ:
```
https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop
```

## 🔍 Kiểm tra

Sau khi cập nhật:

1. Vào admin panel: `/admin/services`
2. Kiểm tra các dịch vụ đã có ảnh
3. Thử thêm dịch vụ mới với URL ảnh
4. Xem landing page để kiểm tra hiển thị

## 🐛 Troubleshooting

**Lỗi: Migration failed**
```bash
# Reset database (CHÚ Ý: Mất hết data)
cd backend
npx prisma migrate reset

# Hoặc chạy lại migration
npx prisma migrate deploy
```

**Lỗi: Ảnh không hiển thị**
- Kiểm tra URL có đúng format không
- Kiểm tra URL có truy cập được không (mở trong browser)
- Kiểm tra CORS nếu ảnh từ domain khác

**Lỗi: Type error trong frontend**
```bash
# Restart dev server
cd frontend
npm start
```
