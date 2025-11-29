import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { progressAPI } from '../../services/api';
import './Lab.css';

function Lab8() {
  const [productId, setProductId] = useState('');
  const [result, setResult] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const { isAuthenticated } = useAuth();

  const products = [
    { id: 1, name: 'Laptop Dell XPS', price: '$1200' },
    { id: 2, name: 'iPhone 15 Pro', price: '$999' },
    { id: 3, name: 'Samsung Galaxy S24', price: '$899' }
  ];

  const hiddenUsers = [
    { username: 'admin', password: 'admin123!@#', role: 'Administrator' },
    { username: 'john_doe', password: 'johnpass456', role: 'User' },
    { username: 'alice', password: 'alice789xyz', role: 'User' }
  ];

  const submitProgress = async (payload, completed) => {
    if (!isAuthenticated() || submitting) return;

    setSubmitting(true);
    try {
      const response = await progressAPI.submitLab(8, payload, completed);
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

    const query = `SELECT name, price FROM products WHERE id=${productId}`;

    // Check for UNION-based SQL injection
    if (productId.includes('UNION') || productId.includes('union')) {
      const extractedData = hiddenUsers.map(u =>
        `${u.username} | ${u.password} | ${u.role}`
      ).join('\n');

      setResult(
        `✅ SQL Injection thành công!\n\n` +
        `Query thực thi: ${query}\n\n` +
        `📊 Dữ liệu từ bảng users:\n` +
        `${'='.repeat(50)}\n` +
        `Username | Password | Role\n` +
        `${'-'.repeat(50)}\n` +
        `${extractedData}`
      );
      setSuccess(true);
      submitProgress(productId, true);
    } else if (productId && !isNaN(productId)) {
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
        setResult(
          `Query thực thi: ${query}\n\n` +
          `📦 Sản phẩm tìm thấy:\n` +
          `Tên: ${product.name}\n` +
          `Giá: ${product.price}`
        );
      } else {
        setResult(`Query thực thi: ${query}\n\nKhông tìm thấy sản phẩm`);
      }
      submitProgress(productId, false);
    } else {
      setResult('Vui lòng nhập ID hợp lệ');
    }
  };

  return (
    <div className="lab-container">
      <div className="lab-header">
        <h2>Lab 8: SQL Injection - Data Extraction</h2>
        <span className="difficulty-badge hard">Khó</span>
      </div>

      <div className="lab-description">
        <h3>📋 Mô tả</h3>
        <p>
          Ứng dụng cho phép tìm kiếm sản phẩm theo ID. Database chứa nhiều bảng khác nhau,
          bao gồm bảng users với thông tin nhạy cảm. Hãy trích xuất dữ liệu từ bảng users.
        </p>

        <h3>🎯 Mục tiêu</h3>
        <p>Sử dụng UNION-based SQLi để lấy username và password từ bảng users</p>

        <h3>💡 Gợi ý</h3>
        <ul>
          <li>Sử dụng UNION SELECT để kết hợp kết quả từ bảng khác</li>
          <li>Số cột trong UNION phải khớp với query gốc (2 cột: name, price)</li>
          <li>Thử: <code>1 UNION SELECT username, password FROM users--</code></li>
          <li>Có thể cần thêm NULL: <code>-1 UNION SELECT username, password FROM users--</code></li>
        </ul>
      </div>

      {success && (
        <div className="success-message">
          🎉 Chúc mừng! Bạn đã trích xuất dữ liệu thành công!
          {pointsEarned > 0 && <div className="points-earned">+{pointsEarned} điểm</div>}
        </div>
      )}

      <div className="lab-content">
        <div className="search-box">
          <h3>🔍 Tìm kiếm sản phẩm</h3>
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label>Product ID:</label>
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Nhập ID sản phẩm (1-3)"
                className="vulnerable-input"
              />
            </div>

            <button type="submit" className="submit-btn">
              Tìm kiếm
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
          <h4>📦 Danh sách sản phẩm</h4>
          <ul>
            {products.map(p => (
              <li key={p.id}>ID {p.id}: {p.name} - {p.price}</li>
            ))}
          </ul>

          <h4 style={{ marginTop: '1rem' }}>🗄️ Cấu trúc Database</h4>
          <p><strong>Bảng products:</strong> id, name, price</p>
          <p><strong>Bảng users:</strong> username, password, role</p>
        </div>
      </div>
    </div>
  );
}

export default Lab8;
