// Determina a URL base da API com base no ambiente (desenvolvimento ou produção)
const API_BASE_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_API_BASE_URL
  : 'http://localhost:8080/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) return {};
    return { 'Authorization': `Bearer ${token}` };
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Ocorreu um erro no servidor.' }));
        throw new Error(errorData.message || errorData.error || 'Erro desconhecido');
    }
    return response.json();
};

export const login = async (email, senha) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
    });
    return handleResponse(response);
};

export const register = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

export const getUsuarioLogado = async () => {
    const response = await fetch(`${API_BASE_URL}/usuarios/me`, {
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    });
    return handleResponse(response);
};

export const getEmpresas = async () => {
    const response = await fetch(`${API_BASE_URL}/empresas`, {
        headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
};

export const getVagas = async () => {
    const response = await fetch(`${API_BASE_URL}/vagas`, {
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    });
    return handleResponse(response);
};

export const getVagasCompativeis = async () => {
    const response = await fetch(`${API_BASE_URL}/vagas/match`, {
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    });
    return handleResponse(response);
};

export const seCandidatar = async (vagaId) => {
    const response = await fetch(`${API_BASE_URL}/vagas/${vagaId}/candidatar-se`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    });
    return handleResponse(response);
};
