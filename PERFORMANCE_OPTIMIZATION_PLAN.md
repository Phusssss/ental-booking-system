# Kế hoạch tối ưu Performance - Dental Booking Website

## 🎯 Mục tiêu
- Giảm lag/jank khi scroll
- Tăng FPS từ ~30fps lên 60fps
- Giảm thời gian load trang xuống < 2s
- Cải thiện Lighthouse score lên > 90

## 🔴 Vấn đề hiện tại

### 1. Animation Issues (Critical)
- ❌ 10+ infinite animations chạy đồng thời
- ❌ Continuous rotation/scale animations (CPU intensive)
- ❌ Pulse effects với opacity changes (trigger repaints)
- ❌ Multiple blur-3xl effects (GPU bottleneck)

### 2. Framer Motion Overhead
- ❌ Quá nhiều motion.div không cần thiết
- ❌ whileHover trên mọi element
- ❌ AnimatePresence với complex exit animations
- ❌ Spring animations với nhiều keyframes

### 3. Image Loading
- ❌ Không có lazy loading
- ❌ Không optimize image size
- ❌ Load full resolution images

### 4. Re-render Issues
- ❌ Inline functions trong render
- ❌ Không memoize components
- ❌ State updates trigger toàn bộ section

## ✅ Giải pháp chi tiết

### Phase 1: Loại bỏ animations không cần thiết (Ưu tiên cao)

#### HeroSection.tsx
```typescript
// XÓA:
- 4 background animated circles (infinite rotate/scale)
- Pulse indicator ở giữa image
- Continuous rotation của badge icon
- Phone icon wiggle animation
- Quote mark rotation trong testimonials

// GIỮ LẠI:
- Initial page load animations (chỉ chạy 1 lần)
- Hover effects đơn giản (scale, translate)
- Scroll-triggered animations (viewport once: true)
```

#### TestimonialsSection.tsx
```typescript
// XÓA:
- Quote rotation animation (infinite)
- Star stagger animations (quá nhiều)
- Scale pulse trên success icon
- Complex exit animations trong AnimatePresence

// THAY THẾ:
- Dùng CSS transitions thay vì Framer Motion
- Fade simple thay vì slide + scale
```

#### FloatingActions.tsx
```typescript
// XÓA:
- Pulse animation (infinite)
- Tooltip animation delay
- Complex stagger cho action buttons

// TỐI ƯU:
- Dùng CSS animation cho pulse
- Reduce motion cho users có preference
```

### Phase 2: Optimize Framer Motion usage

```typescript
// TỐI ƯU:
1. Chỉ dùng motion cho animations phức tạp
2. Dùng CSS cho hover effects đơn giản
3. Thêm layoutId cho shared elements
4. Sử dụng useReducedMotion hook
5. Lazy load motion components
```

### Phase 3: Image Optimization

```typescript
// THÊM:
1. React.lazy cho images below fold
2. loading="lazy" attribute
3. Responsive images với srcset
4. WebP format với fallback
5. Blur placeholder
6. Intersection Observer cho manual lazy load
```

### Phase 4: Code Splitting & Lazy Loading

```typescript
// IMPLEMENT:
1. React.lazy cho các sections
2. Dynamic imports cho admin pages
3. Suspense boundaries
4. Prefetch critical resources
```

### Phase 5: CSS Optimizations

```typescript
// TỐI ƯU:
1. Giảm blur effects (blur-3xl → blur-xl)
2. Dùng will-change cho animated elements
3. Transform thay vì top/left
4. Contain: layout paint
5. Reduce backdrop-filter usage
```

### Phase 6: React Optimizations

```typescript
// IMPLEMENT:
1. React.memo cho pure components
2. useMemo cho expensive calculations
3. useCallback cho event handlers
4. Virtual scrolling cho long lists
5. Debounce scroll events
```

## 📊 Metrics để đo

### Before Optimization
- FPS: ~30fps khi scroll
- LCP: ~4s
- CLS: 0.15
- FID: 200ms
- Bundle size: ~500KB

### Target After Optimization
- FPS: 60fps stable
- LCP: < 2s
- CLS: < 0.1
- FID: < 100ms
- Bundle size: < 300KB

## 🚀 Implementation Order

### Week 1: Critical Fixes
1. ✅ Remove infinite animations
2. ✅ Optimize blur effects
3. ✅ Add lazy loading for images
4. ✅ Replace motion with CSS where possible

### Week 2: Performance Tuning
5. ✅ Code splitting
6. ✅ Memoization
7. ✅ Reduce motion preference
8. ✅ Virtual scrolling

### Week 3: Polish
9. ✅ Bundle optimization
10. ✅ Lighthouse audit
11. ✅ Real user testing
12. ✅ Performance monitoring

## 🛠️ Tools cần dùng

1. React DevTools Profiler
2. Chrome Performance tab
3. Lighthouse CI
4. Bundle analyzer
5. Web Vitals library

## 📝 Notes

- Ưu tiên mobile performance
- Test trên low-end devices
- Monitor với real users
- A/B test animations on/off
