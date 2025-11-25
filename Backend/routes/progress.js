import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { getUserProgress, updateUserProgress } from '../data/users.js';
import { getLabById } from '../data/labs.js';

const router = express.Router();

// Get user progress (requires auth)
router.get('/', authMiddleware, (req, res) => {
    try {
        const userId = req.user.id;
        const progress = getUserProgress(userId);

        res.json({
            success: true,
            progress
        });
    } catch (error) {
        console.error('Get progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy tiến trình'
        });
    }
});

// Submit lab attempt (requires auth)
router.post('/submit', authMiddleware, (req, res) => {
    try {
        const userId = req.user.id;
        const { labId, payload, completed } = req.body;

        if (!labId) {
            return res.status(400).json({
                success: false,
                message: 'Lab ID là bắt buộc'
            });
        }

        const lab = getLabById(labId);
        if (!lab) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy lab'
            });
        }

        // Update progress
        const updatedProgress = updateUserProgress(userId, parseInt(labId), completed);

        res.json({
            success: true,
            message: completed ? 'Chúc mừng! Bạn đã hoàn thành lab này!' : 'Đã ghi nhận lượt thử',
            progress: updatedProgress,
            pointsEarned: completed ? lab.points : 0
        });
    } catch (error) {
        console.error('Submit progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi gửi kết quả'
        });
    }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const { users, userProgress } = await import('../data/users.js');
        const { labs } = await import('../data/labs.js');

        const leaderboard = users.map(user => {
            const progress = userProgress[user.id] || { completedLabs: [], attempts: {} };

            // Calculate total points
            const totalPoints = progress.completedLabs.reduce((sum, labId) => {
                const lab = labs.find(l => l.id === labId);
                return sum + (lab ? lab.points : 0);
            }, 0);

            return {
                userId: user.id,
                username: user.username,
                fullName: user.fullName,
                completedLabs: progress.completedLabs.length,
                totalAttempts: Object.values(progress.attempts).reduce((sum, count) => sum + count, 0),
                totalPoints,
                lastActivity: progress.lastActivity
            };
        });

        // Sort by points (descending)
        leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

        res.json({
            success: true,
            leaderboard
        });
    } catch (error) {
        console.error('Get leaderboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy bảng xếp hạng'
        });
    }
});

export default router;
