import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { progressAPI } from '../services/api';
import './Progress.css';

function Progress() {
    const { user } = useAuth();
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProgress();
    }, []);

    const fetchProgress = async () => {
        try {
            const response = await progressAPI.getProgress();
            setProgress(response.progress);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="progress-page">
                <div className="loading">Đang tải...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="progress-page">
                <div className="error-box">⚠️ {error}</div>
            </div>
        );
    }

    const totalLabs = 6;
    const completedCount = progress?.completedLabs?.length || 0;
    const completionRate = ((completedCount / totalLabs) * 100).toFixed(1);
    const totalAttempts = Object.values(progress?.attempts || {}).reduce((sum, count) => sum + count, 0);

    return (
        <div className="progress-page">
            <div className="progress-container">
                <div className="progress-header">
                    <h1>📊 Tiến trình của bạn</h1>
                    <p>Theo dõi quá trình học tập XSS Security</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">✅</div>
                        <div className="stat-info">
                            <h3>{completedCount}/{totalLabs}</h3>
                            <p>Lab hoàn thành</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🎯</div>
                        <div className="stat-info">
                            <h3>{completionRate}%</h3>
                            <p>Tỷ lệ hoàn thành</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🔄</div>
                        <div className="stat-info">
                            <h3>{totalAttempts}</h3>
                            <p>Tổng lượt thử</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">⏰</div>
                        <div className="stat-info">
                            <h3>{progress?.lastActivity ? new Date(progress.lastActivity).toLocaleDateString('vi-VN') : 'Chưa có'}</h3>
                            <p>Hoạt động gần nhất</p>
                        </div>
                    </div>
                </div>

                <div className="progress-bar-section">
                    <h3>Tiến độ tổng quan</h3>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${completionRate}%` }}
                        >
                            {completionRate}%
                        </div>
                    </div>
                </div>

                <div className="labs-progress">
                    <h3>Chi tiết từng Lab</h3>
                    <div className="labs-list">
                        {[1, 2, 3, 4, 5, 6].map((labId) => {
                            const isCompleted = progress?.completedLabs?.includes(labId);
                            const attempts = progress?.attempts?.[labId] || 0;

                            return (
                                <div key={labId} className={`lab-progress-item ${isCompleted ? 'completed' : ''}`}>
                                    <div className="lab-progress-header">
                                        <div className="lab-progress-title">
                                            {isCompleted ? '✅' : '⭕'} Lab {labId}
                                        </div>
                                        <div className="lab-progress-status">
                                            {isCompleted ? 'Hoàn thành' : 'Chưa hoàn thành'}
                                        </div>
                                    </div>
                                    <div className="lab-progress-attempts">
                                        Số lượt thử: <strong>{attempts}</strong>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Progress;
