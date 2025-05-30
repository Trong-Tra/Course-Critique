// User types
export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface UserSummary {
  id: string
  email: string
  name: string
}

export interface CreateUserRequest {
  email: string
  name: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  message?: string
}

// Course types
export interface Course {
  id: string
  title: string
  instructor: string
  description: string
  category: string
  level: string
  duration: string
  price: string
  thumbnail?: string | null
  students: number
  createdAt: Date
  updatedAt: Date
  averageRating?: number
  reviewCount?: number
  reviews?: Review[]
}

export interface CreateCourseRequest {
  title: string
  instructor: string
  description: string
  category: string
  level: string
  duration: string
  price: string
  thumbnail?: string | null
}

export interface UpdateCourseRequest {
  title?: string
  instructor?: string
  description?: string
  category?: string
  level?: string
  duration?: string
  price?: string
  thumbnail?: string | null
}

// Review types
export interface Review {
  id: string
  title: string
  content: string
  rating: number
  pros?: string | null
  cons?: string | null
  wouldRecommend: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
  courseId: string
  user?: UserSummary
  course?: Course
}

export interface CreateReviewRequest {
  title: string
  content: string
  rating: number
  pros?: string | null
  cons?: string | null
  wouldRecommend: boolean
  courseId: string
}

export interface UpdateReviewRequest {
  title?: string
  content?: string
  rating?: number
  pros?: string | null
  cons?: string | null
  wouldRecommend?: boolean
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Query parameters
export interface CourseFilters {
  category?: string
  level?: string
  search?: string
  sortBy?: 'rating' | 'students' | 'price' | 'date'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}
