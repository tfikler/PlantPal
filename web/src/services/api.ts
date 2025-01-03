import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    login: async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    register: async (email: string, password: string, full_name: string, user_type: 'owner' | 'expert') => {
        const response = await api.post('/auth/register', {
            email,
            password,
            full_name,
            user_type,
        });
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    },

    updateProfile: async (updates: any) => {
        const response = await api.patch('/auth/profile', updates);
        return response.data;
    },
};

// api.ts
export const plantAPI = {
    addPlant: async (name: string, species: string, location: string) => {
        const response = await api.post('/plants', { name, species, location });
        return response.data;
    },
    getFeed: async () => {
        const response = await api.get('/plants/feed');
        console.log('api response', response);
        return response.data;
    },
    createHelpPost: async (formData: FormData) => {
        const response = await api.post('/plants/help', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    offerHelp: async (plantId: number) => {
        const response = await api.post(`/plants/${plantId}/help-offers`);
        return response.data;
    }
};