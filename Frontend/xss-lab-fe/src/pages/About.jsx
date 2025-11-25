import './About.css';

function About() {
    return (
        <div className="about">
            <div className="about-container">
                <h1>Giới thiệu về XSS Security Lab</h1>

                <section className="about-section">
                    <h2>🎯 Mục đích</h2>
                    <p>
                        XSS Security Lab được thiết kế để cung cấp một môi trường học tập an toàn và
                        thực hành cho sinh viên, lập trình viên và những người quan tâm đến bảo mật web.
                        Thông qua các bài lab thực hành, bạn sẽ hiểu rõ hơn về cách các lỗ hổng XSS
                        hoạt động và cách phòng chống chúng.
                    </p>
                </section>

                <section className="about-section">
                    <h2>📚 Nội dung học tập</h2>
                    <div className="content-grid">
                        <div className="content-item">
                            <h3>Reflected XSS</h3>
                            <p>Học cách tìm kiếm và khai thác các lỗ hổng XSS reflected trong ứng dụng web</p>
                        </div>
                        <div className="content-item">
                            <h3>Stored XSS</h3>
                            <p>Thực hành với các lỗ hổng XSS được lưu trữ trong cơ sở dữ liệu</p>
                        </div>
                        <div className="content-item">
                            <h3>DOM-based XSS</h3>
                            <p>Khám phá các lỗ hổng XSS dựa trên DOM và cách khai thác chúng</p>
                        </div>
                        <div className="content-item">
                            <h3>Bypass Techniques</h3>
                            <p>Học các kỹ thuật vượt qua bộ lọc và cơ chế bảo vệ</p>
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
                    <h2>🛡️ Cách phòng chống XSS</h2>
                    <ul className="prevention-list">
                        <li>
                            <strong>Input Validation:</strong> Luôn validate và sanitize dữ liệu đầu vào
                        </li>
                        <li>
                            <strong>Output Encoding:</strong> Encode dữ liệu trước khi hiển thị trên trang web
                        </li>
                        <li>
                            <strong>Content Security Policy (CSP):</strong> Sử dụng CSP để hạn chế nguồn script
                        </li>
                        <li>
                            <strong>HttpOnly Cookies:</strong> Bảo vệ cookies khỏi JavaScript access
                        </li>
                        <li>
                            <strong>Framework Security Features:</strong> Sử dụng các tính năng bảo mật của framework
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
