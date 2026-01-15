# Hướng dẫn thêm Banner Nha Khoa

## 📍 Vị trí file
`frontend/src/pages/Landing/PromoBannerSection.tsx`

## 🖼️ Cách thay banner

### Bước 1: Upload banner lên
Có 3 cách:

**Option 1: Dùng URL trực tiếp (Nhanh nhất)**
```typescript
// Dòng 20 trong PromoBannerSection.tsx
<img
  src="URL_BANNER_CUA_BAN"  // ← Thay đây
  alt="Dental Promo Banner"
  className="w-full h-auto object-cover"
  loading="lazy"
/>
```

**Option 2: Upload vào public folder**
```bash
# 1. Copy banner vào
frontend/public/images/banner-nha-khoa.jpg

# 2. Sử dụng
<img
  src="/images/banner-nha-khoa.jpg"
  alt="Dental Promo Banner"
  className="w-full h-auto object-cover"
  loading="lazy"
/>
```

**Option 3: Import vào src**
```typescript
// Đầu file
import bannerImage from '../../assets/banner-nha-khoa.jpg';

// Trong component
<img
  src={bannerImage}
  alt="Dental Promo Banner"
  className="w-full h-auto object-cover"
  loading="lazy"
/>
```

### Bước 2: Tối ưu kích thước banner

**Kích thước đề xuất:**
- Width: 600-800px
- Height: 800-1000px (tỷ lệ 3:4 hoặc 2:3)
- Format: WebP hoặc JPG
- Quality: 80-85%
- File size: < 200KB

**Nếu banner quá lớn:**
```bash
# Dùng online tool
https://squoosh.app/

# Hoặc ImageMagick
magick convert banner.jpg -resize 600x800 -quality 85 banner-optimized.jpg
```

## 🎨 Tùy chỉnh layout

### Thay đổi tỷ lệ Left/Right

```typescript
// Hiện tại: 50/50
<div className="grid lg:grid-cols-2 gap-8 items-center">

// Thay thành 40/60 (Banner nhỏ hơn)
<div className="grid lg:grid-cols-[40%_60%] gap-8 items-center">

// Hoặc 60/40 (Banner lớn hơn)
<div className="grid lg:grid-cols-[60%_40%] gap-8 items-center">
```

### Thay đổi nội dung bên phải

**Hiện tại:** 3 promo cards + CTA buttons

**Có thể thay thành:**

**Option A: Quick Booking Form**
```typescript
<div className="bg-white rounded-2xl p-8 shadow-xl">
  <h3 className="text-2xl font-bold mb-6">Đặt lịch nhanh</h3>
  <form className="space-y-4">
    <input type="text" placeholder="Họ tên" className="..." />
    <input type="tel" placeholder="Số điện thoại" className="..." />
    <select className="...">
      <option>Chọn dịch vụ</option>
    </select>
    <button type="submit" className="btn-primary w-full">
      Đặt lịch ngay
    </button>
  </form>
</div>
```

**Option B: Video giới thiệu**
```typescript
<div className="relative rounded-2xl overflow-hidden shadow-xl">
  <video 
    className="w-full h-auto"
    controls
    poster="/images/video-thumbnail.jpg"
  >
    <source src="/videos/intro.mp4" type="video/mp4" />
  </video>
</div>
```

**Option C: Slider ưu đãi**
```typescript
// Dùng carousel để show nhiều ưu đãi
<Swiper>
  <SwiperSlide>Ưu đãi 1</SwiperSlide>
  <SwiperSlide>Ưu đãi 2</SwiperSlide>
  <SwiperSlide>Ưu đãi 3</SwiperSlide>
</Swiper>
```

## 📱 Responsive

**Desktop (lg+):** Banner trái, Content phải
**Tablet/Mobile:** Stack dọc, Banner trên, Content dưới

Để đổi thứ tự mobile:
```typescript
// Banner xuống dưới trên mobile
<div className="grid lg:grid-cols-2 gap-8 items-center">
  <div className="order-2 lg:order-1">Banner</div>
  <div className="order-1 lg:order-2">Content</div>
</div>
```

## 🎯 Vị trí section

Hiện tại: Sau TrustBadgesSection, trước ServicesSection

Để đổi vị trí, edit `frontend/src/pages/Landing/index.tsx`:
```typescript
<HeroSection />
<TrustBadgesSection />
<PromoBannerSection />  // ← Đây
<ServicesSection />
```

## 🎨 Thay đổi màu sắc

```typescript
// Background section
className="py-20 bg-gradient-to-br from-primary-50 via-white to-neutral-50"

// Promo card colors
color: 'bg-yellow-500',  // Vàng
color: 'bg-primary-500', // Turquoise
color: 'bg-green-500',   // Xanh lá
```

## 💡 Tips

1. **Banner nên có text rõ ràng** - Tránh text quá nhỏ
2. **Contrast tốt** - Text dễ đọc trên background
3. **Call-to-action rõ ràng** - Ưu đãi gì, làm sao để nhận
4. **Mobile-friendly** - Test trên điện thoại
5. **Load nhanh** - Optimize file size

## 🔧 Troubleshooting

**Banner bị méo:**
```typescript
// Thêm aspect ratio
className="aspect-[3/4] object-cover"
```

**Banner quá to:**
```typescript
// Giới hạn chiều cao
className="max-h-[600px] object-cover"
```

**Banner không hiện:**
- Check đường dẫn file
- Check console log errors
- Verify file tồn tại trong public/

## 📊 A/B Testing Ideas

Test xem layout nào convert tốt hơn:
- Banner trái vs Banner phải
- 3 cards vs Quick form
- Vertical banner vs Horizontal banner
- Static vs Animated banner
