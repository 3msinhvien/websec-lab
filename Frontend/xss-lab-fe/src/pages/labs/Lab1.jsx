import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { progressAPI } from '../../services/api';
import './Lab.css';

function Lab1() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [pointsEarned, setPointsEarned] = useState(0);
    const resultRef = useRef(null);
    const { isAuthenticated } = useAuth();

    // Get search query from URL
    const query = searchParams.get('search') || '';

    useEffect(() => {
        // Update input field when URL changes
        setSearchTerm(query);

        // Vulnerable: Directly inject HTML into DOM (allows XSS)
        if (query && resultRef.current) {
            // This is intentionally vulnerable for educational purposes
            resultRef.current.innerHTML = query;

            // Check if alert was called (for img onerror or other event handlers)
            const checkSuccess = async () => {
                if (query.includes('alert') || query.includes('onerror') || query.includes('onload')) {
                    setTimeout(() => {
                        setSuccess(true);
                        submitProgress(true);
                    }, 500);
                } else {
                    submitProgress(false);
                }
            };
            checkSuccess();
        }
    }, [query]);

    const submitProgress = async (completed) => {
        if (!isAuthenticated() || submitting) return;

        setSubmitting(true);
        try {
            const response = await progressAPI.submitLab(1, query, completed);
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
        // Update URL with search term (Reflected XSS)
        setSearchParams({ search: searchTerm });
    };

    return (
        <div className="lab-container">
            <h2>Tìm kiếm sản phẩm</h2>
            <p className="lab-description">
                Trang web này có chức năng tìm kiếm sản phẩm. Hãy thử tìm một lỗ hổng XSS reflected thông qua URL.
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

            {query && (
                <div className="search-results">
                    <h3>Kết quả tìm kiếm cho:</h3>
                    {/* Vulnerable: Direct innerHTML injection */}
                    <div className="search-term" ref={resultRef}></div>
                    <p className="no-results">Không tìm thấy sản phẩm nào.</p>
                </div>
            )}

            {success && (
                <div className="success-message">
                    🎉 Chúc mừng! Bạn đã khai thác thành công lỗ hổng XSS!
                    {pointsEarned > 0 && <div className="points-earned">+{pointsEarned} điểm</div>}
                </div>
            )}

            <div className="lab-info">
                <h4>🎯 Mục tiêu</h4>
                <p>Thực hiện được alert box thông qua URL parameter</p>
                <h4>💡 Gợi ý</h4>
                <p>Thử payload: <code>&lt;img src=x onerror="alert('XSS')"&gt;</code></p>
                <p>Payload được truyền qua URL parameter <code>?search=...</code></p>
            </div>
        </div>
    );
}

export default Lab1;
