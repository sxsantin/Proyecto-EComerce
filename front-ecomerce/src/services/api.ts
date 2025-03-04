import { toast } from "sonner";

const API_URL = "http://localhost:8085";

interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;
  
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  
  try {
    console.log(`Realizando petición a: ${API_URL}${endpoint}`);
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      mode: 'cors',
      credentials: 'include',
    });
    
    // Para debugging de CORS
    console.log("Respuesta del servidor:", {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "access-control-allow-origin": response.headers.get("access-control-allow-origin"),
        "access-control-allow-credentials": response.headers.get("access-control-allow-credentials"),
        "access-control-allow-methods": response.headers.get("access-control-allow-methods"),
        "content-type": response.headers.get("content-type")
      }
    });
    
    if (!response.ok) {
      let errorMessage = "Error en la solicitud";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
      } catch (e) {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    // Intentar procesar la respuesta como JSON
    try {
      return await response.json();
    } catch (e) {
      console.warn("La respuesta no es un JSON válido, devolviendo respuesta completa", e);
      return response as any;
    }
  } catch (error) {
    console.error("Error en la API:", error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      toast.error("No se pudo conectar con el servidor. Comprueba que los servicios estén funcionando.");
    } else {
      toast.error(error instanceof Error ? error.message : "Error al conectar con el servidor");
    }
    throw error;
  }
}

// Servicio de productos
export const productosApi = {
  getAll: () => fetchApi<any[]>("/v1/productos"),
  getById: (id: string) => fetchApi<any>(`/v1/productos/${id}`),
  getByCategory: (category: string) => fetchApi<any[]>(`/v1/productos/categoria/${category}`),
  search: (query: string) => fetchApi<any[]>(`/v1/productos/buscar?nombre=${query}`),
};

// Servicio de autenticación
export const authApi = {
  register: (data: any) => 
    fetchApi<any>("/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  login: (data: any) =>
    fetchApi<any>("/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Servicio de pedidos
export const pedidosApi = {
  create: (data: any, token: string) =>
    fetchApi<any>("/v1/pedidos", {
      method: "POST",
      body: JSON.stringify(data),
      token,
    }),
  getMine: (token: string) =>
    fetchApi<any[]>("/v1/pedidos/mis-pedidos", {
      token,
    }),
  getById: (id: string, token: string) =>
    fetchApi<any>(`/v1/pedidos/${id}`, {
      token,
    }),
};

// Servicio de pagos
export const pagosApi = {
  processPago: (data: any, token: string) =>
    fetchApi<any>("/v1/pagos", {
      method: "POST",
      body: JSON.stringify(data),
      token,
    }),
};

export default fetchApi; 