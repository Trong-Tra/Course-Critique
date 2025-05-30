import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse, Course, UpdateCourseRequest } from '@/types/api'
import { verifyToken } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: courseId } = await params

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      )
    }

    // Calculate average rating
    const ratings = course.reviews.map(review => review.rating)
    const averageRating = ratings.length > 0 
      ? ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length 
      : 0

    const courseWithRating = {
      ...course,
      averageRating: parseFloat(averageRating.toFixed(1)),
      reviewCount: ratings.length
    }

    const response: ApiResponse<Course> = {
      success: true,
      data: courseWithRating
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Get course error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { id: courseId } = await params
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }

    const body: UpdateCourseRequest = await request.json()

    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id: courseId }
    })

    if (!existingCourse) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      )
    }

    // Update course
    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: body
    })

    const response: ApiResponse<Course> = {
      success: true,
      data: updatedCourse
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Update course error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }

    const { id: courseId } = await params

    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id: courseId }
    })

    if (!existingCourse) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      )
    }

    // Delete course (reviews will be deleted automatically due to cascade)
    await prisma.course.delete({
      where: { id: courseId }
    })

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: 'Course deleted successfully'
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Delete course error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
