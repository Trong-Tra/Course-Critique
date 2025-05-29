"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import SplitText from "@/components/SplitText";

// Mock data for courses
const allCourses = [
  {
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
      "Master Python from basics to advanced concepts with hands-on projects.",
  },
  {
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
      "Build modern web applications with React and Next.js frameworks.",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    instructor: "Prof. Emily Davis",
    rating: 4.7,
    reviewCount: 2156,
    students: 15678,
    price: "$79.99",
    category: "Data Science",
    level: "Intermediate",
    duration: "50 hours",
    description:
      "Learn data analysis, visualization, and machine learning basics.",
  },
  {
    id: 4,
    title: "JavaScript Mastery",
    instructor: "Alex Rodriguez",
    rating: 4.6,
    reviewCount: 934,
    students: 9876,
    price: "$69.99",
    category: "Programming",
    level: "Beginner",
    duration: "30 hours",
    description:
      "Complete JavaScript course from fundamentals to ES6+ features.",
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    instructor: "Jessica Wong",
    rating: 4.8,
    reviewCount: 756,
    students: 6543,
    price: "$84.99",
    category: "Design",
    level: "Beginner",
    duration: "25 hours",
    description:
      "Create beautiful and user-friendly designs with modern principles.",
  },
  {
    id: 6,
    title: "Machine Learning with Python",
    instructor: "Dr. Robert Kim",
    rating: 4.9,
    reviewCount: 1234,
    students: 11234,
    price: "$99.99",
    category: "Data Science",
    level: "Advanced",
    duration: "60 hours",
    description:
      "Deep dive into machine learning algorithms and implementations.",
  },
];

const categories = [
  "All",
  "Programming",
  "Web Development",
  "Data Science",
  "Design",
];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter and sort courses
  const filteredCourses = allCourses
    .filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesLevel && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "students":
          return b.students - a.students;
        case "price":
          return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-4">
            <SplitText
              text="All Courses"
              className="text-3xl font-bold text-gray-900"
              delay={40}
              animationFrom={{ opacity: 0, transform: "translate3d(0,30px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              as="h1"
              display="block"
            />
          </div>
          <div>
            <SplitText
              text="Discover courses from top instructors around the world"
              className="text-gray-600"
              delay={25}
              animationFrom={{ opacity: 0, transform: "translate3d(0,20px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              as="p"
              display="block"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg card-shadow p-6 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Courses
                </label>
                <input
                  type="text"
                  placeholder="Search by title or instructor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="students">Most Popular</option>
                  <option value="price">Lowest Price</option>
                </select>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredCourses.length} of {allCourses.length} courses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No courses found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedLevel("All");
                    setSearchTerm("");
                  }}
                  className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
