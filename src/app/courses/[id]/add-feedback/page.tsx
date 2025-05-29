"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import StarRating from "@/components/StarRating";

// Mock course data
const courseData: Record<string, {
  id: number;
  title: string;
  instructor: string;
}> = {
  "1": {
    id: 1,
    title: "Complete Python Programming",
    instructor: "Dr. Sarah Johnson",
  },
  "2": {
    id: 2,
    title: "Advanced React & Next.js",
    instructor: "Mike Chen",
  },
};

export default function AddFeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const course = courseData[courseId];

  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
    wouldRecommend: true,
    difficulty: "medium",
    helpfulAspects: [] as string[],
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Course Not Found
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

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleRatingHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleAspectToggle = (aspect: string) => {
    setFormData((prev) => ({
      ...prev,
      helpfulAspects: prev.helpfulAspects.includes(aspect)
        ? prev.helpfulAspects.filter((a) => a !== aspect)
        : [...prev.helpfulAspects, aspect],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert("Please select a rating");
      return;
    }
    if (formData.comment.trim().length < 10) {
      alert("Please write a comment with at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      alert("Review submitted successfully!");
      router.push(`/courses/${courseId}`);
    }, 1000);
  };

  const aspects = [
    "Clear explanations",
    "Good pacing",
    "Practical examples",
    "Engaging content",
    "Well organized",
    "Helpful exercises",
  ];

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
                {formData.rating === 0 && "Click to rate"}
                {formData.rating === 1 && "Poor - Not satisfied"}
                {formData.rating === 2 && "Fair - Below expectations"}
                {formData.rating === 3 && "Good - Met expectations"}
                {formData.rating === 4 && "Very Good - Exceeded expectations"}
                {formData.rating === 5 && "Excellent - Outstanding course"}
              </p>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Your Review *
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, comment: e.target.value }))
                }
                placeholder="Share your thoughts about this course. What did you like? What could be improved? How was the instructor?"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.comment.length}/500 characters (minimum 10 required)
              </p>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Course Difficulty
              </label>
              <div className="flex space-x-4">
                {["easy", "medium", "hard"].map((difficulty) => (
                  <label key={difficulty} className="flex items-center">
                    <input
                      type="radio"
                      name="difficulty"
                      value={difficulty}
                      checked={formData.difficulty === difficulty}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          difficulty: e.target.value,
                        }))
                      }
                      className="mr-2 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="capitalize text-gray-700">
                      {difficulty}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Helpful Aspects */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                What aspects were most helpful? (Optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {aspects.map((aspect) => (
                  <label key={aspect} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.helpfulAspects.includes(aspect)}
                      onChange={() => handleAspectToggle(aspect)}
                      className="mr-2 text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="text-gray-700 text-sm">{aspect}</span>
                  </label>
                ))}
              </div>
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
                  formData.comment.trim().length < 10
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
