const API_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
};

// Auth API
export const authAPI = {
    login: async (username, password) => {
        const data = await apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: async () => {
        return await apiCall('/auth/me');
    },

    getUsers: async () => {
        return await apiCall('/auth/users');
    },
};

// Labs API
export const labsAPI = {
    getAllLabs: async () => {
        return await apiCall('/labs');
    },

    getLabById: async (id) => {
        return await apiCall(`/labs/${id}`);
    },

    getLabSolution: async (id) => {
        return await apiCall(`/labs/${id}/solution`);
    },
};

// Progress API
export const progressAPI = {
    getProgress: async () => {
        return await apiCall('/progress');
    },

    submitLab: async (labId, payload, completed) => {
        return await apiCall('/progress/submit', {
            method: 'POST',
            body: JSON.stringify({ labId, payload, completed }),
        });
    },

    getLeaderboard: async () => {
        return await apiCall('/progress/leaderboard');
    },
};
