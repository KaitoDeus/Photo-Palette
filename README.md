# Photo Palette 📸✨

> **Online Photobooth Web Application & Full-Featured Admin CMS**  
> Trải nghiệm phòng chụp ảnh Photobooth phong cách Hàn Quốc ngay trên trình duyệt và hệ thống quản lý CMS chuyên nghiệp.

[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 📑 Mục Lục (Table of Contents)

1. [Giới Thiệu (Introduction)](#1-giới-thiệu-introduction)
2. [Tính Năng Nổi Bật (Features)](#2-tính-năng-nổi-bật-features)
3. [Hệ Thống Quản Trị (Admin CMS)](#3-hệ-thống-quản-trị-admin-cms)
4. [Kiến Trúc Hệ Thống (Architecture)](#4-kiến-trúc-hệ-thống-architecture)
5. [Cấu Trúc Thư Mục (Directory Structure)](#5-cấu-trúc-thư-mục-directory-structure)
6. [Cài Đặt & Chạy Cục Bộ (Installation)](#6-cài-đặt--chạy-cục-bộ-installation)
7. [Tài Khoản Đăng Nhập Quản Trị](#7-tài-khoản-đăng-nhập-quản-trị)
8. [Giấy Phép (License)](#8-giấy-phép-license)

---

## 1. Giới Thiệu (Introduction)

**Photo Palette** là ứng dụng web photobooth trực tuyến mang trải nghiệm chụp ảnh lấy liền phong cách Hàn Quốc (*K-Photobooth*) tới người dùng trên mọi thiết bị máy tính và điện thoại.

Không cần cài đặt ứng dụng, người dùng có thể mở webcam, tạo dáng theo đếm ngược, tự động quay video recap hậu trường, tùy biến khung ảnh đa dạng và tải ngay dải ảnh chất lượng cao. Bên cạnh đó, hệ thống tích hợp sẵn **Bảng điều khiển quản trị (Admin CMS)** giúp quản lý toàn diện kho khung ảnh, 24 chi nhánh phòng chụp và lịch hẹn của khách hàng.

---

## 2. Tính Năng Nổi Bật (Features)

### 📸 2.1. Trải Nghiệm Photobooth Cốt Lõi
- **Webcam Stream & Live Preview**: Tích hợp camera thời gian thực qua WebRTC MediaStream, hỗ trợ lật gương (*Mirror mode*) cho góc nhìn tự nhiên.
- **Tùy Chọn Đếm Ngược**: Cài đặt thời gian đếm ngược **3s**, **5s** hoặc **10s** trước mỗi lượt bấm máy.
- **Chế Độ Chụp Linh Hoạt**:
  - *Chụp tự động (Auto Sequence)*: Đếm ngược liên tục hoàn thành đủ số ảnh theo bố cục.
  - *Chụp bằng tay (Manual Capture)*: Người chụp tự chủ động bấm máy từng tấm.
- **Video Recap Hậu Trường**: Tự động quay video hậu trường quá trình chụp ảnh bằng `MediaRecorder` API và tải về dạng `.webm`.
- **Canvas Rendering Chất Lượng Cao**: Thuật toán xử lý Canvas 2D độ phân giải cao (scale 3x lên tới 2400px), crop ảnh tự động chuẩn tỉ lệ *object-fit: cover* không bị méo hình.
- **Đổi Khung Tức Thời**: Thay đổi mẫu khung bất kỳ tại màn hình kết quả mà không cần phải chụp lại từ đầu.
- **Đặt Lịch Chụp Studio Trực Tuyến**: Khách hàng có thể đặt lịch hẹn chụp chuyên nghiệp tại 24 chi nhánh, chọn gói chụp và nhận mã vé điện tử.

### 🎨 2.2. Kho Khung Ảnh (Frame Library)
- Hơn 30 mẫu khung thiết kế độc quyền theo nhiều chủ đề: *VALENTINE, TẾT, BIRTHDAY, 8/3, LOVE...*
- Đa dạng bố cục: Dải dọc **Strip 1x4**, Lưới vuông **Grid 2x2**, Chân dung **Portrait 1x1**.
- Bộ lọc đa chiều theo chủ đề, kích thước dải ảnh, tìm kiếm theo tên và Lightbox phóng to xem trước.

### 🏬 2.3. Hệ Thống 24 Chi Nhánh Toàn Quốc
- Tra cứu danh sách 24 studio tại Hà Nội, TP. Hồ Chí Minh, Hải Phòng, Bình Dương, Nghệ An, Đồng Nai, Hưng Yên.
- Bộ lọc hai cấp độ theo Tỉnh/Thành phố và Quận/Huyện.

---

## 3. Hệ Thống Quản Trị (Admin CMS)

Hệ thống quản trị hoạt động tại đường dẫn `/admin` với đầy đủ các phân hệ quản lý:

1. **Bảng Điều Khiển (Dashboard Overview)**:
   - Thống kê 4 chỉ số KPI quan trọng: Tổng khung ảnh, Chi nhánh hoạt động, Lịch chụp và Doanh thu ước tính.
   - Biểu đồ phân bố tỉ lệ khung ảnh theo danh mục chủ đề và layout.
   - Theo dõi danh sách lịch hẹn đặt chụp mới nhất.
2. **Quản Lý Kho Khung Ảnh (Visual Frame Studio)**:
   - Thêm mới, chỉnh sửa và xóa khung ảnh.
   - Hỗ trợ tải file overlay từ máy tính (`.webp`, `.png`) hoặc dán link URL.
   - Tùy chỉnh màu nền, màu viền, màu chữ.
   - Cấu hình toạ độ slots ảnh (`customMetrics`: w, h, padding, gaps) kèm nút áp dụng Preset 1x4 và 2x2 chuẩn.
   - **Xem trước thời gian thực (Live Preview)** trước khi lưu.
   - ⚡ **Đồng bộ trực tiếp**: Khung tạo mới hiển thị ngay lập tức trên trang người dùng và Photobooth modal.
3. **Quản Lý Chi Nhánh (Branch Management)**:
   - Quản lý danh sách 24 studio, thêm cơ sở mới, sửa địa chỉ, số điện thoại hoặc trạng thái hoạt động.
   - Tự động đồng bộ với trang Giới thiệu (`/about`).
4. **Quản Lý Lịch Đặt Chụp (Bookings Management)**:
   - Phân loại lịch hẹn theo trạng thái: *Chờ duyệt (PENDING)*, *Đã xác nhận (CONFIRMED)*, *Hoàn thành (COMPLETED)*, *Đã hủy (CANCELLED)*.
   - Duyệt lịch nhanh, cập nhật trạng thái và tạo lịch hẹn trực tiếp tại quầy (*Walk-in Booking*).
5. **Sao Lưu & Phục Hồi Dữ Liệu (Settings & Backup)**:
   - **Export JSON**: Xuất trọn bộ dữ liệu hệ thống ra file `.json` sao lưu.
   - **Import JSON**: Nhập dữ liệu sao lưu để khôi phục nhanh chóng.
   - **Factory Reset**: Khôi phục toàn bộ hệ thống về dữ liệu mặc định ban đầu.

---

## 4. Kiến Trúc Hệ Thống (Architecture)

```text
+-------------------------------------------------------------------------------+
|                                  USER LAYER                                   |
|  - Trang Chủ (Home & Photobooth)      - Bộ Sưu Tập (Gallery Masonry)          |
|  - Kho Khung (Frame Library)          - 24 Chi Nhánh Studio (About Locator)   |
+-------------------------------------------------------------------------------+
                                      ▲
                                      │ Reactive State Sync
                                      ▼
+-------------------------------------------------------------------------------+
|                          ADMIN CMS LAYER (/admin)                             |
|  - Admin Dashboard (KPI & Metrics)    - Frame Studio (Visual Slots Editor)    |
|  - Branch Management (CRUD 24 Cơ sở)  - Booking Management (Lịch Studio)      |
|  - Backup & JSON Sync                 - Route Guard & Authentication          |
+-------------------------------------------------------------------------------+
                                      ▲
                                      │ LocalStorage Persistence & Memory Store
                                      ▼
+-------------------------------------------------------------------------------+
|                                CORE ENGINES                                   |
|  - HTML5 Canvas 2D Engine (Export HD) - WebRTC MediaStream (Webcam Camera)    |
|  - MediaRecorder API (Video Recap)    - AdminContext Data Store               |
+-------------------------------------------------------------------------------+
```

---

## 5. Cấu Trúc Thư Mục (Directory Structure)

```text
Photo-Palette/
├── public/                 # Logo, favicon, ảnh tĩnh
├── src/
│   ├── assets/             # Khung ảnh WebP, ảnh mẫu, avatar, hero assets
│   ├── components/
│   │   ├── common/         # Button, DisclaimerModal...
│   │   ├── landing/        # Hero, Gallery, Pricing, Stats, Testimonials...
│   │   └── layout/         # Navbar, Footer, Background3D...
│   ├── data/
│   │   └── branches.ts     # Dữ liệu gốc 24 chi nhánh phòng chụp
│   ├── features/
│   │   ├── admin/          # Phân hệ Admin CMS
│   │   │   ├── components/ # AdminLayout, AdminRouteGuard...
│   │   │   ├── context/    # AdminContext (Reactive State & LocalStorage)
│   │   │   ├── data/       # Default mock bookings
│   │   │   ├── pages/      # Dashboard, Frames, Branches, Bookings, Settings...
│   │   │   └── types.ts    # Admin & Booking TypeScript interfaces
│   │   └── photobooth/     # Phân hệ Photobooth cốt lõi
│   │       ├── components/ # DesktopView, MobileView, FrameStrip, CustomerBookingModal...
│   │       ├── data/       # frames.ts (30+ khung ảnh thiết kế sẵn)
│   │       ├── hooks/      # usePhotoBooth.ts
│   │       ├── utils/      # imageExport.ts (Canvas HD 2400px rendering)
│   │       └── types.ts    # Frame, Layout, BoothStep interfaces
│   ├── pages/              # HomePage, AboutPage, FrameLibraryPage, GalleryPage...
│   ├── App.tsx             # Định tuyến ứng dụng & Layout phân quyền
│   ├── index.css           # Cấu hình font & style toàn cục
│   └── index.tsx           # Điểm khởi chạy React 19
├── index.html              # HTML template
├── package.json            # Danh sách dependencies
├── vite.config.ts          # Cấu hình Vite
└── LICENSE                 # Giấy phép MIT
```

---

## 6. Cài Đặt & Chạy Cục Bộ (Installation)

### Yêu Cầu Hệ Thống
- [Node.js](https://nodejs.org/) phiên bản 18.0 trở lên.
- Trình quản lý gói `npm` (hoặc `pnpm` / `yarn`).

### Các Bước Thực Hiện

1. **Clone repository về máy:**
   ```bash
   git clone https://github.com/KaitoDeus/Photo-Palette.git
   cd Photo-Palette
   ```

2. **Cài đặt các gói thư viện phụ thuộc:**
   ```bash
   npm install
   ```

3. **Khởi chạy máy chủ phát triển (Dev Server):**
   ```bash
   npm run dev
   ```
   Mở trình duyệt và truy cập: **`http://localhost:5173`**

4. **Kiểm tra build cho môi trường sản xuất (Production Build):**
   ```bash
   npm run build
   npm run preview
   ```

---

## 7. Tài Khoản Đăng Nhập Quản Trị

Để truy cập vào hệ thống Admin CMS:

- **Đường dẫn**: `http://localhost:5173/admin/login`
- **Tài khoản**: `admin`
- **Mật khẩu**: `admin123` *(hoặc `123456`, `palette`)*
- *Tip*: Bạn cũng có thể bấm nút **"Đăng Nhập 1-Click"** trên màn hình để truy cập tức thời vào trang quản trị.

---

## 8. Giấy Phép (License)

Dự án được phân phối dưới giấy phép **MIT License**. Xem chi tiết tại tệp [LICENSE](LICENSE).

```text
Copyright (c) 2026 Võ Anh Khải (KaitoDeus)
```
