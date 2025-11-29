import { useState, useEffect } from 'react';
import { progressAPI } from '../services/api';
import './Leaderboard.css';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const response = await progressAPI.getLeaderboard();
            setLeaderboard(response.leaderboard);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="leaderboard-page">
                <div className="loading">Đang tải...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="leaderboard-page">
                <div className="error-box">⚠️ {error}</div>
            </div>
        );
    }

    const getMedalEmoji = (rank) => {
        switch (rank) {
            case 0: return '🥇';
            case 1: return '🥈';
            case 2: return '🥉';
            default: return `#${rank + 1}`;
        }
    };

    return (
        <div className="leaderboard-page">
            <div className="leaderboard-container">
                <div className="leaderboard-header">
                    <h1>🏆 Bảng xếp hạng</h1>
                    <p>Top học viên xuất sắc nhất</p>
                </div>

                {leaderboard.length === 0 ? (
                    <div className="empty-state">
                        <p>Chưa có dữ liệu xếp hạng</p>
                    </div>
                ) : (
                    <div className="leaderboard-table">
                        <div className="table-header">
                            <div className="col-rank">Hạng</div>
                            <div className="col-name">Học viên</div>
                            <div className="col-labs">Labs</div>
                            <div className="col-points">Điểm</div>
                            <div className="col-attempts">Lượt thử</div>
                        </div>

                        {leaderboard.map((user, index) => (
                            <div key={user.userId} className={`table-row rank-${index + 1}`}>
                                <div className="col-rank">
                                    <span className="rank-badge">{getMedalEmoji(index)}</span>
                                </div>
                                <div className="col-name">
                                    <div className="user-info">
                                        <strong>{user.fullName}</strong>
                                        <span className="username">@{user.username}</span>
                                    </div>
                                </div>
                                <div className="col-labs">
                                    <span className="lab-count">{user.completedLabs}/12</span>
                                </div>
                                <div className="col-points">
                                    <span className="points-badge">{user.totalPoints} điểm</span>
                                </div>
                                <div className="col-attempts">
                                    {user.totalAttempts}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="leaderboard-info">
                    <h3>📌 Hướng dẫn tính điểm</h3>
                    <div className="points-grid">
                        <div className="points-category">
                            <h4>🔴 XSS (130đ)</h4>
                            <ul>
                                <li>Lab 1-2: 10-20đ (Dễ - TB)</li>
                                <li>Lab 3-4: 20-25đ (TB)</li>
                                <li>Lab 5-6: 30-35đ (Khó)</li>
                            </ul>
                        </div>
                        <div className="points-category">
                            <h4>🟠 SQL Injection (60đ)</h4>
                            <ul>
                                <li>Lab 7: 25đ (Auth Bypass)</li>
                                <li>Lab 8: 35đ (Data Extraction)</li>
                            </ul>
                        </div>
                        <div className="points-category">
                            <h4>🟡 IDOR (35đ)</h4>
                            <ul>
                                <li>Lab 9: 15đ (Profile Access)</li>
                                <li>Lab 10: 20đ (Order Manipulation)</li>
                            </ul>
                        </div>
                        <div className="points-category">
                            <h4>🟢 CSRF (55đ)</h4>
                            <ul>
                                <li>Lab 11: 25đ (Email Change)</li>
                                <li>Lab 12: 30đ (Account Delete)</li>
                            </ul>
                        </div>
                    </div>
                    <p className="total-info">Tổng điểm tối đa: <strong>255 điểm</strong> (12 labs)</p>
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;
