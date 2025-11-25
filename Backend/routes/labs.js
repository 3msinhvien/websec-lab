import express from 'express';
import { labs, getLabById, getAllLabs } from '../data/labs.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all labs (public)
router.get('/', (req, res) => {
    try {
        const allLabs = getAllLabs();
        res.json({
            success: true,
            labs: allLabs
        });
    } catch (error) {
        console.error('Get labs error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách lab'
        });
    }
});

// Get lab by ID (public - but solution requires auth)
router.get('/:id', (req, res) => {
    try {
        const labId = parseInt(req.params.id);
        const lab = getLabById(labId);

        if (!lab) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy lab'
            });
        }

        // Return lab without solution
        const { solution, ...labWithoutSolution } = lab;

        res.json({
            success: true,
            lab: labWithoutSolution
        });
    } catch (error) {
        console.error('Get lab error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy thông tin lab'
        });
    }
});

// Get lab solution (requires auth)
router.get('/:id/solution', authMiddleware, (req, res) => {
    try {
        const labId = parseInt(req.params.id);
        const lab = getLabById(labId);

        if (!lab) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy lab'
            });
        }

        res.json({
            success: true,
            solution: lab.solution,
            hint: lab.hint
        });
    } catch (error) {
        console.error('Get solution error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy lời giải'
        });
    }
});

export default router;
