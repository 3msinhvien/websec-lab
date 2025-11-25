import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(username, password);

        if (result.success) {
            navigate('/labs');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    const demoAccounts = [
        { username: 'student1', name: 'Nguyễn Văn An' },
        { username: 'student2', name: 'Trần Thị Bình' },
        { username: 'student3', name: 'Lê Hoàng Cường' },
    ];

    const quickLogin = (user) => {
        setUsername(user);
        setPassword('password123');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>🔐 Đăng nhập</h1>
                    <p>Đăng nhập để bắt đầu học tập</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tên đăng nhập..."
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu..."
                            required
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>

                <div className="demo-accounts">
                    <h3>Tài khoản demo</h3>
                    <p className="demo-note">Tất cả mật khẩu: <code>password123</code></p>
                    <div className="demo-list">
                        {demoAccounts.map((account) => (
                            <button
                                key={account.username}
                                className="demo-account-btn"
                                onClick={() => quickLogin(account.username)}
                                disabled={loading}
                            >
                                <strong>{account.username}</strong>
                                <span>{account.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="login-footer">
                    <Link to="/">← Quay lại trang chủ</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
