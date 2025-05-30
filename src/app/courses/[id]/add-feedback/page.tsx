"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import StarRating from "@/components/StarRating";
import { coursesApi, reviewsApi } from "@/lib/api";
import { Course } from "@/types/api";
import { useAuth } from "@/contexts/AuthContext";

export default function AddFeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    rating: 0,
    pros: "",
    cons: "",
    wouldRecommend: true,
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Check if user is logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to write a review
          </h1>
          <Link
            href="/auth/login"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleRatingHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert("Please select a rating");
      return;
    }
    if (formData.title.trim().length < 5) {
      alert("Please enter a title with at least 5 characters");
      return;
    }
    if (formData.content.trim().length < 10) {
      alert("Please write a review with at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        rating: formData.rating,
        pros: formData.pros.trim() || undefined,
        cons: formData.cons.trim() || undefined,
        wouldRecommend: formData.wouldRecommend,
        courseId: courseId,
      };

      const response = await reviewsApi.createReview(reviewData);

      if (response.success) {
        alert("Review submitted successfully!");
        router.push(`/courses/${courseId}`);
      } else {
        alert(response.message || "Failed to submit review");
      }
    } catch (error: unknown) {
      console.error("Error submitting review:", error);
      alert(error instanceof Error ? error.message : "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href={`/courses/${courseId}`}
            className="text-indigo-600 hover:text-indigo-700 mb-4 inline-flex items-center"
          >
            ← Back to Course
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Write a Review
          </h1>
          <p className="text-gray-600">
            Share your experience with &quot;{course.title}&quot;
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl card-shadow">
          {/* Course Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 font-semibold text-sm text-center">
                  {course.title
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 3)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {course.title}
                </h2>
                <p className="text-gray-600">By {course.instructor}</p>
              </div>
            </div>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Rating */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Overall Rating *
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <StarRating
                  rating={formData.rating}
                  size="lg"
                  showNumber={false}
                  interactive={true}
                  onRatingChange={handleRatingClick}
                  hoveredRating={hoveredRating}
                  onRatingHover={handleRatingHover}
                  onRatingLeave={handleRatingLeave}
                />
              </div>
              <p className="text-sm text-gray-500">
                {formData.rating === 0 &&
                  hoveredRating === 0 &&
                  "Click on a star to rate this course"}
                {hoveredRating > 0 &&
                  formData.rating === 0 &&
                  `Rate: ${hoveredRating} star${hoveredRating > 1 ? "s" : ""}`}
                {formData.rating === 1 && "Poor - Not satisfied"}
                {formData.rating === 2 && "Fair - Below expectations"}
                {formData.rating === 3 && "Good - Met expectations"}
                {formData.rating === 4 && "Very Good - Exceeded expectations"}
                {formData.rating === 5 && "Excellent - Outstanding course"}
              </p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Review Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Give your review a short, descriptive title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                maxLength={100}
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.title.length}/100 characters (minimum 5 required)
              </p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Your Review *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Share your thoughts about this course. What did you like? What could be improved? How was the instructor?"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                required
                maxLength={1000}
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.content.length}/1000 characters (minimum 10 required)
              </p>
            </div>

            {/* Pros */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                What did you like? (Optional)
              </label>
              <textarea
                value={formData.pros}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, pros: e.target.value }))
                }
                placeholder="What were the strengths of this course?"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                maxLength={500}
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.pros.length}/500 characters
              </p>
            </div>

            {/* Cons */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                What could be improved? (Optional)
              </label>
              <textarea
                value={formData.cons}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, cons: e.target.value }))
                }
                placeholder="What areas need improvement?"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                maxLength={500}
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.cons.length}/500 characters
              </p>
            </div>

            {/* Recommendation */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Would you recommend this course?
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="recommend"
                    checked={formData.wouldRecommend === true}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, wouldRecommend: true }))
                    }
                    className="mr-2 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">
                    Yes, I would recommend it
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="recommend"
                    checked={formData.wouldRecommend === false}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        wouldRecommend: false,
                      }))
                    }
                    className="mr-2 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">
                    No, I would not recommend it
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href={`/courses/${courseId}`}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  formData.rating === 0 ||
                  formData.title.trim().length < 5 ||
                  formData.content.trim().length < 10
                }
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
