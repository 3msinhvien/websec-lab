import './About.css';

function About() {
    return (
        <div className="about">
            <div className="about-container">
                <h1>Giới thiệu về WebSec Lab</h1>

                <section className="about-section">
                    <h2>🎯 Mục đích</h2>
                    <p>
                        WebSec Lab được thiết kế để cung cấp một môi trường học tập an toàn và
                        thực hành cho sinh viên, lập trình viên và những người quan tâm đến bảo mật web.
                        Thông qua các bài lab thực hành, bạn sẽ hiểu rõ hơn về cách các lỗ hổng bảo mật web
                        hoạt động và cách phòng chống chúng.
                    </p>
                </section>

                <section className="about-section">
                    <h2>📚 Nội dung học tập</h2>
                    <div className="content-grid">
                        <div className="content-item">
                            <h3>XSS (Cross-Site Scripting)</h3>
                            <p>Học cách tìm kiếm và khai thác các lỗ hổng XSS trong ứng dụng web</p>
                        </div>
                        <div className="content-item">
                            <h3>SQL Injection</h3>
                            <p>Thực hành với các kỹ thuật tấn công vào cơ sở dữ liệu</p>
                        </div>
                        <div className="content-item">
                            <h3>IDOR</h3>
                            <p>Khám phá cách truy cập trái phép vào dữ liệu của người khác</p>
                        </div>
                        <div className="content-item">
                            <h3>CSRF</h3>
                            <p>Học cách giả mạo request và phòng chống CSRF</p>
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <h2>⚠️ Lưu ý quan trọng</h2>
                    <div className="warning-box">
                        <p>
                            <strong>Sử dụng có trách nhiệm:</strong> Các kỹ thuật được dạy trong lab này
                            chỉ được sử dụng cho mục đích học tập và trong môi trường được phép.
                            Việc sử dụng các kỹ thuật này để tấn công các hệ thống không được phép là
                            bất hợp pháp và có thể dẫn đến hậu quả pháp lý nghiêm trọng.
                        </p>
                    </div>
                </section>

                <section className="about-section">
                    <h2>🛡️ Cách phòng chống</h2>
                    <ul className="prevention-list">
                        <li>
                            <strong>Input Validation:</strong> Luôn validate và sanitize dữ liệu đầu vào
                        </li>
                        <li>
                            <strong>Output Encoding:</strong> Encode dữ liệu trước khi hiển thị trên trang web
                        </li>
                        <li>
                            <strong>Prepared Statements:</strong> Sử dụng parameterized queries cho SQL
                        </li>
                        <li>
                            <strong>Access Control:</strong> Kiểm tra quyền truy cập trước khi trả dữ liệu
                        </li>
                        <li>
                            <strong>CSRF Tokens:</strong> Sử dụng token để xác thực request
                        </li>
                        <li>
                            <strong>Security Headers:</strong> Cấu hình CSP, X-Frame-Options, etc.
                        </li>
                    </ul>
                </section>

                <section className="about-section">
                    <h2>👥 Đối tượng học viên</h2>
                    <p>
                        Lab này phù hợp với sinh viên công nghệ thông tin, lập trình viên web,
                        chuyên gia bảo mật, và bất kỳ ai muốn tìm hiểu về bảo mật ứng dụng web.
                        Không yêu cầu kiến thức chuyên sâu, nhưng hiểu biết cơ bản về HTML,
                        JavaScript và cách web hoạt động sẽ giúp bạn học tốt hơn.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default About;
