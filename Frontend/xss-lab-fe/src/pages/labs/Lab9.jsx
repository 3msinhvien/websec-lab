import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { progressAPI } from '../../services/api';
import './Lab.css';

function Lab9() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const { isAuthenticated } = useAuth();

  const users = [
    {
      id: 1,
      name: 'Bạn (Current User)',
      email: 'your@email.com',
      phone: '0123456789',
      address: '123 Đường ABC, Hà Nội'
    },
    {
      id: 2,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0987654321',
      address: '456 Đường XYZ, TP.HCM',
      ssn: '123-45-6789'
    },
    {
      id: 3,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0912345678',
      address: '789 Đường DEF, Đà Nẵng',
      ssn: '987-65-4321'
    }
  ];

  const submitProgress = async (userId, completed) => {
    if (!isAuthenticated() || submitting) return;

    setSubmitting(true);
    try {
      const response = await progressAPI.submitLab(9, `user_id=${userId}`, completed);
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
    const userId = parseInt(searchParams.get('user_id')) || 1;
    const user = users.find(u => u.id === userId);

    if (user) {
      setCurrentUser(user);

      // Check if accessed other user's profile
      if (userId !== 1) {
        setSuccess(true);
        submitProgress(userId, true);
      } else {
        submitProgress(userId, false);
      }
    }
  }, [searchParams]);

  const changeUser = (userId) => {
    setSearchParams({ user_id: userId });
  };

  return (
    <div className="lab-container">
      <div className="lab-header">
        <h2>Lab 9: IDOR - Access Control Bypass</h2>
        <span className="difficulty-badge easy">Dễ</span>
      </div>

      <div className="lab-description">
        <h3>📋 Mô tả</h3>
        <p>
          Ứng dụng hiển thị thông tin profile dựa trên tham số user_id trong URL.
          Không có kiểm tra quyền truy cập, cho phép xem profile của bất kỳ ai.
        </p>

        <h3>🎯 Mục tiêu</h3>
        <p>Truy cập và xem thông tin profile của người dùng khác</p>

        <h3>💡 Gợi ý</h3>
        <ul>
          <li>Quan sát tham số user_id trong URL</li>
          <li>Thử thay đổi giá trị user_id thành 2 hoặc 3</li>
          <li>URL mẫu: ?user_id=2</li>
        </ul>
      </div>

      {success && (
        <div className="success-message">
          🎉 Chúc mừng! Bạn đã truy cập thành công profile của người khác!
          {pointsEarned > 0 && <div className="points-earned">+{pointsEarned} điểm</div>}
        </div>
      )}

      <div className="lab-content">
        {currentUser && (
          <div className="profile-card">
            <h3>👤 Thông tin Profile</h3>
            <div className="profile-info">
              <div className="info-row">
                <strong>User ID:</strong>
                <span>{currentUser.id}</span>
              </div>
              <div className="info-row">
                <strong>Tên:</strong>
                <span>{currentUser.name}</span>
              </div>
              <div className="info-row">
                <strong>Email:</strong>
                <span>{currentUser.email}</span>
              </div>
              <div className="info-row">
                <strong>Số điện thoại:</strong>
                <span>{currentUser.phone}</span>
              </div>
              <div className="info-row">
                <strong>Địa chỉ:</strong>
                <span>{currentUser.address}</span>
              </div>
              {currentUser.ssn && (
                <div className="info-row sensitive">
                  <strong>🔒 SSN (Nhạy cảm):</strong>
                  <span>{currentUser.ssn}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="quick-access">
          <h4>⚡ Quick Access (để test)</h4>
          <div className="button-group">
            <button onClick={() => changeUser(1)} className="access-btn">
              User 1 (Bạn)
            </button>
            <button onClick={() => changeUser(2)} className="access-btn">
              User 2
            </button>
            <button onClick={() => changeUser(3)} className="access-btn">
              User 3
            </button>
          </div>
        </div>

        <div className="info-box">
          <h4>ℹ️ Vulnerability</h4>
          <p>
            <strong>IDOR (Insecure Direct Object Reference)</strong> xảy ra khi ứng dụng
            không kiểm tra quyền truy cập trước khi trả về dữ liệu dựa trên ID do user cung cấp.
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            Trong trường hợp này, bạn có thể xem thông tin nhạy cảm của người khác
            chỉ bằng cách thay đổi tham số user_id trong URL.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Lab9;
