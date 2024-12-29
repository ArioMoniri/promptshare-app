import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
});

api.defaults.withCredentials = true;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config
    });
    throw error;
  }
);

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
  }
};

export const signup = async (userData: {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
}) => {
  try {
    const response = await api.post('/users', { user: userData });
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(error.response?.data?.message || 'Signup failed. Please try again.');
  }
};

export const getUser = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error('Get User error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch user data.');
  }
};

export const createPrompt = async (promptData: {
  title: string;
  content: string;
  description: string;
  category: string;
  tags: string[];
}) => {
  try {
    const response = await api.post('/prompts', { prompt: promptData });
    return response.data;
  } catch (error) {
    console.error('Create Prompt error:', error);
    throw new Error(error.response?.data?.message || 'Failed to create prompt. Please try again.');
  }
};

export const getPrompts = async (page: number = 1) => {
  try {
    const response = await api.get(`/prompts?page=${page}`);
    console.log('Fetched prompts:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get Prompts error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch prompts. Please try again.');
  }
};

export const getPrompt = async (id: string) => {
  try {
    const response = await api.get(`/prompts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get Prompt error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch prompt. Please try again.');
  }
};

export const updatePrompt = async (id: string, promptData: any) => {
  try {
    const response = await api.put(`/prompts/${id}`, { prompt: promptData });
    return response.data;
  } catch (error) {
    console.error('Update Prompt error:', error);
    throw new Error(error.response?.data?.message || 'Failed to update prompt. Please try again.');
  }
};

export const deletePrompt = async (id: string) => {
  try {
    await api.delete(`/prompts/${id}`);
  } catch (error) {
    console.error('Delete Prompt error:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete prompt. Please try again.');
  }
};

export const likePrompt = async (id: string) => {
  try {
    const response = await api.post(`/prompts/${id}/like`);
    return response.data;
  } catch (error) {
    console.error('Like Prompt error:', error);
    throw new Error(error.response?.data?.message || 'Failed to like prompt. Please try again.');
  }
};

export const unlikePrompt = async (id: string) => {
  try {
    const response = await api.delete(`/prompts/${id}/like`);
    return response.data;
  } catch (error) {
    console.error('Unlike Prompt error:', error);
    throw new Error(error.response?.data?.message || 'Failed to unlike prompt. Please try again.');
  }
};

export const forkPrompt = async (id: string) => {
  try {
    const response = await api.post(`/prompts/${id}/fork`);
    return response.data;
  } catch (error) {
    console.error('Fork Prompt error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fork prompt. Please try again.');
  }
};

export const createVersion = async (id: string, content: string, changeLog: string) => {
  try {
    const response = await api.post(`/prompts/${id}/versions`, { content, change_log: changeLog });
    return response.data;
  } catch (error) {
    console.error('Create Version error:', error);
    throw new Error(error.response?.data?.message || 'Failed to create version. Please try again.');
  }
};

export const testPrompt = async (prompt: string, model: string) => {
  try {
    const response = await api.post('/prompt_tests', { prompt, model });
    return response.data;
  } catch (error) {
    console.error('Test Prompt error:', error);
    throw new Error(error.response?.data?.message || 'Failed to test prompt. Please try again.');
  }
};

export const getStarredPrompts = async (userId: string, page: number = 1) => {
  try {
    const response = await api.get(`/users/${userId}/starred_prompts?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Get Starred Prompts error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch starred prompts. Please try again.');
  }
};

export const getForkedPrompts = async (userId: string, page: number = 1) => {
  try {
    const response = await api.get(`/users/${userId}/forked_prompts?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Get Forked Prompts error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch forked prompts. Please try again.');
  }
};

export const getActivityFeed = async (userId: string, page: number = 1) => {
  try {
    const response = await api.get(`/users/${userId}/activity_feed?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Get Activity Feed error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch activity feed. Please try again.');
  }
};

export const setOpenAIApiKey = async (apiKey: string) => {
  try {
    const response = await api.post('/users/set_openai_api_key', { api_key: apiKey });
    return response.data;
  } catch (error) {
    console.error('Set OpenAI API Key error:', error);
    throw new Error(error.response?.data?.message || 'Failed to set OpenAI API key. Please try again.');
  }
};

export const clearOpenAIApiKey = async () => {
  try {
    const response = await api.delete('/users/clear_openai_api_key');
    return response.data;
  } catch (error) {
    console.error('Clear OpenAI API Key error:', error);
    throw new Error(error.response?.data?.message || 'Failed to clear OpenAI API key. Please try again.');
  }
};

export const getUserDashboard = async () => {
  try {
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Get User Dashboard error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch user dashboard. Please try again.');
  }
};

export const searchPrompts = async (query: string, category: string) => {
  try {
    const response = await api.get('/search', { params: { query, category } });
    return response.data;
  } catch (error) {
    console.error('Search Prompts error:', error);
    throw new Error(error.response?.data?.message || 'Search failed. Please try again.');
  }
};

