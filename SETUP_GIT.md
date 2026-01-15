# 🔧 Setup Git và GitHub

## Bước 1: Khởi tạo Git Repository

```bash
# Vào thư mục project
cd E:\MB\Android

# Khởi tạo git
git init

# Kiểm tra status
git status
```

## Bước 2: Tạo .gitignore

File `.gitignore` đã có sẵn, nhưng kiểm tra lại:

```bash
# Xem nội dung .gitignore
type .gitignore
```

Nếu chưa có, tạo file `.gitignore`:

```
# Dependencies
node_modules/
frontend/node_modules/
backend/node_modules/

# Environment variables
.env
.env.local
.env.production
frontend/.env
backend/.env

# Build
frontend/build/
backend/dist/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Android
*.apk
*.ap_
*.dex
local.properties
.gradle/
build/
app/build/

# Prisma
backend/prisma/dev.db
backend/prisma/dev.db-journal
```

## Bước 3: Add và Commit

```bash
# Add tất cả files
git add .

# Commit
git commit -m "Initial commit - Dental Booking System"
```

## Bước 4: Tạo Repository trên GitHub

### Cách 1: Qua Website (Dễ nhất)

1. Truy cập: https://github.com
2. Login (hoặc Sign up nếu chưa có tài khoản)
3. Click nút **"+"** góc phải trên → **"New repository"**
4. Điền thông tin:
   - **Repository name:** `dental-booking-system`
   - **Description:** `Dental Clinic Booking & Management System`
   - **Public** hoặc **Private** (tùy bạn)
   - **KHÔNG** tick "Add a README file"
   - **KHÔNG** tick "Add .gitignore"
5. Click **"Create repository"**

### Cách 2: Qua GitHub CLI (Nếu đã cài)

```bash
# Cài GitHub CLI
winget install GitHub.cli

# Login
gh auth login

# Tạo repo
gh repo create dental-booking-system --public --source=. --remote=origin --push
```

## Bước 5: Connect và Push lên GitHub

Sau khi tạo repo trên GitHub, copy commands từ GitHub (hoặc dùng commands dưới):

```bash
# Add remote origin (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/dental-booking-system.git

# Đổi branch sang main (nếu đang là master)
git branch -M main

# Push lên GitHub
git push -u origin main
```

**Ví dụ:**
```bash
git remote add origin https://github.com/john-doe/dental-booking-system.git
git branch -M main
git push -u origin main
```

## Bước 6: Xác nhận

```bash
# Kiểm tra remote
git remote -v

# Kết quả mong đợi:
# origin  https://github.com/YOUR_USERNAME/dental-booking-system.git (fetch)
# origin  https://github.com/YOUR_USERNAME/dental-booking-system.git (push)
```

Mở browser và vào: `https://github.com/YOUR_USERNAME/dental-booking-system`

Bạn sẽ thấy code đã được push lên! ✅

---

## 🔐 Nếu bị lỗi Authentication

### Option 1: Dùng Personal Access Token (Khuyến nghị)

1. Vào GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Điền:
   - **Note:** `Dental Booking Deploy`
   - **Expiration:** `90 days`
   - **Scopes:** Tick `repo` (full control)
4. Click **"Generate token"**
5. **COPY TOKEN** (chỉ hiện 1 lần!)

Khi push, dùng token thay password:
```bash
git push -u origin main
# Username: your-github-username
# Password: ghp_xxxxxxxxxxxxxxxxxxxx (paste token)
```

### Option 2: Dùng GitHub Desktop (Dễ nhất)

1. Download: https://desktop.github.com
2. Cài đặt và login
3. File → Add Local Repository → Chọn `E:\MB\Android`
4. Publish repository

---

## 📝 Commands Git thường dùng

```bash
# Xem status
git status

# Add files
git add .

# Commit
git commit -m "Your message"

# Push
git push

# Pull (lấy code mới nhất)
git pull

# Xem history
git log --oneline

# Tạo branch mới
git checkout -b feature-name

# Đổi branch
git checkout main
```

---

## ✅ Sau khi push xong

Bạn có thể deploy ngay:

1. **Backend:** Render sẽ connect với GitHub repo
2. **Frontend:** Vercel sẽ connect với GitHub repo
3. Mỗi lần push code mới, tự động deploy!

---

## 🚀 Tiếp theo

Làm theo file **QUICK_DEPLOY.md** để deploy lên hosting free!
