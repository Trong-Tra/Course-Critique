// API utility functions for making HTTP requests
import { 
  AuthResponse, 
  LoginRequest, 
  CreateUserRequest, 
  Course, 
  Review, 
  CreateReviewRequest,
  UpdateReviewRequest,
  PaginatedResponse,
  CourseFilters,
  ApiResponse,
  User
} from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Add auth token if available
  const token = localStorage.getItem('auth_token')
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'API request failed')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Auth API functions
export const authApi = {
  async register(userData: CreateUserRequest): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },

  async getProfile(): Promise<ApiResponse<User>> {
    return apiRequest('/api/auth/profile')
  },
}

// Courses API functions
export const coursesApi = {
  async getCourses(filters?: CourseFilters): Promise<PaginatedResponse<Course>> {
    const params = new URLSearchParams()
    
    if (filters?.category && filters.category !== 'All') params.append('category', filters.category)
    if (filters?.level && filters.level !== 'All') params.append('level', filters.level)
    if (filters?.search) params.append('search', filters.search)
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)
    if (filters?.page) params.append('page', filters.page.toString())
    if (filters?.limit) params.append('limit', filters.limit.toString())

    const queryString = params.toString()
    const endpoint = `/api/courses${queryString ? `?${queryString}` : ''}`
    
    const response = await fetch(endpoint)
    const data = await response.json()
    return data as PaginatedResponse<Course>
  },

  async getCourse(id: string): Promise<ApiResponse<Course>> {
    return apiRequest<Course>(`/api/courses/${id}`)
  },
}

// Reviews API functions
export const reviewsApi = {
  async getReviews(filters?: { courseId?: string, page?: number, limit?: number }): Promise<PaginatedResponse<Review>> {
    const params = new URLSearchParams()
    
    if (filters?.courseId) params.append('courseId', filters.courseId)
    if (filters?.page) params.append('page', filters.page.toString())
    if (filters?.limit) params.append('limit', filters.limit.toString())

    const queryString = params.toString()
    const endpoint = `/api/reviews${queryString ? `?${queryString}` : ''}`
    
    const response = await fetch(endpoint)
    const data = await response.json()
    return data as PaginatedResponse<Review>
  },

  async getReview(id: string): Promise<ApiResponse<Review>> {
    return apiRequest<Review>(`/api/reviews/${id}`)
  },

  async createReview(reviewData: CreateReviewRequest): Promise<ApiResponse<Review>> {
    return apiRequest<Review>(`/api/courses/${reviewData.courseId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    })
  },

  async updateReview(id: string, reviewData: UpdateReviewRequest): Promise<ApiResponse<Review>> {
    return apiRequest<Review>(`/api/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    })
  },

  async deleteReview(id: string): Promise<ApiResponse<void>> {
    return apiRequest<void>(`/api/reviews/${id}`, {
      method: 'DELETE',
    })
  },
}
