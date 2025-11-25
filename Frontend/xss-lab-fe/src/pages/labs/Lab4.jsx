import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { progressAPI } from '../../services/api';
import './Lab.css';

function Lab4() {
    const [content, setContent] = useState('');
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [pointsEarned, setPointsEarned] = useState(0);
    const contentRef = useRef(null);
    const { isAuthenticated } = useAuth();

    const submitProgress = async (payload, completed) => {
        if (!isAuthenticated() || submitting) return;

        setSubmitting(true);
        try {
            const response = await progressAPI.submitLab(4, payload, completed);
            if (completed && response.pointsEarned) {
                setPointsEarned(response.pointsEarned);
            }
        } catch (error) {
            console.error('Error submitting progress:', error);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        // Vulnerable: Using location.hash without sanitization
        const updateContent = () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const decoded = decodeURIComponent(hash);
                setContent(decoded);

                if (contentRef.current) {
                    contentRef.current.innerHTML = decoded;

                    const isXSS = decoded.includes('alert') || decoded.includes('onerror') || decoded.includes('onload');
                    if (isXSS) {
                        setTimeout(() => {
                            setSuccess(true);
                            submitProgress(decoded, true);
                        }, 500);
                    } else {
                        submitProgress(decoded, false);
                    }
                }
            }
        };

        updateContent();
        window.addEventListener('hashchange', updateContent);

        return () => {
            window.removeEventListener('hashchange', updateContent);
        };
    }, []);

    return (
        <div className="lab-container">
            <h2>Trang hiển thị động</h2>
            <p className="lab-description">
                Trang này sử dụng URL hash để hiển thị nội dung động.
                Hãy thử khai thác lỗ hổng DOM-based XSS!
            </p>

            <div className="dynamic-content-section">
                <h3>📄 Nội dung hiển thị</h3>
                {content ? (
                    <div className="content-display">
                        {/* Vulnerable: DOM-based XSS */}
                        <div ref={contentRef}></div>
                    </div>
                ) : (
                    <div className="placeholder">
                        <p>Chưa có nội dung. Thử thêm #&lt;nội dung&gt; vào URL</p>
                        <p className="example">Ví dụ: #Hello World</p>
                    </div>
                )}
            </div>

            <div className="url-info">
                <h4>🔗 URL hiện tại:</h4>
                <code className="url-display">{window.location.href}</code>
            </div>

            {success && (
                <div className="success-message">
                    🎉 Chúc mừng! Bạn đã khai thác thành công DOM-based XSS!
                    {pointsEarned > 0 && <div className="points-earned">+{pointsEarned} điểm</div>}
                </div>
            )}

            <div className="lab-info">
                <h4>🎯 Mục tiêu</h4>
                <p>Khai thác lỗ hổng DOM-based XSS thông qua URL hash</p>
                <h4>💡 Gợi ý</h4>
                <ul>
                    <li>Thay đổi phần hash (#) trong URL</li>
                    <li>Ứng dụng sử dụng location.hash để hiển thị nội dung</li>
                    <li>Thử inject HTML/JavaScript vào hash</li>
                </ul>
            </div>
        </div>
    );
}

export default Lab4;
