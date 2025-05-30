import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PaginatedResponse, Review } from '@/types/api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const courseId = searchParams.get('courseId')
    const userId = searchParams.get('userId')
    const skip = (page - 1) * limit

    // Build where clause
    const where: Record<string, any> = {}
    if (courseId) where.courseId = courseId
    if (userId) where.userId = userId

    // Get total count
    const total = await prisma.review.count({ where })

    // Get reviews with user and course data
    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            instructor: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    })

    const response: PaginatedResponse<Review> = {
      success: true,
      data: reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Get reviews error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
