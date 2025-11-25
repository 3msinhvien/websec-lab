# XSS Security Lab

Ứng dụng web học tập về Cross-Site Scripting (XSS) với 6 bài lab thực hành.

## 🎯 Tính năng

- **6 bài lab XSS** từ cơ bản đến nâng cao
- **Authentication** với JWT
- **Progress Tracking** - theo dõi tiến trình học tập
- **Leaderboard** - bảng xếp hạng sinh viên
- **3 tài khoản học sinh** được hardcode sẵn

## 🚀 Cài đặt và Chạy

### Backend

```bash
cd Backend
npm install
npm run dev
```

Backend chạy tại: `http://localhost:5000`

### Frontend

```bash
cd Frontend/xss-lab-fe
npm install
npm run dev
```

Frontend chạy tại: `http://localhost:5173`

## 👥 Tài khoản demo

| Username | Password | Tên đầy đủ |
|----------|----------|------------|
| student1 | password123 | Nguyễn Văn An |
| student2 | password123 | Trần Thị Bình |
| student3 | password123 | Lê Hoàng Cường |

## 📚 Danh sách Lab

### Lab 1: Reflected XSS - Cơ bản (10 điểm)
- **Độ khó:** Dễ
- **Mục tiêu:** Khai thác lỗ hổng XSS reflected đơn giản

### Lab 2: Reflected XSS - Bypass Filter (20 điểm)
- **Độ khó:** Trung bình
- **Mục tiêu:** Vượt qua bộ lọc chặn từ khóa "script"

### Lab 3: Stored XSS - Comment Section (20 điểm)
- **Độ khó:** Trung bình
- **Mục tiêu:** Lưu trữ payload XSS trong bình luận

### Lab 4: DOM-based XSS (25 điểm)
- **Độ khó:** Trung bình
- **Mục tiêu:** Khai thác XSS thông qua DOM manipulation

### Lab 5: XSS với Event Handlers (30 điểm)
- **Độ khó:** Khó
- **Mục tiêu:** Thực thi JavaScript bằng event handlers

### Lab 6: Stored XSS - Profile Page (35 điểm)
- **Độ khó:** Khó
- **Mục tiêu:** Chèn XSS payload vào trang profile

## 🛠️ Công nghệ sử dụng

### Frontend
- React 19.2
- React Router DOM
- Vite
- CSS3

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

## 📁 Cấu trúc Project

```
xss-lab/
├── Frontend/
│   └── xss-lab-fe/
│       ├── src/
│       │   ├── components/    # Navigation components
│       │   ├── pages/         # Main pages (Home, LabList, About)
│       │   │   └── labs/      # Lab components (Lab1-Lab6)
│       │   ├── App.jsx
│       │   └── main.jsx
│       └── package.json
│
├── Backend/
│   ├── data/           # Hardcoded data (users, labs)
│   ├── middleware/     # Auth middleware
│   ├── routes/         # API routes
│   ├── server.js       # Main server
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Thông tin user hiện tại
- `GET /api/auth/users` - Danh sách users (demo)

### Labs
- `GET /api/labs` - Danh sách labs
- `GET /api/labs/:id` - Chi tiết lab
- `GET /api/labs/:id/solution` - Lời giải (yêu cầu auth)

### Progress
- `GET /api/progress` - Tiến trình của user
- `POST /api/progress/submit` - Gửi kết quả
- `GET /api/progress/leaderboard` - Bảng xếp hạng

## ⚠️ Lưu ý quan trọng

**Chỉ sử dụng cho mục đích học tập!** 

Các kỹ thuật XSS trong lab này chỉ được phép sử dụng trong môi trường học tập. Việc sử dụng để tấn công hệ thống thực tế là bất hợp pháp.

## 🛡️ Phòng chống XSS

Sau khi học xong các lab, bạn sẽ hiểu cách phòng chống:

1. **Input Validation** - Validate và sanitize input
2. **Output Encoding** - Encode output trước khi hiển thị
3. **Content Security Policy (CSP)** - Hạn chế nguồn script
4. **HttpOnly Cookies** - Bảo vệ cookies
5. **Framework Security Features** - Sử dụng tính năng bảo mật của framework

## 📝 License

MIT License - Dành cho mục đích học tập
