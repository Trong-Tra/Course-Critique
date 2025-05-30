import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Review, ApiResponse } from '@/types/api'
import jwt from 'jsonwebtoken'

// Helper function to get user from token
async function getUserFromToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    return decoded.userId
  } catch (error) {
    return null
  }
}

// GET /api/reviews/[id] - Get a specific review
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const review = await prisma.review.findUnique({
      where: { id: params.id },
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

// PUT /api/reviews/[id] - Update a review
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserFromToken(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, content, rating, pros, cons, wouldRecommend } = body

    // Validation
    if (!title || title.trim().length < 5) {
      return NextResponse.json(
        { success: false, message: 'Title must be at least 5 characters long' },
        { status: 400 }
      )
    }

    if (!content || content.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: 'Content must be at least 10 characters long' },
        { status: 400 }
      )
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id: params.id }
    })

    if (!existingReview) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      )
    }

    if (existingReview.userId !== userId) {
      return NextResponse.json(
        { success: false, message: 'Forbidden: You can only edit your own reviews' },
        { status: 403 }
      )
    }

    // Update the review
    const updatedReview = await prisma.review.update({
      where: { id: params.id },
      data: {
        title: title.trim(),
        content: content.trim(),
        rating,
        pros: pros?.trim() || null,
        cons: cons?.trim() || null,
        wouldRecommend: wouldRecommend ?? true,
        updatedAt: new Date()
      },
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

    const response: ApiResponse<Review> = {
      success: true,
      data: updatedReview,
      message: 'Review updated successfully'
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

// DELETE /api/reviews/[id] - Delete a review
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserFromToken(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id: params.id }
    })

    if (!existingReview) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      )
    }

    if (existingReview.userId !== userId) {
      return NextResponse.json(
        { success: false, message: 'Forbidden: You can only delete your own reviews' },
        { status: 403 }
      )
    }

    // Delete the review
    await prisma.review.delete({
      where: { id: params.id }
    })

    const response: ApiResponse<void> = {
      success: true,
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
