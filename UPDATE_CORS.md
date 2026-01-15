# Cập nhật CORS cho Backend trên Render

## Vấn đề
Frontend trên Vercel không kết nối được backend vì CORS chỉ cho phép localhost.

## Giải pháp đã áp dụng
Code backend đã được cập nhật để cho phép:
- `http://localhost:3000` (development)
- `https://dental-booking-84a54o5u7-phus-projects-63b4067e.vercel.app` (production)
- Tất cả domain `.vercel.app` (preview deployments)

## Bước tiếp theo - Cập nhật trên Render

### Cách 1: Thêm biến môi trường (Khuyến nghị)
1. Vào https://dashboard.render.com
2. Chọn service "dental-backend"
3. Vào tab **Environment**
4. Thêm biến môi trường mới:
   ```
   Key: FRONTEND_URL
   Value: https://dental-booking-84a54o5u7-phus-projects-63b4067e.vercel.app
   ```
5. Click **Save Changes**
6. Service sẽ tự động redeploy

### Cách 2: Redeploy thủ công
1. Commit và push code mới lên Git:
   ```bash
   cd backend
   git add .
   git commit -m "Update CORS configuration"
   git push
   ```
2. Render sẽ tự động deploy

### Cách 3: Manual Deploy trên Render
1. Vào https://dashboard.render.com
2. Chọn service "dental-backend"
3. Click **Manual Deploy** > **Deploy latest commit**

## Kiểm tra sau khi deploy
Mở console trên website và kiểm tra xem còn lỗi CORS không:
```
https://dental-booking-84a54o5u7-phus-projects-63b4067e.vercel.app
```

## Lưu ý
- Nếu bạn có custom domain cho Vercel, cần thêm domain đó vào `allowedOrigins` trong `backend/src/server.ts`
- Code hiện tại đã cho phép tất cả subdomain `.vercel.app` nên preview deployments cũng sẽ hoạt động
