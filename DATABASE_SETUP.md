# 🗄️ Hướng Dẫn Setup Database Online

## 1. Neon (Khuyến nghị ⭐)

**Ưu điểm:**
- ✅ Miễn phí 0.5GB storage
- ✅ Serverless, tự động scale
- ✅ Nhanh, hiện đại
- ✅ Branching database (như Git)

**Cách setup:**

1. Truy cập https://neon.tech
2. Đăng ký tài khoản (GitHub/Google)
3. Tạo project mới:
   - Project name: `dental-booking`
   - Region: Chọn gần bạn nhất
4. Copy connection string:
   ```
   postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/dental_booking?sslmode=require
   ```
5. Paste vào file `.env`:
   ```bash
   DATABASE_URL="postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/dental_booking?sslmode=require"
   ```
6. Chạy migration:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

**Lưu ý:** Neon tự động sleep sau 5 phút không dùng (free tier), request đầu tiên sẽ hơi chậm.

---

## 2. Supabase

**Ưu điểm:**
- ✅ Miễn phí 500MB storage
- ✅ Có UI quản lý database đẹp
- ✅ Tích hợp auth, storage, realtime
- ✅ Không sleep

**Cách setup:**

1. Truy cập https://supabase.com
2. Đăng ký và tạo project mới
3. Vào Settings > Database
4. Copy connection string (Transaction mode):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```
5. Thay `[YOUR-PASSWORD]` bằng password bạn đặt khi tạo project
6. Paste vào `.env`:
   ```bash
   DATABASE_URL="postgresql://postgres:your-password@db.xxx.supabase.co:5432/postgres"
   ```
7. Chạy migration:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

**Bonus:** Supabase có Table Editor để xem/sửa data trực tiếp trên web!

---

## 3. Railway

**Ưu điểm:**
- ✅ Miễn phí $5 credit/tháng
- ✅ Deploy cả backend + database cùng chỗ
- ✅ Tự động backup
- ✅ Không giới hạn connections

**Cách setup:**

1. Truy cập https://railway.app
2. Đăng ký với GitHub
3. New Project > Provision PostgreSQL
4. Copy connection string từ Variables tab:
   ```
   postgresql://postgres:password@containers-us-west-xxx.railway.app:7432/railway
   ```
5. Paste vào `.env`
6. Chạy migration

**Lưu ý:** $5 credit = ~500 giờ chạy/tháng (đủ dùng cho development)

---

## 4. ElephantSQL

**Ưu điểm:**
- ✅ Hoàn toàn miễn phí (20MB)
- ✅ Đơn giản, dễ dùng
- ✅ Không cần credit card

**Cách setup:**

1. Truy cập https://www.elephantsql.com
2. Đăng ký tài khoản
3. Create New Instance:
   - Name: `dental-booking`
   - Plan: Tiny Turtle (Free)
   - Region: Chọn gần nhất
4. Copy URL từ Details page:
   ```
   postgresql://username:password@silly.db.elephantsql.com/username
   ```
5. Paste vào `.env`
6. Chạy migration

**Giới hạn:** 20MB storage, 5 concurrent connections (đủ cho demo/test)

---

## 5. Render

**Ưu điểm:**
- ✅ Miễn phí 90 ngày
- ✅ Tự động backup
- ✅ Deploy backend + DB cùng chỗ

**Cách setup:**

1. Truy cập https://render.com
2. New > PostgreSQL
3. Free tier
4. Copy External Database URL
5. Paste vào `.env`

**Lưu ý:** Sau 90 ngày cần trả phí $7/tháng

---

## So Sánh Nhanh

| Dịch vụ | Miễn phí | Storage | Sleep? | Tốc độ | Khuyến nghị |
|---------|----------|---------|--------|--------|-------------|
| **Neon** | ✅ | 0.5GB | Có (5 phút) | ⚡⚡⚡ | Development |
| **Supabase** | ✅ | 500MB | Không | ⚡⚡ | Production nhỏ |
| **Railway** | $5/tháng | 1GB | Không | ⚡⚡⚡ | Production |
| **ElephantSQL** | ✅ | 20MB | Không | ⚡ | Demo/Test |
| **Render** | 90 ngày | 1GB | Không | ⚡⚡ | Trial |

---

## Hướng Dẫn Chung

### 1. Sau khi có DATABASE_URL:

```bash
cd backend

# Copy và sửa .env
cp .env.example .env
# Paste DATABASE_URL vào file .env

# Cài đặt dependencies
npm install

# Chạy migration (tạo tables)
npx prisma migrate dev

# Seed data mẫu
npx prisma db seed

# Khởi động server
npm run dev
```

### 2. Kiểm tra kết nối:

```bash
# Test connection
npx prisma db push

# Xem database trong Prisma Studio
npx prisma studio
```

### 3. Troubleshooting:

**Lỗi: "Can't reach database server"**
- Kiểm tra DATABASE_URL có đúng không
- Thêm `?sslmode=require` vào cuối URL nếu cần
- Kiểm tra firewall/VPN

**Lỗi: "SSL connection required"**
- Thêm `?sslmode=require` vào DATABASE_URL:
  ```
  postgresql://user:pass@host:5432/db?sslmode=require
  ```

**Lỗi: "Too many connections"**
- Giảm connection pool trong schema.prisma:
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
    relationMode = "prisma"
  }
  ```

---

## Khuyến Nghị Theo Use Case

### 🧪 Development/Learning:
→ **Neon** hoặc **ElephantSQL** (miễn phí, đơn giản)

### 🚀 Production nhỏ (< 1000 users):
→ **Supabase** (miễn phí, ổn định)

### 💼 Production lớn:
→ **Railway** hoặc **Render** (trả phí, đáng tin cậy)

### 🎯 Demo/Presentation:
→ **Supabase** (không sleep, UI đẹp để show)

---

## Backup & Migration

### Backup database:

```bash
# Neon/Supabase/Railway đều hỗ trợ backup tự động
# Hoặc export thủ công:
pg_dump $DATABASE_URL > backup.sql
```

### Migrate giữa các dịch vụ:

```bash
# Export từ DB cũ
pg_dump $OLD_DATABASE_URL > backup.sql

# Import vào DB mới
psql $NEW_DATABASE_URL < backup.sql
```

---

## Tips & Tricks

1. **Dùng connection pooling** cho production:
   - Neon: Tự động có
   - Supabase: Dùng connection pooler URL
   - Railway: Cấu hình trong Prisma

2. **Monitor usage:**
   - Tất cả dịch vụ đều có dashboard để xem usage
   - Set alert khi gần hết quota

3. **Security:**
   - Không commit DATABASE_URL vào Git
   - Rotate password định kỳ
   - Chỉ allow IP cần thiết (nếu có tính năng)

4. **Performance:**
   - Tạo indexes cho các query thường dùng
   - Dùng Prisma query optimization
   - Cache kết quả nếu cần

---

## Support

Nếu gặp vấn đề:
1. Check documentation của dịch vụ đang dùng
2. Xem Prisma logs: `npx prisma db push --help`
3. Test connection: `npx prisma studio`
4. Tạo issue trên GitHub repo

Happy coding! 🚀
