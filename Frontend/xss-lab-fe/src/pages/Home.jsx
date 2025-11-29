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
                        <h3>12 Labs Thực Hành</h3>
                        <p>6 XSS + 2 SQLi + 2 IDOR + 2 CSRF - Tổng 255 điểm</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Nhiều cấp độ</h3>
                        <p>Dễ (10-15đ), Trung bình (20-25đ), Khó (30-35đ)</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Môi trường an toàn</h3>
                        <p>Thực hành trong môi trường sandbox an toàn</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🏆</div>
                        <h3>Bảng xếp hạng</h3>
                        <p>Cạnh tranh và theo dõi tiến độ học tập</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📚</div>
                        <h3>Học tập thực tế</h3>
                        <p>Các bài lab mô phỏng tình huống thực tế</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">✅</div>
                        <h3>Tự động chấm điểm</h3>
                        <p>Nhận điểm và phản hồi ngay lập tức</p>
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
                            <h4>🔴 XSS - 6 Labs (130đ)</h4>
                            <p>Reflected, Stored, DOM-based XSS và bypass techniques</p>
                        </div>
                        <div className="xss-type">
                            <h4>🟠 SQL Injection - 2 Labs (60đ)</h4>
                            <p>Authentication bypass và UNION-based data extraction</p>
                        </div>
                        <div className="xss-type">
                            <h4>🟡 IDOR - 2 Labs (35đ)</h4>
                            <p>Access control bypass và order manipulation</p>
                        </div>
                        <div className="xss-type">
                            <h4>🟢 CSRF - 2 Labs (55đ)</h4>
                            <p>Email change và account deletion attacks</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
