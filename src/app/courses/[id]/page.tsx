"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { coursesApi, reviewsApi } from "@/lib/api";
import { Course, Review } from "@/types/api";
import { useAuth } from "@/contexts/AuthContext";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await coursesApi.getCourse(courseId);

        if (response.success && response.data) {
          setCourse(response.data);
        } else {
          setError("Course not found");
        }
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch course"
        );
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await reviewsApi.getReviews({ courseId });

        if (response.success) {
          setReviews(response.data || []);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setReviewsLoading(false);
      }
    };

    if (courseId) {
      fetchReviews();
    }
  }, [courseId]);

  // Handle review deletion
  const handleDeleteReview = async (reviewId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this review? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await reviewsApi.deleteReview(reviewId);

      if (response.success) {
        // Remove the deleted review from the state
        setReviews((prev) => prev.filter((review) => review.id !== reviewId));
        alert("Review deleted successfully!");
      } else {
        alert(response.message || "Failed to delete review");
      }
    } catch (error: unknown) {
      console.error("Error deleting review:", error);
      alert(error instanceof Error ? error.message : "Failed to delete review");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Course Not Found"}
          </h1>
          <Link
            href="/courses"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ⭐
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="mb-4">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span className="ml-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>

              <p className="text-lg text-gray-600 mb-4">
                By {course.instructor}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {renderStars(course.averageRating || 0)}
                  <span className="ml-2 text-lg font-semibold text-gray-900">
                    {(course.averageRating || 0).toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-500">
                  ({course.reviewCount || 0} reviews)
                </span>
                <span className="text-gray-500">
                  👥 {course.students.toLocaleString()} students
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Course Card */}
            <div className="lg:w-96 flex-shrink-0">
              <div className="bg-white rounded-xl card-shadow p-6 sticky top-24">
                <div className="w-full h-48 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-lg mb-6 flex items-center justify-center">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-indigo-600 font-semibold text-center">
                      {course.title}
                    </span>
                  )}
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    {course.price}
                  </div>
                  <div className="text-sm text-gray-500">One-time purchase</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">
                      {course.students.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 mb-3">
                  Enroll Now
                </button>

                <Link
                  href={`/courses/${course.id}/add-feedback`}
                  className="block w-full text-center border border-indigo-600 text-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200"
                >
                  Write a Review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:w-2/3">
          {/* Tabs */}
          <div className="bg-white rounded-lg card-shadow">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "reviews", label: "Reviews" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Course Description */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Course Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Course Info */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Course Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-semibold text-gray-900 mb-1">
                          Instructor
                        </div>
                        <div className="text-gray-700">{course.instructor}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-semibold text-gray-900 mb-1">
                          Category
                        </div>
                        <div className="text-gray-700">{course.category}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-semibold text-gray-900 mb-1">
                          Level
                        </div>
                        <div className="text-gray-700">{course.level}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-semibold text-gray-900 mb-1">
                          Duration
                        </div>
                        <div className="text-gray-700">{course.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      Student Reviews ({course.reviewCount || 0})
                    </h3>
                    <Link
                      href={`/courses/${course.id}/add-feedback`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Write Review
                    </Link>
                  </div>

                  {reviewsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      ))}
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500 text-lg mb-4">
                        No reviews yet
                      </div>
                      <p className="text-gray-400 mb-4">
                        Be the first to review this course!
                      </p>
                      <Link
                        href={`/courses/${course.id}/add-feedback`}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
                      >
                        Write the First Review
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-gray-200 pb-6 last:border-b-0"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {review.user?.name || "Anonymous"}
                              </h4>
                              <div className="flex items-center mt-1">
                                {renderStars(review.rating)}
                                <span className="ml-2 text-sm text-gray-500">
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            {/* Edit/Delete buttons for user's own reviews */}
                            {user && review.userId === user.id && (
                              <div className="flex items-center space-x-2">
                                <Link
                                  href={`/courses/${course.id}/edit-feedback/${review.id}`}
                                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => handleDeleteReview(review.id)}
                                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>

                          <h5 className="font-medium text-gray-900 mb-2">
                            {review.title}
                          </h5>
                          <p className="text-gray-700 mb-3">{review.content}</p>

                          {review.pros && (
                            <div className="mb-2">
                              <span className="text-green-600 font-medium">
                                Pros:{" "}
                              </span>
                              <span className="text-gray-700">
                                {review.pros}
                              </span>
                            </div>
                          )}

                          {review.cons && (
                            <div className="mb-2">
                              <span className="text-red-600 font-medium">
                                Cons:{" "}
                              </span>
                              <span className="text-gray-700">
                                {review.cons}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center text-sm text-gray-500">
                            <span
                              className={`mr-4 ${
                                review.wouldRecommend
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {review.wouldRecommend
                                ? "👍 Recommends"
                                : "👎 Does not recommend"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
