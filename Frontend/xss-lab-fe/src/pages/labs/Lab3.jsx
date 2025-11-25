import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { progressAPI } from '../../services/api';
import './Lab.css';

function Lab3() {
    const [comments, setComments] = useState([
        { id: 1, author: 'Admin', text: 'Chào mừng đến với trang bình luận!', time: '2 giờ trước' },
        { id: 2, author: 'User123', text: 'Trang web rất hay!', time: '1 giờ trước' },
    ]);
    const [newComment, setNewComment] = useState('');
    const [author, setAuthor] = useState('');
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [pointsEarned, setPointsEarned] = useState(0);
    const commentRefs = useRef([]);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        comments.forEach((comment, index) => {
            if (commentRefs.current[index]) {
                commentRefs.current[index].innerHTML = comment.text;
            }
        });
    }, [comments]);

    const submitProgress = async (payload, completed) => {
        if (!isAuthenticated() || submitting) return;

        setSubmitting(true);
        try {
            const response = await progressAPI.submitLab(3, payload, completed);
            if (completed && response.pointsEarned) {
                setPointsEarned(response.pointsEarned);
            }
        } catch (error) {
            console.error('Error submitting progress:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() && author.trim()) {
            const comment = {
                id: comments.length + 1,
                author: author,
                text: newComment,
                time: 'Vừa xong'
            };
            setComments([...comments, comment]);

            const isXSS = newComment.includes('alert') || newComment.includes('onerror') || newComment.includes('onload');
            if (isXSS) {
                setTimeout(() => {
                    setSuccess(true);
                    submitProgress(newComment, true);
                }, 500);
            } else {
                submitProgress(newComment, false);
            }

            setNewComment('');
            setAuthor('');
        }
    };

    return (
        <div className="lab-container">
            <h2>Hệ thống bình luận</h2>
            <p className="lab-description">
                Đây là một hệ thống bình luận đơn giản. Bình luận của bạn sẽ được lưu trữ
                và hiển thị cho những người dùng khác. Hãy thử tìm lỗ hổng Stored XSS!
            </p>

            <div className="comments-section">
                <h3>💬 Bình luận ({comments.length})</h3>

                <div className="comments-list">
                    {comments.map((comment, index) => (
                        <div key={comment.id} className="comment-item">
                            <div className="comment-header">
                                <strong>{comment.author}</strong>
                                <span className="comment-time">{comment.time}</span>
                            </div>
                            {/* Vulnerable: Stored XSS */}
                            <div
                                className="comment-text"
                                ref={el => commentRefs.current[index] = el}
                            ></div>
                        </div>
                    ))}
                </div>

                {success && (
                    <div className="success-message">
                        🎉 Chúc mừng! Bạn đã khai thác thành công Stored XSS!
                        {pointsEarned > 0 && <div className="points-earned">+{pointsEarned} điểm</div>}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="comment-form">
                    <h4>Thêm bình luận mới</h4>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Tên của bạn..."
                        className="comment-input"
                        required
                    />
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Viết bình luận của bạn..."
                        className="comment-textarea"
                        rows="4"
                        required
                    />
                    <button type="submit" className="comment-button">Gửi bình luận</button>
                </form>
            </div>

            <div className="lab-info">
                <h4>🎯 Mục tiêu</h4>
                <p>Chèn payload XSS vào bình luận sao cho nó được lưu trữ và thực thi</p>
                <h4>⚠️ Lưu ý</h4>
                <p>Đây là Stored XSS - payload sẽ được lưu và ảnh hưởng đến tất cả người dùng xem trang</p>
            </div>
        </div>
    );
}

export default Lab3;
