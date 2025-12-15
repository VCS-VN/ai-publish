# Placeholder Image Update

## ✅ Đã Cập Nhật Thành Công

Tất cả các component và fake data đã được cập nhật để sử dụng placeholder image mới từ LinkedIn.

## Thay Đổi

### URL Placeholder Mới

**URL cũ:** `/images/product-placeholder.png`

**URL mới:**
```
https://media.licdn.com/dms/image/v2/D560BAQG24EEpNjgomQ/company-logo_100_100/B56Zesjc2gGQAQ-/0/1750946664328?e=1767225600&v=beta&t=FVF-2FPO-Iz1IA6m0OYNbr74rkfwzbStBXbKjpahCqk
```

## Files Đã Cập Nhật

### 1. **lib/utils/env.ts**
- ✅ Thêm function `getPlaceholderImage()` để trả về URL placeholder mới
- Centralized placeholder management

### 2. **components/product-card.tsx**
- ✅ Import `getPlaceholderImage` từ utils
- ✅ Sử dụng placeholder image động
- ✅ Fallback khi image error

### 3. **components/cart-drawer.tsx**
- ✅ Import `getPlaceholderImage` từ utils
- ✅ Áp dụng placeholder cho cart items
- ✅ Error handling với placeholder

### 4. **app/products/[id]/page.tsx**
- ✅ Import `getPlaceholderImage` từ utils
- ✅ Product detail image fallback
- ✅ Consistent với các component khác

### 5. **lib/api/products.ts**
- ✅ FAKE_PRODUCTS data updated
- ✅ Tất cả 3 fake products sử dụng placeholder mới
- ✅ Consistent data structure

## Cách Hoạt Động

```typescript
// 1. Định nghĩa placeholder URL trong utils
export const getPlaceholderImage = () => {
  return "https://media.licdn.com/dms/image/v2/D560BAQG24EEpNjgomQ/company-logo_100_100/B56Zesjc2gGQAQ-/0/1750946664328?e=1767225600&v=beta&t=FVF-2FPO-Iz1IA6m0OYNbr74rkfwzbStBXbKjpahCqk";
};

// 2. Sử dụng trong components
const placeholderImage = getPlaceholderImage();

// 3. Fallback strategy
<img
  src={product.image || placeholderImage}
  onError={(e) => {
    e.target.src = placeholderImage;
  }}
/>
```

## Khi Nào Placeholder Được Sử Dụng?

### 1. **Product Listing (Home Page)**
- Khi `product.image` là null/undefined/empty
- Khi image load bị lỗi (404, network error, etc.)

### 2. **Product Detail Page**
- Khi product không có image
- Khi image URL invalid hoặc load failed

### 3. **Cart Drawer**
- Khi cart item không có image
- Khi product image không tồn tại

### 4. **Demo Mode**
- Tất cả fake products sử dụng placeholder image
- Consistent experience

## Testing

### Test Cases Đã Verify:

✅ **Demo Mode**
- 3 fake products hiển thị placeholder image
- Image load thành công từ LinkedIn CDN

✅ **Product Cards**
- Hover effect hoạt động
- Image scaling transition smooth
- Placeholder visible

✅ **Product Detail**
- Large image hiển thị placeholder
- No layout shift
- Aspect ratio maintained

✅ **Cart Drawer**
- Cart items hiển thị thumbnail
- Placeholder trong cart items
- Consistent sizing

## Performance

### Benefits:

1. **Centralized Management**
   - Single source of truth
   - Easy to update placeholder URL
   - Consistent across app

2. **Error Handling**
   - Graceful fallback
   - No broken images
   - Better UX

3. **CDN Hosted**
   - Fast loading từ LinkedIn CDN
   - Reliable availability
   - Professional logo

## Future Updates

Nếu cần thay đổi placeholder image trong tương lai:

1. **Update URL** trong `lib/utils/env.ts`:
```typescript
export const getPlaceholderImage = () => {
  return "NEW_URL_HERE";
};
```

2. **Restart** Docker container:
```bash
docker compose restart
```

That's it! ✨

## Production Notes

⚠️ **LinkedIn Image URL có expiry time**

Current URL expires: `e=1767225600`

**Khuyến nghị:**
- Monitor expiry date
- Update URL trước khi expire
- Hoặc host image locally trong production

**Alternative Options:**

1. **Host locally**:
   - Save image to `/public/images/monmi-logo.png`
   - Update `getPlaceholderImage()` to return `/images/monmi-logo.png`

2. **Use CDN**:
   - Upload to Cloudflare/AWS S3
   - Permanent URL
   - Better control

3. **Environment Variable**:
```env
NEXT_PUBLIC_PLACEHOLDER_IMAGE=https://your-cdn.com/placeholder.png
```

```typescript
export const getPlaceholderImage = () => {
  return process.env.NEXT_PUBLIC_PLACEHOLDER_IMAGE || "fallback-url";
};
```

---

## Status

✅ **All updates complete and tested**
✅ **Docker container restarted**
✅ **Application running successfully**
✅ **Placeholder image working across all pages**

🎉 Ready to use!
