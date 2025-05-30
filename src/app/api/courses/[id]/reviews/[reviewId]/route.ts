import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse, Review, UpdateReviewRequest } from '@/types/api'
import { verifyToken } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; reviewId: string } }
) {
  try {
    const reviewId = params.reviewId

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
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
      }
    })

    if (!review) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      )
    }

    const response: ApiResponse<Review> = {
      success: true,
      data: review
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Get review error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; reviewId: string } }
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

    const reviewId = params.reviewId
    const body: UpdateReviewRequest = await request.json()

    // Validate rating if provided
    if (body.rating && (body.rating < 1 || body.rating > 5)) {
      return NextResponse.json(
        { success: false, message: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId }
    })

    if (!existingReview) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      )
    }

    if (existingReview.userId !== decoded.userId) {
      return NextResponse.json(
        { success: false, message: 'Not authorized to update this review' },
        { status: 403 }
      )
    }

    // Update review
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: body,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    const response: ApiResponse<Review> = {
      success: true,
      data: updatedReview
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Update review error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; reviewId: string } }
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

    const reviewId = params.reviewId

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId }
    })

    if (!existingReview) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      )
    }

    if (existingReview.userId !== decoded.userId) {
      return NextResponse.json(
        { success: false, message: 'Not authorized to delete this review' },
        { status: 403 }
      )
    }

    // Delete review
    await prisma.review.delete({
      where: { id: reviewId }
    })

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: 'Review deleted successfully'
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Delete review error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
