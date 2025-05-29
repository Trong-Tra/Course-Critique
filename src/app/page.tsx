import Link from "next/link";

// Mock data for top-rated courses
const topCourses = [
  {
    id: 1,
    title: "Complete Python Programming",
    instructor: "Dr. Sarah Johnson",
    rating: 4.9,
    students: 12543,
    thumbnail: "/api/placeholder/300/200",
    price: "$89.99",
    category: "Programming",
  },
  {
    id: 2,
    title: "Advanced React & Next.js",
    instructor: "Mike Chen",
    rating: 4.8,
    students: 8932,
    thumbnail: "/api/placeholder/300/200",
    price: "$94.99",
    category: "Web Development",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    instructor: "Prof. Emily Davis",
    rating: 4.7,
    students: 15678,
    thumbnail: "/api/placeholder/300/200",
    price: "$79.99",
    category: "Data Science",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover the Perfect
              <span className="block text-yellow-300">Learning Journey</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
              Read authentic reviews from real students and make informed
              decisions about your next course
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-colors duration-200 shadow-lg"
              >
                Browse Courses
              </Link>
              <Link
                href="/courses"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-colors duration-200"
              >
                Write a Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl card-shadow">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                25,000+
              </div>
              <div className="text-gray-600">Course Reviews</div>
            </div>
            <div className="bg-white p-8 rounded-xl card-shadow">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                1,500+
              </div>
              <div className="text-gray-600">Courses Rated</div>
            </div>
            <div className="bg-white p-8 rounded-xl card-shadow">
              <div className="text-4xl font-bold text-indigo-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top Rated Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the highest-rated courses based on authentic student
              reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold">
                      {course.title}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ {course.rating}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 mb-4">By {course.instructor}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{course.students.toLocaleString()} students</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      {course.price}
                    </span>
                  </div>

                  <Link
                    href={`/courses/${course.id}`}
                    className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors duration-200 inline-block"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Course Critique?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Authentic Reviews
              </h3>
              <p className="text-gray-600">
                Real feedback from verified students who completed the courses
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Verified Ratings
              </h3>
              <p className="text-gray-600">
                Transparent rating system to help you make the right choice
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Community Driven
              </h3>
              <p className="text-gray-600">
                Built by learners, for learners to share knowledge and
                experiences
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
