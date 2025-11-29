import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    🛡️ WebSec Lab
                </Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">Trang chủ</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/labs" className="navbar-link">Danh sách Lab</Link>
                    </li>
                    {isAuthenticated() && (
                        <>
                            <li className="navbar-item">
                                <Link to="/leaderboard" className="navbar-link">Bảng xếp hạng</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/progress" className="navbar-link">Tiến trình</Link>
                            </li>
                        </>
                    )}
                    <li className="navbar-item">
                        <Link to="/about" className="navbar-link">Giới thiệu</Link>
                    </li>
                    {isAuthenticated() ? (
                        <>
                            <li className="navbar-item navbar-user">
                                <span>👤 {user?.fullName || user?.username}</span>
                            </li>
                            <li className="navbar-item">
                                <button onClick={logout} className="navbar-button">Đăng xuất</button>
                            </li>
                        </>
                    ) : (
                        <li className="navbar-item">
                            <Link to="/login" className="navbar-button">Đăng nhập</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
