import api from './api';
import { AuthResponse, LoginRequest, RegisterRequest } from '@/types';

const AuthService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/v1/auth/register', data);
    
    // Guardar el token en localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.userId,
        nombre: response.data.nombre,
        email: response.data.email
      }));
    }
    
    return response.data;
  },
  
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/v1/auth/login', data);
    
    // Guardar el token en localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.userId,
        nombre: response.data.nombre,
        email: response.data.email
      }));
    }
    
    return response.data;
  },
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser(): { id: number; nombre: string; email: string } | null {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
};

export default AuthService; 