import { Link } from 'react-router-dom';
import './LabList.css';

function LabList() {
    const labs = [
        {
            id: 1,
            title: 'Lab 1: Reflected XSS - Cơ bản',
            difficulty: 'Dễ',
            type: 'Reflected XSS',
            description: 'Tìm và khai thác lỗ hổng XSS reflected đơn giản thông qua tham số URL',
            color: '#4CAF50'
        },
        {
            id: 2,
            title: 'Lab 2: Reflected XSS - Bypass Filter',
            difficulty: 'Trung bình',
            type: 'Reflected XSS',
            description: 'Vượt qua bộ lọc đơn giản để thực hiện tấn công XSS',
            color: '#FF9800'
        },
        {
            id: 3,
            title: 'Lab 3: Stored XSS - Comment Section',
            difficulty: 'Trung bình',
            type: 'Stored XSS',
            description: 'Lưu trữ payload XSS trong phần bình luận của ứng dụng',
            color: '#FF9800'
        },
        {
            id: 4,
            title: 'Lab 4: DOM-based XSS',
            difficulty: 'Trung bình',
            type: 'DOM XSS',
            description: 'Khai thác lỗ hổng XSS dựa trên DOM manipulation',
            color: '#FF9800'
        },
        {
            id: 5,
            title: 'Lab 5: XSS với Event Handlers',
            difficulty: 'Khó',
            type: 'Reflected XSS',
            description: 'Sử dụng event handlers để thực thi mã JavaScript',
            color: '#F44336'
        },
        {
            id: 6,
            title: 'Lab 6: Stored XSS - Profile Page',
            difficulty: 'Khó',
            type: 'Stored XSS',
            description: 'Chèn XSS payload vào trang profile của người dùng',
            color: '#F44336'
        },
        {
            id: 7,
            title: 'Lab 7: SQL Injection - Authentication Bypass',
            difficulty: 'Trung bình',
            type: 'SQL Injection',
            description: 'Bypass cơ chế xác thực bằng SQL Injection',
            color: '#FF9800'
        },
        {
            id: 8,
            title: 'Lab 8: SQL Injection - Data Extraction',
            difficulty: 'Khó',
            type: 'SQL Injection',
            description: 'Trích xuất dữ liệu nhạy cảm từ cơ sở dữ liệu',
            color: '#F44336'
        },
        {
            id: 9,
            title: 'Lab 9: IDOR - Access Control Bypass',
            difficulty: 'Dễ',
            type: 'IDOR',
            description: 'Truy cập thông tin người dùng khác thông qua ID',
            color: '#4CAF50'
        },
        {
            id: 10,
            title: 'Lab 10: IDOR - Order Manipulation',
            difficulty: 'Trung bình',
            type: 'IDOR',
            description: 'Xem và chỉnh sửa đơn hàng của người dùng khác',
            color: '#FF9800'
        },
        {
            id: 11,
            title: 'Lab 11: CSRF - Change Email',
            difficulty: 'Trung bình',
            type: 'CSRF',
            description: 'Thực hiện tấn công CSRF để thay đổi email người dùng',
            color: '#FF9800'
        },
        {
            id: 12,
            title: 'Lab 12: CSRF - Delete Account',
            difficulty: 'Khó',
            type: 'CSRF',
            description: 'Thực hiện tấn công CSRF để xóa tài khoản người dùng',
            color: '#F44336'
        }
    ];

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Dễ': return '#4CAF50';
            case 'Trung bình': return '#FF9800';
            case 'Khó': return '#F44336';
            default: return '#999';
        }
    };

    return (
        <div className="lab-list">
            <div className="lab-list-header">
                <h1>Danh sách Lab Bảo Mật Web</h1>
                <p>Chọn một lab để bắt đầu thực hành</p>
            </div>

            <div className="labs-grid">
                {labs.map((lab) => (
                    <Link to={`/lab/${lab.id}`} key={lab.id} className="lab-card">
                        <div className="lab-card-header" style={{ borderLeftColor: lab.color }}>
                            <h3>{lab.title}</h3>
                            <span
                                className="difficulty-badge"
                                style={{ backgroundColor: getDifficultyColor(lab.difficulty) }}
                            >
                                {lab.difficulty}
                            </span>
                        </div>
                        <div className="lab-card-body">
                            <span className="lab-type">{lab.type}</span>
                            <p className="lab-description">{lab.description}</p>
                        </div>
                        <div className="lab-card-footer">
                            <span className="start-lab">Bắt đầu →</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default LabList;
