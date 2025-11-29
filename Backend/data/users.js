import bcrypt from 'bcryptjs';

// Hardcoded users - 3 học sinh
export const users = [
    {
        id: 1,
        username: 'student1',
        password: bcrypt.hashSync('password123', 10), // password: password123
        fullName: 'Đỗ Chí Tùng',
        email: 'student1@example.com',
        role: 'student',
        createdAt: '2025-01-01T00:00:00.000Z'
    },
    {
        id: 2,
        username: 'student2',
        password: bcrypt.hashSync('password123', 10), // password: password123
        fullName: 'Trần Thị Bình',
        email: 'student2@example.com',
        role: 'student',
        createdAt: '2025-01-01T00:00:00.000Z'
    },
    {
        id: 3,
        username: 'student3',
        password: bcrypt.hashSync('password123', 10), // password: password123
        fullName: 'Lê Hoàng Cường',
        email: 'student3@example.com',
        role: 'student',
        createdAt: '2025-01-01T00:00:00.000Z'
    }
];

// User progress tracking (in-memory storage)
export const userProgress = {
    1: { // student1
        completedLabs: [1, 2, 3, 4, 7, 9],
        attempts: {
            1: 3,
            2: 5,
            3: 2,
            4: 4,
            5: 6,
            7: 3,
            9: 1
        },
        lastActivity: '2025-11-28T10:30:00.000Z'
    },
    2: { // student2
        completedLabs: [1, 2, 7],
        attempts: {
            1: 2,
            2: 4,
            3: 5,
            7: 2,
            8: 3
        },
        lastActivity: '2025-11-28T14:20:00.000Z'
    },
    3: { // student3
        completedLabs: [1],
        attempts: {
            1: 1,
            2: 3,
            3: 2
        },
        lastActivity: '2025-11-28T09:15:00.000Z'
    }
};

export const findUserByUsername = (username) => {
    return users.find(user => user.username === username);
};

export const findUserById = (id) => {
    return users.find(user => user.id === id);
};

export const getUserProgress = (userId) => {
    return userProgress[userId] || { completedLabs: [], attempts: {}, lastActivity: null };
};

export const updateUserProgress = (userId, labId, completed = false) => {
    if (!userProgress[userId]) {
        userProgress[userId] = { completedLabs: [], attempts: {}, lastActivity: null };
    }

    // Update attempts
    if (!userProgress[userId].attempts[labId]) {
        userProgress[userId].attempts[labId] = 0;
    }
    userProgress[userId].attempts[labId]++;

    // Update completed labs
    if (completed && !userProgress[userId].completedLabs.includes(labId)) {
        userProgress[userId].completedLabs.push(labId);
    }

    // Update last activity
    userProgress[userId].lastActivity = new Date().toISOString();

    return userProgress[userId];
};
