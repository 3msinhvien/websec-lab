import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <div className="hero-section">
                <h1 className="hero-title">Chào mừng đến XSS Security Lab</h1>
                <p className="hero-subtitle">
                    Nền tảng thực hành và học tập về các lỗ hổng Cross-Site Scripting (XSS)
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
                <h2 className="section-title">XSS là gì?</h2>
                <div className="info-content">
                    <p>
                        Cross-Site Scripting (XSS) là một trong những lỗ hổng bảo mật web phổ biến nhất.
                        XSS cho phép kẻ tấn công chèn mã độc (thường là JavaScript) vào các trang web được
                        xem bởi người dùng khác.
                    </p>
                    <div className="xss-types">
                        <div className="xss-type">
                            <h4>🔴 Reflected XSS</h4>
                            <p>Script độc được phản chiếu từ request và thực thi ngay lập tức</p>
                        </div>
                        <div className="xss-type">
                            <h4>🟠 Stored XSS</h4>
                            <p>Script độc được lưu trữ trên server và thực thi khi người dùng truy cập</p>
                        </div>
                        <div className="xss-type">
                            <h4>🟡 DOM-based XSS</h4>
                            <p>Lỗ hổng xảy ra ở phía client, trong DOM environment</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
