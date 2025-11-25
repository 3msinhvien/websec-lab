import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { progressAPI } from '../../services/api';
import './Lab.css';

function Lab2() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [filtered, setFiltered] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [pointsEarned, setPointsEarned] = useState(0);
    const resultRef = useRef(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (searchResult && resultRef.current && !filtered) {
            resultRef.current.innerHTML = searchResult;

            if (searchResult.includes('alert') || searchResult.includes('onerror') || searchResult.includes('onload')) {
                setTimeout(() => {
                    setSuccess(true);
                    submitProgress(true);
                }, 500);
            } else {
                submitProgress(false);
            }
        }
    }, [searchResult, filtered]);

    const submitProgress = async (completed) => {
        if (!isAuthenticated() || submitting) return;

        setSubmitting(true);
        try {
            const response = await progressAPI.submitLab(2, searchResult, completed);
            if (completed && response.pointsEarned) {
                setPointsEarned(response.pointsEarned);
            }
        } catch (error) {
            console.error('Error submitting progress:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSuccess(false);

        // Simple filter that blocks the word "script" (case-sensitive)
        if (searchTerm.toLowerCase().includes('script')) {
            setFiltered(true);
            setSearchResult('');
        } else {
            setFiltered(false);
            setSearchResult(searchTerm);
        }
    };

    return (
        <div className="lab-container">
            <h2>Tìm kiếm có bộ lọc</h2>
            <p className="lab-description">
                Trang web này đã cố gắng bảo vệ chống XSS bằng cách chặn từ khóa "script".
                Hãy tìm cách vượt qua bộ lọc này!
            </p>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nhập từ khóa tìm kiếm..."
                    className="search-input"
                />
                <button type="submit" className="search-button">Tìm kiếm</button>
            </form>

            {filtered && (
                <div className="alert-box error">
                    ⚠️ Input chứa nội dung không được phép (từ khóa "script" bị chặn)
                </div>
            )}

            {searchResult && !filtered && (
                <div className="search-results">
                    <h3>Kết quả tìm kiếm cho:</h3>
                    <div className="search-term" ref={resultRef}></div>
                    <p className="no-results">Không tìm thấy sản phẩm nào.</p>
                </div>
            )}

            {success && (
                <div className="success-message">
                    🎉 Chúc mừng! Bạn đã bypass filter và khai thác thành công!
                    {pointsEarned > 0 && <div className="points-earned">+{pointsEarned} điểm</div>}
                </div>
            )}

            <div className="lab-info">
                <h4>🎯 Mục tiêu</h4>
                <p>Vượt qua bộ lọc và thực hiện được alert box</p>
                <h4>💡 Gợi ý kỹ thuật</h4>
                <ul>
                    <li>Sử dụng tag HTML khác thay vì &lt;script&gt;</li>
                    <li>Sử dụng event handlers (onclick, onerror, onload...)</li>
                    <li>Thử các biến thể case-sensitive</li>
                </ul>
            </div>
        </div>
    );
}

export default Lab2;
