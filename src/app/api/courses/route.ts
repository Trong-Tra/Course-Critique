import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CourseFilters, PaginatedResponse, Course, CreateCourseRequest, ApiResponse } from '@/types/api'
import { verifyToken } from '@/lib/auth'

type CourseWithReviews = {
  id: string
  title: string
  instructor: string
  description: string
  category: string
  level: string
  duration: string
  price: string
  thumbnail: string | null
  students: number
  createdAt: Date
  updatedAt: Date
  reviews: { rating: number }[]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters: CourseFilters = {
      category: searchParams.get('category') || undefined,
      level: searchParams.get('level') || undefined,
      search: searchParams.get('search') || undefined,
      sortBy: (searchParams.get('sortBy') as 'rating' | 'students' | 'price' | 'date') || 'rating',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10')
    }

    // Build where clause
    const where: Record<string, any> = {}
    
    if (filters.category && filters.category !== 'All') {
      where.category = filters.category
    }
    
    if (filters.level && filters.level !== 'All') {
      where.level = filters.level
    }
    
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { instructor: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ]
    }

    // Build order by
    let orderBy: Record<string, string> = {}
    const sortOrder = filters.sortOrder || 'desc'
    switch (filters.sortBy) {
      case 'rating':
        // We'll calculate this in the query
        orderBy = { id: sortOrder }
        break
      case 'students':
        orderBy = { students: sortOrder }
        break
      case 'price':
        orderBy = { price: sortOrder }
        break
      case 'date':
        orderBy = { createdAt: sortOrder }
        break
      default:
        orderBy = { createdAt: 'desc' }
    }

    // Calculate pagination
    const skip = ((filters.page || 1) - 1) * (filters.limit || 10)

    // Get total count
    const total = await prisma.course.count({ where })

    // Get courses with reviews for rating calculation
    const courses = await prisma.course.findMany({
      where,
      include: {
        reviews: {
          select: {
            rating: true
          }
        }
      },
      orderBy,
      skip,
      take: filters.limit
    })

    // Calculate average ratings and format response
    const coursesWithRatings = courses.map((course: CourseWithReviews) => {
      const ratings = course.reviews.map((review: { rating: number }) => review.rating)
      const averageRating = ratings.length > 0 
        ? ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length 
        : 0

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { reviews, ...courseData } = course
      return {
        ...courseData,
        averageRating: parseFloat(averageRating.toFixed(1)),
        reviewCount: ratings.length
      }
    })

    // Sort by rating if requested
    if (filters.sortBy === 'rating') {
      coursesWithRatings.sort((a: { averageRating: number }, b: { averageRating: number }) => {
        return sortOrder === 'desc' 
          ? b.averageRating - a.averageRating
          : a.averageRating - b.averageRating
      })
    }

    const response: PaginatedResponse<Course> = {
      success: true,
      data: coursesWithRatings,
      pagination: {
        page: filters.page || 1,
        limit: filters.limit || 10,
        total,
        totalPages: Math.ceil(total / (filters.limit || 10))
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Get courses error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authorization required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const decoded = await verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }

    const body: CreateCourseRequest = await request.json()
    const { title, instructor, description, category, level, duration, price, thumbnail } = body

    // Validate required fields
    if (!title || !instructor || !description || !category || !level || !duration || !price) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        title,
        instructor,
        description,
        category,
        level,
        duration,
        price,
        thumbnail
      }
    })

    const response: ApiResponse<Course> = {
      success: true,
      data: course
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Create course error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
