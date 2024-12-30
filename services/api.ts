import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const getPrompts = async (page: number = 1) => {
  const response = await api.get(`/prompts?page=${page}`);
  return response;
};

export const getPrompt = async (id: string) => {
  const response = await api.get(`/prompts/${id}`);
  return response.data;
};

export const likePrompt = async (id: string) => {
  const response = await api.post(`/prompts/${id}/like`);
  return response.data;
};

export const unlikePrompt = async (id: string) => {
  const response = await api.delete(`/prompts/${id}/like`);
  return response.data;
};

export const starPrompt = async (id: string) => {
  const response = await api.post(`/prompts/${id}/star`);
  return response.data;
};

export const unstarPrompt = async (id: string) => {
  const response = await api.delete(`/prompts/${id}/star`);
  return response.data;
};

export const forkPrompt = async (id: string, data: { title: string; content: string; description: string }) => {
  const response = await api.post(`/prompts/${id}/fork`, data);
  return response.data;
};

export const commentOnPrompt = async (id: string, content: string) => {
  const response = await api.post(`/prompts/${id}/comments`, { content });
  return response.data;
};

export const getComments = async (id: string) => {
  const response = await api.get(`/prompts/${id}/comments`);
  return response.data;
};

export const createIssue = async (promptId: string, title: string, description: string) => {
  const response = await api.post(`/prompts/${promptId}/issues`, { title, description });
  return response.data;
};

export const getIssues = async (promptId: string) => {
  const response = await api.get(`/prompts/${promptId}/issues`);
  return response.data;
};

export const testPrompt = async (promptId: string, promptContent: string, apiKey: string) => {
  const response = await api.post(`/prompts/${promptId}/test`, { promptContent, apiKey });
  return response.data;
};

