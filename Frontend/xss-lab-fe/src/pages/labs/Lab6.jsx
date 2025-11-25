import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { progressAPI } from '../../services/api';
import './Lab.css';

function Lab6() {
    const [profile, setProfile] = useState({
        name: 'Nguyễn Văn A',
        bio: 'Xin chào! Tôi là sinh viên IT',
        website: 'https://example.com'
    });

    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ ...profile });
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [pointsEarned, setPointsEarned] = useState(0);
    const nameRef = useRef(null);
    const bioRef = useRef(null);
    const websiteRef = useRef(null);
    const { isAuthenticated } = useAuth();

    const submitProgress = async (payload, completed) => {
        if (!isAuthenticated() || submitting) return;

        setSubmitting(true);
        try {
            const response = await progressAPI.submitLab(6, payload, completed);
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
        if (!editing) {
            if (nameRef.current) nameRef.current.innerHTML = profile.name;
            if (bioRef.current) bioRef.current.innerHTML = profile.bio;
            if (websiteRef.current) websiteRef.current.innerHTML = profile.website;

            const hasXSS = profile.name.includes('alert') || profile.name.includes('onerror') ||
                profile.bio.includes('alert') || profile.bio.includes('onerror') ||
                profile.website.includes('alert') || profile.website.includes('onerror');

            if (hasXSS) {
                const payload = `name:${profile.name}|bio:${profile.bio}|website:${profile.website}`;
                setTimeout(() => {
                    setSuccess(true);
                    submitProgress(payload, true);
                }, 500);
            }
        }
    }, [profile, editing]);

    const handleSave = (e) => {
        e.preventDefault();
        setProfile({ ...formData });
        setEditing(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="lab-container">
            <h2>Trang Profile Cá Nhân</h2>
            <p className="lab-description">
                Đây là trang profile cho phép người dùng cập nhật thông tin cá nhân.
                Hãy tìm cách chèn payload XSS vào profile!
            </p>

            <div className="profile-section">
                {!editing ? (
                    <div className="profile-view">
                        <div className="profile-header">
                            <div className="profile-avatar">👤</div>
                            <div className="profile-info">
                                <h3 ref={nameRef}></h3>
                                <button
                                    onClick={() => setEditing(true)}
                                    className="edit-button"
                                >
                                    ✏️ Chỉnh sửa
                                </button>
                            </div>
                        </div>

                        <div className="profile-content">
                            <div className="profile-field">
                                <strong>Giới thiệu:</strong>
                                <div className="profile-bio" ref={bioRef}></div>
                            </div>

                            <div className="profile-field">
                                <strong>Website:</strong>
                                <div className="profile-website" ref={websiteRef}></div>
                            </div>
                        </div>

                        {success && (
                            <div className="success-message" style={{ marginTop: '1.5rem' }}>
                                🎉 Chúc mừng! Bạn đã khai thác thành công Stored XSS trên Profile!
                                {pointsEarned > 0 && <div className="points-earned">+{pointsEarned} điểm</div>}
                            </div>
                        )}
                    </div>
                ) : (
                    <form onSubmit={handleSave} className="profile-edit">
                        <h3>Chỉnh sửa Profile</h3>

                        <div className="form-group">
                            <label>Tên hiển thị:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="profile-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Giới thiệu:</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="4"
                                className="profile-textarea"
                            />
                        </div>

                        <div className="form-group">
                            <label>Website:</label>
                            <input
                                type="text"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="profile-input"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="save-button">💾 Lưu</button>
                            <button
                                type="button"
                                onClick={() => {
                                    setEditing(false);
                                    setFormData({ ...profile });
                                }}
                                className="cancel-button"
                            >
                                ❌ Hủy
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <div className="lab-info">
                <h4>🎯 Mục tiêu</h4>
                <p>Chèn payload XSS vào các trường profile và thực thi thành công</p>
                <h4>💡 Điểm tấn công</h4>
                <ul>
                    <li>Trường "Tên hiển thị" - hiển thị trong header</li>
                    <li>Trường "Giới thiệu" - có thể chứa HTML</li>
                    <li>Trường "Website" - có thể inject thông qua link</li>
                </ul>
                <h4>⚠️ Lưu ý</h4>
                <p>Đây là Stored XSS - payload được lưu trong profile và ảnh hưởng đến tất cả người xem</p>
            </div>
        </div>
    );
}

export default Lab6;
