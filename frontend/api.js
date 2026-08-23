const API_BASE_URL = window.RESTAURANT_API_URL || 'http://localhost:8080/api';

async function apiRequest(path, options = {}) {
    const token = localStorage.getItem('restaurant_token');
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    if (!response.ok) throw new Error(data?.error || 'Request failed');
    return data;
}

const restaurantApi = {
    getCategories: () => apiRequest('/categories'),
    getFoods: (categoryId) => apiRequest(categoryId ? `/foods?categoryId=${encodeURIComponent(categoryId)}` : '/foods'),
    register: (body) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    login: (body) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    getAddresses: () => apiRequest('/addresses'),
    addAddress: (body) => apiRequest('/addresses', { method: 'POST', body: JSON.stringify(body) }),
    createOrder: (body) => apiRequest('/orders', { method: 'POST', body: JSON.stringify(body) }),
    getOrders: () => apiRequest('/orders'),
    createReservation: (body) => apiRequest('/reservations', { method: 'POST', body: JSON.stringify(body) }),
    getReservations: () => apiRequest('/reservations')
};