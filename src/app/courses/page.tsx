"use client";

import { useState, useEffect } from "react";
import CourseCard from "@/components/CourseCard";
import SplitText from "@/components/SplitText";
import { coursesApi } from "@/lib/api";
import { Course, CourseFilters } from "@/types/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  const [filters, setFilters] = useState<CourseFilters>({
    category: "All",
    level: "All",
    search: "",
    sortBy: "rating",
    sortOrder: "desc",
    page: 1,
    limit: 12,
  });

  // Fetch courses from API
  const fetchCourses = async (currentFilters: CourseFilters) => {
    try {
      setLoading(true);
      const response = await coursesApi.getCourses(currentFilters);

      if (response.success && response.data) {
        setCourses(response.data);
        setPagination(
          response.pagination || {
            page: 1,
            limit: 12,
            total: 0,
            totalPages: 0,
          }
        );
      } else {
        setError("Failed to fetch courses");
      }
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch courses"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses on component mount and when filters change
  useEffect(() => {
    fetchCourses(filters);
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<CourseFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const categories = [
    "All",
    "Programming",
    "Web Development",
    "Data Science",
    "Design",
    "Business",
  ];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const sortOptions = [
    { value: "rating", label: "Highest Rated" },
    { value: "students", label: "Most Popular" },
    { value: "price", label: "Lowest Price" },
    { value: "date", label: "Newest" },
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error loading courses</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchCourses(filters)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
                  value={filters.search || ""}
                  onChange={(e) =>
                    handleFilterChange({ search: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category || "All"}
                  onChange={(e) =>
                    handleFilterChange({ category: e.target.value })
                  }
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
                  value={filters.level || "All"}
                  onChange={(e) =>
                    handleFilterChange({ level: e.target.value })
                  }
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
                  value={filters.sortBy || "rating"}
                  onChange={(e) =>
                    handleFilterChange({
                      sortBy: e.target.value as
                        | "rating"
                        | "students"
                        | "price"
                        | "date",
                      sortOrder: e.target.value === "price" ? "asc" : "desc",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {loading
                  ? "Loading..."
                  : `Showing ${courses.length} of ${pagination.total} courses`}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg card-shadow p-6 animate-pulse"
                  >
                    <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-xl mb-4">
                  No courses found
                </div>
                <p className="text-gray-400">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {(courses || []).map((course) => (
                    <CourseCard
                      key={course.id}
                      course={{
                        id: course.id,
                        title: course.title,
                        instructor: course.instructor,
                        rating: course.averageRating || 0,
                        reviewCount: course.reviewCount || 0,
                        students: course.students,
                        price: course.price,
                        category: course.category,
                        level: course.level,
                        duration: course.duration,
                        description: course.description,
                      }}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>

                      {Array.from(
                        { length: pagination.totalPages },
                        (_, index) => {
                          const page = index + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-2 text-sm font-medium rounded-md ${
                                page === pagination.page
                                  ? "bg-indigo-600 text-white"
                                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
