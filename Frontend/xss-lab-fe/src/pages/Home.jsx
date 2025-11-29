import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <div className="hero-section">
                <h1 className="hero-title">Chào mừng đến WebSec Lab</h1>
                <p className="hero-subtitle">
                    Nền tảng thực hành và học tập về các lỗ hổng bảo mật web
                </p>
                <Link to="/labs" className="cta-button">
                    Bắt đầu thực hành
                </Link>
            </div>

            <div className="features-section">
                <h2 className="section-title">Tính năng nổi bật</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Nhiều cấp độ</h3>
                        <p>Từ cơ bản đến nâng cao, phù hợp với mọi trình độ</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Môi trường an toàn</h3>
                        <p>Thực hành trong môi trường sandbox an toàn</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📚</div>
                        <h3>Học tập thực tế</h3>
                        <p>Các bài lab mô phỏng tình huống thực tế</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">✅</div>
                        <h3>Phản hồi ngay lập tức</h3>
                        <p>Kiểm tra giải pháp và nhận phản hồi tức thì</p>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <h2 className="section-title">Các loại lỗ hổng bảo mật</h2>
                <div className="info-content">
                    <p>
                        WebSec Lab cung cấp môi trường để thực hành với các lỗ hổng bảo mật web phổ biến nhất.
                        Bạn sẽ được học cách tấn công và phòng chống các lỗ hổng này trong môi trường an toàn.
                    </p>
                    <div className="xss-types">
                        <div className="xss-type">
                            <h4>🔴 XSS (Cross-Site Scripting)</h4>
                            <p>Chèn mã JavaScript độc hại vào trang web</p>
                        </div>
                        <div className="xss-type">
                            <h4>🟠 SQL Injection</h4>
                            <p>Thực thi câu lệnh SQL độc hại để truy cập dữ liệu</p>
                        </div>
                        <div className="xss-type">
                            <h4>🟡 IDOR</h4>
                            <p>Truy cập dữ liệu của người dùng khác thông qua ID</p>
                        </div>
                        <div className="xss-type">
                            <h4>🟢 CSRF</h4>
                            <p>Giả mạo request từ người dùng hợp lệ</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
