export const labs = [
    {
        id: 1,
        title: 'Lab 1: Reflected XSS - Cơ bản',
        difficulty: 'Dễ',
        type: 'Reflected XSS',
        description: 'Tìm và khai thác lỗ hổng XSS reflected đơn giản thông qua tham số URL',
        objective: 'Khai thác lỗ hổng XSS reflected đơn giản thông qua tham số tìm kiếm',
        hint: 'Thử nhập một tag HTML script đơn giản vào ô tìm kiếm. Ví dụ: <script>alert("XSS")</script>',
        solution: '<script>alert("XSS")</script>',
        points: 10
    },
    {
        id: 2,
        title: 'Lab 2: Reflected XSS - Bypass Filter',
        difficulty: 'Trung bình',
        type: 'Reflected XSS',
        description: 'Vượt qua bộ lọc đơn giản để thực hiện tấn công XSS',
        objective: 'Vượt qua bộ lọc chặn từ khóa "script"',
        hint: 'Bộ lọc chỉ chặn từ "script" viết thường. Thử sử dụng case khác hoặc các tag HTML khác như <img> với event handler.',
        solution: '<img src=x onerror="alert(1)">',
        points: 20
    },
    {
        id: 3,
        title: 'Lab 3: Stored XSS - Comment Section',
        difficulty: 'Trung bình',
        type: 'Stored XSS',
        description: 'Lưu trữ payload XSS trong phần bình luận của ứng dụng',
        objective: 'Lưu trữ payload XSS trong phần bình luận',
        hint: 'Chèn payload XSS vào phần bình luận. Payload sẽ được lưu và thực thi khi người khác xem bình luận.',
        solution: '<script>alert("Stored XSS")</script>',
        points: 20
    },
    {
        id: 4,
        title: 'Lab 4: DOM-based XSS',
        difficulty: 'Trung bình',
        type: 'DOM XSS',
        description: 'Khai thác lỗ hổng XSS dựa trên DOM manipulation',
        objective: 'Khai thác lỗ hổng XSS thông qua DOM manipulation',
        hint: 'Ứng dụng sử dụng location.hash để hiển thị nội dung. Thử thay đổi hash trong URL.',
        solution: '#<img src=x onerror="alert(1)">',
        points: 25
    },
    {
        id: 5,
        title: 'Lab 5: XSS với Event Handlers',
        difficulty: 'Khó',
        type: 'Reflected XSS',
        description: 'Sử dụng event handlers để thực thi mã JavaScript',
        objective: 'Sử dụng event handlers để thực thi JavaScript',
        hint: 'Tag <script> bị chặn. Thử sử dụng tag <img> với thuộc tính onerror: <img src=x onerror="alert(1)">',
        solution: '<img src=x onerror="alert(1)">',
        points: 30
    },
    {
        id: 6,
        title: 'Lab 6: Stored XSS - Profile Page',
        difficulty: 'Khó',
        type: 'Stored XSS',
        description: 'Chèn XSS payload vào trang profile của người dùng',
        objective: 'Chèn XSS payload vào trang profile',
        hint: 'Có thể chèn payload vào trường bio hoặc tên. Thử các tag HTML và event handlers khác nhau.',
        solution: '<img src=x onerror="alert(document.cookie)">',
        points: 35
    }
];

export const getLabById = (id) => {
    return labs.find(lab => lab.id === parseInt(id));
};

export const getAllLabs = () => {
    return labs.map(lab => ({
        id: lab.id,
        title: lab.title,
        difficulty: lab.difficulty,
        type: lab.type,
        description: lab.description,
        points: lab.points
    }));
};
