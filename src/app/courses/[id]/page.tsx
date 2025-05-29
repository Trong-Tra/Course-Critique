"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

// Mock course data
const courseData: Record<
  string,
  {
    id: number;
    title: string;
    instructor: string;
    rating: number;
    reviewCount: number;
    students: number;
    price: string;
    category: string;
    level: string;
    duration: string;
    description: string;
    whatYouLearn: string[];
    requirements: string[];
  }
> = {
  "1": {
    id: 1,
    title: "Complete Python Programming",
    instructor: "Dr. Sarah Johnson",
    rating: 4.9,
    reviewCount: 1543,
    students: 12543,
    price: "$89.99",
    category: "Programming",
    level: "Beginner",
    duration: "40 hours",
    description:
      "Master Python from basics to advanced concepts with hands-on projects. This comprehensive course covers everything from variables and data types to web development and data analysis.",
    whatYouLearn: [
      "Python fundamentals and syntax",
      "Object-oriented programming",
      "File handling and databases",
      "Web scraping and APIs",
      "Data analysis with pandas",
      "Building web applications",
    ],
    requirements: [
      "No programming experience required",
      "Computer with internet connection",
      "Willingness to learn and practice",
    ],
  },
  "2": {
    id: 2,
    title: "Advanced React & Next.js",
    instructor: "Mike Chen",
    rating: 4.8,
    reviewCount: 892,
    students: 8932,
    price: "$94.99",
    category: "Web Development",
    level: "Advanced",
    duration: "35 hours",
    description:
      "Build modern web applications with React and Next.js frameworks. Learn advanced patterns, performance optimization, and deployment strategies.",
    whatYouLearn: [
      "Advanced React patterns",
      "Next.js App Router",
      "Server-side rendering",
      "API routes and middleware",
      "Performance optimization",
      "Deployment strategies",
    ],
    requirements: [
      "Solid JavaScript knowledge",
      "Basic React experience",
      "Understanding of HTML/CSS",
    ],
  },
};

// Mock reviews data
const reviewsData = [
  {
    id: 1,
    userName: "Alice Johnson",
    rating: 5,
    date: "2024-01-15",
    comment:
      "Excellent course! The instructor explains everything clearly and the projects are very practical. I feel confident using Python now.",
    helpful: 23,
  },
  {
    id: 2,
    userName: "Bob Smith",
    rating: 4,
    date: "2024-01-10",
    comment:
      "Great content overall. Some sections could be a bit more detailed, but the hands-on approach is fantastic.",
    helpful: 18,
  },
  {
    id: 3,
    userName: "Carol Davis",
    rating: 5,
    date: "2024-01-08",
    comment:
      "This course exceeded my expectations. The instructor is knowledgeable and the pace is perfect for beginners.",
    helpful: 31,
  },
  {
    id: 4,
    userName: "David Wilson",
    rating: 4,
    date: "2024-01-05",
    comment:
      "Very comprehensive course. The projects helped me understand the concepts better. Highly recommended!",
    helpful: 15,
  },
];

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const course = courseData[courseId];
  const [activeTab, setActiveTab] = useState("overview");

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
                  {renderStars(course.rating)}
                  <span className="ml-2 text-lg font-semibold text-gray-900">
                    {course.rating}
                  </span>
                </div>
                <span className="text-gray-500">
                  ({course.reviewCount} reviews)
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
                  <span className="text-indigo-600 font-semibold text-center">
                    {course.title}
                  </span>
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
                  {/* What You'll Learn */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      What you&apos;ll learn
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1">✓</span>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gray-400 mr-3 mt-1">•</span>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      Student Reviews
                    </h3>
                    <Link
                      href={`/courses/${course.id}/add-feedback`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Write Review
                    </Link>
                  </div>

                  <div className="space-y-6">
                    {reviewsData.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6 last:border-b-0"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {review.userName}
                            </h4>
                            <div className="flex items-center mt-1">
                              {renderStars(review.rating)}
                              <span className="ml-2 text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <button className="flex items-center hover:text-indigo-600">
                            <span className="mr-1">👍</span>
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
