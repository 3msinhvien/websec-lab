# XSS Lab Backend

Backend API cho ứng dụng XSS Security Lab.

## Công nghệ sử dụng

- Node.js
- Express.js
- JWT Authentication
- bcryptjs

## Cài đặt

```bash
npm install
```

## Chạy ứng dụng

### Development mode
```bash
npm run dev
```

### Production mode
```bash
npm start
```

Server sẽ chạy tại `http://localhost:5000`

## Tài khoản demo (hardcoded)

| Username | Password | Tên đầy đủ | Email |
|----------|----------|------------|-------|
| student1 | password123 | Nguyễn Văn An | student1@example.com |
| student2 | password123 | Trần Thị Bình | student2@example.com |
| student3 | password123 | Lê Hoàng Cường | student3@example.com |

## API Endpoints

### Authentication

#### POST /api/auth/login
Đăng nhập
```json
{
  "username": "student1",
  "password": "password123"
}
```

#### GET /api/auth/me
Lấy thông tin user hiện tại (requires auth)

#### GET /api/auth/users
Lấy danh sách tất cả users (demo)

### Labs

#### GET /api/labs
Lấy danh sách tất cả labs

#### GET /api/labs/:id
Lấy chi tiết lab theo ID

#### GET /api/labs/:id/solution
Lấy lời giải của lab (requires auth)

### Progress

#### GET /api/progress
Lấy tiến trình của user hiện tại (requires auth)

#### POST /api/progress/submit
Gửi kết quả làm lab (requires auth)
```json
{
  "labId": 1,
  "payload": "<script>alert('XSS')</script>",
  "completed": true
}
```

#### GET /api/progress/leaderboard
Lấy bảng xếp hạng

## Authentication

Sử dụng JWT token trong header:
```
Authorization: Bearer <token>
```

## Cấu trúc thư mục

```
Backend/
├── data/
│   ├── users.js      # Hardcoded users & progress
│   └── labs.js       # Lab definitions
├── middleware/
│   └── auth.js       # JWT authentication
├── routes/
│   ├── auth.js       # Authentication routes
│   ├── labs.js       # Lab routes
│   └── progress.js   # Progress tracking routes
├── .env              # Environment variables
├── .gitignore
├── package.json
├── server.js         # Main server file
└── README.md
```
