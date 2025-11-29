import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { progressAPI } from '../../services/api';
import './Lab.css';

function Lab10() {
  const [orderId, setOrderId] = useState('');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editAddress, setEditAddress] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const { isAuthenticated } = useAuth();

  const orders = [
    {
      id: 101,
      userId: 1,
      customer: 'Bạn',
      items: 'Laptop Dell XPS, Mouse Logitech',
      total: '$1250',
      address: '123 Đường ABC, Hà Nội',
      status: 'Đang giao'
    },
    {
      id: 102,
      userId: 2,
      customer: 'Nguyễn Văn A',
      items: 'iPhone 15 Pro, AirPods Pro',
      total: '$1200',
      address: '456 Đường XYZ, TP.HCM',
      status: 'Đã xác nhận'
    },
    {
      id: 103,
      userId: 3,
      customer: 'Trần Thị B',
      items: 'Samsung Galaxy S24, Smart Watch',
      total: '$1100',
      address: '789 Đường DEF, Đà Nẵng',
      status: 'Đang xử lý'
    }
  ];

  const submitProgress = async (payload, completed) => {
    if (!isAuthenticated() || submitting) return;
    
    setSubmitting(true);
    try {
      const response = await progressAPI.submitLab(10, payload, completed);
      if (completed && response.pointsEarned) {
        setPointsEarned(response.pointsEarned);
      }
    } catch (error) {
      console.error('Error submitting progress:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewOrder = (e) => {
    e.preventDefault();
    const order = orders.find(o => o.id === parseInt(orderId));
    
    if (order) {
      setCurrentOrder(order);
      setEditAddress(order.address);
      
      // Check if accessing other user's order
      if (order.userId !== 1) {
        setSuccess(true);
        submitProgress(`order_id=${orderId}`, true);
      } else {
        submitProgress(`order_id=${orderId}`, false);
      }
    } else {
      setCurrentOrder(null);
      alert('Không tìm thấy đơn hàng');
    }
  };

  const handleUpdateAddress = () => {
    if (currentOrder) {
      alert(`✅ Đã cập nhật địa chỉ giao hàng của đơn ${currentOrder.id}\nĐịa chỉ mới: ${editAddress}`);
      setEditing(false);
    }
  };

  return (
    <div className="lab-container">
      <div className="lab-header">
        <h2>Lab 10: IDOR - Order Manipulation</h2>
        <span className="difficulty-badge medium">Trung bình</span>
      </div>

      <div className="lab-description">
        <h3>📋 Mô tả</h3>
        <p>
          Hệ thống quản lý đơn hàng cho phép xem và chỉnh sửa thông tin đơn hàng dựa trên order_id.
          Không có kiểm tra xem đơn hàng có thuộc về người dùng hiện tại hay không.
        </p>
        
        <h3>🎯 Mục tiêu</h3>
        <p>Truy cập và xem (hoặc sửa) đơn hàng không thuộc về bạn</p>

        <h3>💡 Gợi ý</h3>
        <ul>
          <li>Đơn hàng của bạn có ID: 101</li>
          <li>Thử truy cập đơn hàng với ID khác: 102, 103</li>
          <li>Thử chỉnh sửa địa chỉ giao hàng của đơn hàng người khác</li>
        </ul>
      </div>

      {success && (
        <div className="success-message">
          🎉 Chúc mừng! Bạn đã truy cập đơn hàng của người khác!
          {pointsEarned > 0 && <div className="points-earned">+{pointsEarned} điểm</div>}
        </div>
      )}

      <div className="lab-content">
        <div className="order-lookup">
          <h3>🔍 Tra cứu đơn hàng</h3>
          <form onSubmit={handleViewOrder}>
            <div className="form-group">
              <label>Order ID:</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Nhập ID đơn hàng"
                className="vulnerable-input"
              />
            </div>
            <button type="submit" className="submit-btn">
              Xem đơn hàng
            </button>
          </form>
        </div>

        {currentOrder && (
          <div className="order-card">
            <h3>📦 Chi tiết đơn hàng #{currentOrder.id}</h3>
            <div className="order-info">
              <div className="info-row">
                <strong>Khách hàng:</strong>
                <span>{currentOrder.customer}</span>
              </div>
              <div className="info-row">
                <strong>Sản phẩm:</strong>
                <span>{currentOrder.items}</span>
              </div>
              <div className="info-row">
                <strong>Tổng tiền:</strong>
                <span>{currentOrder.total}</span>
              </div>
              <div className="info-row">
                <strong>Trạng thái:</strong>
                <span className="status">{currentOrder.status}</span>
              </div>
              <div className="info-row">
                <strong>Địa chỉ giao hàng:</strong>
                {editing ? (
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="vulnerable-input"
                    style={{marginLeft: '0.5rem'}}
                  />
                ) : (
                  <span>{currentOrder.address}</span>
                )}
              </div>
            </div>

            <div className="order-actions">
              {!editing ? (
                <button onClick={() => setEditing(true)} className="edit-btn">
                  ✏️ Sửa địa chỉ giao hàng
                </button>
              ) : (
                <>
                  <button onClick={handleUpdateAddress} className="save-btn">
                    ✅ Lưu thay đổi
                  </button>
                  <button onClick={() => setEditing(false)} className="cancel-btn">
                    ❌ Hủy
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="info-box">
          <h4>ℹ️ Thông tin</h4>
          <p>Đơn hàng của bạn: <code>#101</code></p>
          <p>Các đơn hàng khác: <code>#102, #103</code></p>
          <p style={{marginTop: '0.5rem', color: '#F44336'}}>
            ⚠️ Lỗ hổng IDOR cho phép bạn xem và chỉnh sửa đơn hàng của người khác
            mà không cần xác thực quyền sở hữu.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Lab10;
