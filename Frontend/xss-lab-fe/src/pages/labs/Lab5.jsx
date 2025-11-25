import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { progressAPI } from '../../services/api';
import './Lab.css';

function Lab5() {
    const [imageName, setImageName] = useState('');
    const [displayImage, setDisplayImage] = useState('');
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [pointsEarned, setPointsEarned] = useState(0);
    const imageRef = useRef(null);
    const { isAuthenticated } = useAuth();

    const submitProgress = async (payload, completed) => {
        if (!isAuthenticated() || submitting) return;

        setSubmitting(true);
        try {
            const response = await progressAPI.submitLab(5, payload, completed);
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
        if (displayImage && imageRef.current) {
            imageRef.current.innerHTML = displayImage;

            const isXSS = displayImage.includes('alert') || displayImage.includes('onerror') || displayImage.includes('onload');
            if (isXSS) {
                setTimeout(() => {
                    setSuccess(true);
                    submitProgress(displayImage, true);
                }, 500);
            } else {
                submitProgress(displayImage, false);
            }
        }
    }, [displayImage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(false);

        // Filter blocks <script> tags
        const filtered = imageName.replace(/<script[^>]*>.*?<\/script>/gi, '');
        setDisplayImage(filtered);
    };

    return (
        <div className="lab-container">
            <h2>Trình xem ảnh</h2>
            <p className="lab-description">
                Ứng dụng này cho phép bạn xem ảnh bằng cách nhập tên file.
                Tag &lt;script&gt; đã bị chặn, nhưng có cách khác để thực thi JavaScript!
            </p>

            <form onSubmit={handleSubmit} className="image-form">
                <label htmlFor="imageName">Nhập tên file ảnh:</label>
                <input
                    type="text"
                    id="imageName"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                    placeholder="Ví dụ: photo.jpg"
                    className="image-input"
                />
                <button type="submit" className="image-button">Xem ảnh</button>
            </form>

            {displayImage && (
                <div className="image-display">
                    <h3>Ảnh của bạn:</h3>
                    {/* Vulnerable to XSS via event handlers */}
                    <div ref={imageRef}></div>
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
                <p>Thực thi JavaScript mà không sử dụng tag &lt;script&gt;</p>
                <h4>💡 Kỹ thuật có thể dùng</h4>
                <ul>
                    <li>Event handlers: onerror, onload, onclick, onmouseover...</li>
                    <li>Tag &lt;img&gt; với src không hợp lệ + onerror</li>
                    <li>Tag &lt;svg&gt; với event handlers</li>
                    <li>Tag &lt;iframe&gt; với src="javascript:..."</li>
                </ul>
                <h4>📝 Ví dụ</h4>
                <code className="code-example">
                    &lt;img src=x onerror="alert('XSS')"&gt;
                </code>
            </div>
        </div>
    );
}

export default Lab5;
