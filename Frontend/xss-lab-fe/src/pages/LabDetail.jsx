import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Lab1 from './labs/Lab1';
import Lab2 from './labs/Lab2';
import Lab3 from './labs/Lab3';
import Lab4 from './labs/Lab4';
import Lab5 from './labs/Lab5';
import Lab6 from './labs/Lab6';
import Lab7 from './labs/Lab7';
import Lab8 from './labs/Lab8';
import Lab9 from './labs/Lab9';
import Lab10 from './labs/Lab10';
import Lab11 from './labs/Lab11';
import Lab12 from './labs/Lab12';
import './LabDetail.css';

function LabDetail() {
    const { id } = useParams();
    const [showHint, setShowHint] = useState(false);

    const labComponents = {
        '1': Lab1,
        '2': Lab2,
        '3': Lab3,
        '4': Lab4,
        '5': Lab5,
        '6': Lab6,
        '7': Lab7,
        '8': Lab8,
        '9': Lab9,
        '10': Lab10,
        '11': Lab11,
        '12': Lab12,
    };

    const labInfo = {
        '1': {
            title: 'Lab 1: Reflected XSS - Cơ bản',
            objective: 'Khai thác lỗ hổng XSS reflected đơn giản thông qua tham số tìm kiếm',
            hint: 'Thử nhập một tag HTML script đơn giản vào ô tìm kiếm. Ví dụ: <script>alert("XSS")</script>',
        },
        '2': {
            title: 'Lab 2: Reflected XSS - Bypass Filter',
            objective: 'Vượt qua bộ lọc chặn từ khóa "script"',
            hint: 'Bộ lọc chỉ chặn từ "script" viết thường. Thử sử dụng case khác hoặc các tag HTML khác như <img> với event handler.',
        },
        '3': {
            title: 'Lab 3: Stored XSS - Comment Section',
            objective: 'Lưu trữ payload XSS trong phần bình luận',
            hint: 'Chèn payload XSS vào phần bình luận. Payload sẽ được lưu và thực thi khi người khác xem bình luận.',
        },
        '4': {
            title: 'Lab 4: DOM-based XSS',
            objective: 'Khai thác lỗ hổng XSS thông qua DOM manipulation',
            hint: 'Ứng dụng sử dụng location.hash để hiển thị nội dung. Thử thay đổi hash trong URL.',
        },
        '5': {
            title: 'Lab 5: XSS với Event Handlers',
            objective: 'Sử dụng event handlers để thực thi JavaScript',
            hint: 'Tag <script> bị chặn. Thử sử dụng tag <img> với thuộc tính onerror: <img src=x onerror="alert(1)">',
        },
        '6': {
            title: 'Lab 6: Stored XSS - Profile Page',
            objective: 'Chèn XSS payload vào trang profile',
            hint: 'Có thể chèn payload vào trường bio hoặc tên. Thử các tag HTML và event handlers khác nhau.',
        },
        '7': {
            title: 'Lab 7: SQL Injection - Authentication Bypass',
            objective: 'Đăng nhập mà không cần biết mật khẩu',
            hint: 'Thử sử dụng comment (--) để bỏ qua phần kiểm tra mật khẩu. Ví dụ: admin\'--',
        },
        '8': {
            title: 'Lab 8: SQL Injection - Data Extraction',
            objective: 'Lấy thông tin từ bảng users bằng UNION-based SQLi',
            hint: 'Sử dụng UNION SELECT để kết hợp kết quả từ bảng khác. Ví dụ: 1 UNION SELECT username, password FROM users--',
        },
        '9': {
            title: 'Lab 9: IDOR - Access Control Bypass',
            objective: 'Xem profile của người dùng khác bằng cách thay đổi ID',
            hint: 'Thay đổi tham số user_id trong URL để truy cập profile người khác',
        },
        '10': {
            title: 'Lab 10: IDOR - Order Manipulation',
            objective: 'Truy cập và sửa đổi đơn hàng không thuộc về bạn',
            hint: 'Thay đổi order_id trong URL hoặc request body để truy cập đơn hàng khác',
        },
        '11': {
            title: 'Lab 11: CSRF - Change Email',
            objective: 'Tạo form HTML để thay đổi email của nạn nhân',
            hint: 'Tạo một form tự động submit với action trỏ đến endpoint thay đổi email',
        },
        '12': {
            title: 'Lab 12: CSRF - Delete Account',
            objective: 'Tạo payload CSRF để xóa tài khoản khi nạn nhân click vào',
            hint: 'Sử dụng thẻ img hoặc form ẩn để tự động gửi request DELETE',
        },
    };

    const LabComponent = labComponents[id];
    const info = labInfo[id];

    if (!LabComponent || !info) {
        return (
            <div className="lab-detail">
                <div className="not-found">
                    <h2>Lab không tồn tại</h2>
                    <Link to="/labs" className="back-button">← Quay lại danh sách</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="lab-detail">
            <div className="lab-header">
                <Link to="/labs" className="back-button">← Quay lại danh sách</Link>
                <h1>{info.title}</h1>
                <div className="lab-objective">
                    <strong>Mục tiêu:</strong> {info.objective}
                </div>
            </div>

            <div className="lab-content">
                <div className="lab-workspace">
                    <LabComponent />
                </div>

                <div className="lab-sidebar">
                    <div className="hint-section">
                        <button
                            className="hint-button"
                            onClick={() => setShowHint(!showHint)}
                        >
                            {showHint ? '🔒 Ẩn gợi ý' : '💡 Hiện gợi ý'}
                        </button>
                        {showHint && (
                            <div className="hint-content">
                                <p>{info.hint}</p>
                            </div>
                        )}
                    </div>

                    <div className="instructions-section">
                        <h3>📖 Hướng dẫn</h3>
                        <ol>
                            <li>Đọc kỹ mục tiêu của lab</li>
                            <li>Thử nghiệm với các input khác nhau</li>
                            <li>Quan sát cách ứng dụng xử lý input</li>
                            <li>Tìm cách inject JavaScript code</li>
                            <li>Thành công khi alert box xuất hiện</li>
                        </ol>
                    </div>

                    <div className="warning-section">
                        <h3>⚠️ Lưu ý</h3>
                        <p>
                            Đây là môi trường học tập an toàn. Tuy nhiên, không sử dụng
                            các kỹ thuật này trên các website thực tế mà không có sự cho phép.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LabDetail;
