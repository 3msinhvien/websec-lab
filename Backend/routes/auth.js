import express from 'express';
import bcrypt from 'bcryptjs';
import { findUserByUsername, findUserById } from '../data/users.js';
import { generateToken } from '../middleware/auth.js';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username và password là bắt buộc'
            });
        }

        // Find user
        const user = findUserByUsername(username);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            });
        }

        // Generate token
        const token = generateToken(user);

        // Return user info (without password)
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            success: true,
            message: 'Đăng nhập thành công',
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

// Get current user info
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Chưa đăng nhập'
            });
        }

        const jwt = await import('jsonwebtoken');
        const decoded = jwt.default.verify(token, process.env.JWT_SECRET);
        const user = findUserById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }

        const { password: _, ...userWithoutPassword } = user;

        res.json({
            success: true,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(401).json({
            success: false,
            message: 'Token không hợp lệ'
        });
    }
});

// Get all users (for demo purposes)
router.get('/users', async (req, res) => {
    const { users } = await import('../data/users.js');
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);

    res.json({
        success: true,
        users: usersWithoutPasswords,
        info: 'Demo accounts - All passwords: password123'
    });
});

export default router;
