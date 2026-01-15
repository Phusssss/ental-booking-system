# 🚀 Git Commands - Copy & Paste

## Bước 1: Khởi tạo Git (Chỉ làm 1 lần)

```bash
git init
git add .
git commit -m "Initial commit - Dental Booking System"
```

## Bước 2: Tạo Repository trên GitHub

1. Vào: https://github.com/new
2. Repository name: `dental-booking-system`
3. Public hoặc Private
4. KHÔNG tick "Add README"
5. Click "Create repository"

## Bước 3: Push lên GitHub

**Thay `YOUR_USERNAME` bằng username GitHub của bạn:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/dental-booking-system.git
git branch -M main
git push -u origin main
```

**Ví dụ:**
```bash
git remote add origin https://github.com/john-doe/dental-booking-system.git
git branch -M main
git push -u origin main
```

## ✅ Xong!

Mở browser: `https://github.com/YOUR_USERNAME/dental-booking-system`

---

## 📝 Commands thường dùng sau này

### Khi có thay đổi code:

```bash
git add .
git commit -m "Update: mô tả thay đổi"
git push
```

### Xem status:

```bash
git status
```

### Xem history:

```bash
git log --oneline
```

---

## 🔐 Nếu bị lỗi Authentication

### Cách 1: Dùng Personal Access Token

1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Tick `repo`
4. Copy token

Khi push, dùng token làm password:
```bash
git push
# Username: your-username
# Password: ghp_xxxxxxxxxxxx (paste token)
```

### Cách 2: Dùng GitHub Desktop (Dễ nhất)

1. Download: https://desktop.github.com
2. Login
3. Add Local Repository → Chọn folder `E:\MB\Android`
4. Publish repository

---

## 🎉 Sau khi push xong

Làm theo **QUICK_DEPLOY.md** để deploy!
