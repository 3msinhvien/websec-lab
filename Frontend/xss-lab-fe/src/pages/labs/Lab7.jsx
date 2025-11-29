import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { progressAPI } from '../../services/api';
import './Lab.css';

function Lab7() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const { isAuthenticated } = useAuth();

  const submitProgress = async (payload, completed) => {
    if (!isAuthenticated() || submitting) return;
    
    setSubmitting(true);
    try {
      const response = await progressAPI.submitLab(7, payload, completed);
      if (completed && response.pointsEarned) {
        setPointsEarned(response.pointsEarned);
      }
    } catch (error) {
      console.error('Error submitting progress:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Vulnerable SQL query simulation
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    
    // Check if SQL injection is successful
    if (username.includes("'--") || username.includes("' OR '1'='1") || 
        username.includes("' OR 1=1--") || username.includes("admin'--")) {
      setResult(`✅ Đăng nhập thành công với tư cách: admin\n\nQuery thực thi: ${query}`);
      setSuccess(true);
      submitProgress(username, true);
    } else {
      setResult(`❌ Đăng nhập thất bại!\n\nQuery thực thi: ${query}\n\nKết quả: Không tìm thấy user phù hợp`);
      submitProgress(username, false);
    }
  };

  return (
    <div className="lab-container">
      <div className="lab-header">
        <h2>Lab 7: SQL Injection - Authentication Bypass</h2>
        <span className="difficulty-badge medium">Trung bình</span>
      </div>

      <div className="lab-description">
        <h3>📋 Mô tả</h3>
        <p>
          Ứng dụng sử dụng SQL query để xác thực người dùng mà không có cơ chế bảo vệ.
          Hãy tìm cách đăng nhập mà không cần biết mật khẩu.
        </p>
        
        <h3>🎯 Mục tiêu</h3>
        <p>Đăng nhập với quyền admin mà không cần biết mật khẩu</p>

        <h3>💡 Gợi ý</h3>
        <ul>
          <li>SQL query có dạng: SELECT * FROM users WHERE username='...' AND password='...'</li>
          <li>Sử dụng comment (--) để bỏ qua phần kiểm tra mật khẩu</li>
          <li>Thử payload: admin'--</li>
        </ul>
      </div>

      {success && (
        <div className="success-message">
          🎉 Chúc mừng! Bạn đã bypass authentication thành công!
          {pointsEarned > 0 && <div className="points-earned">+{pointsEarned} điểm</div>}
        </div>
      )}

      <div className="lab-content">
        <div className="login-box">
          <h3>🔐 Đăng nhập hệ thống</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập username"
                className="vulnerable-input"
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập password"
                className="vulnerable-input"
              />
            </div>

            <button type="submit" className="submit-btn">
              Đăng nhập
            </button>
          </form>

          {result && (
            <div className="result-box">
              <h4>Kết quả:</h4>
              <pre>{result}</pre>
            </div>
          )}
        </div>

        <div className="info-box">
          <h4>ℹ️ Thông tin</h4>
          <p>Username hợp lệ: <code>admin</code></p>
          <p>Password: <code>được mã hóa trong database</code></p>
        </div>
      </div>
    </div>
  );
}

export default Lab7;
