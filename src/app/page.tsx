import Link from "next/link";
import PartnerSection from "@/components/PartnerSection";
import CourseCard from "@/components/CourseCard";
import SplitText from "@/components/SplitText";

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
            <div className="mb-2">
              <SplitText
                text="Discover the Perfect"
                className="text-4xl md:text-6xl font-bold"
                delay={50}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,60px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                as="h1"
                display="block"
              />
            </div>
            <div className="mb-6">
              <SplitText
                text="Learning Journey"
                className="text-4xl md:text-6xl font-bold text-yellow-300 leading-tight"
                delay={60}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,40px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                as="h1"
                display="block"
              />
            </div>
            <div className="mb-8">
              <SplitText
                text="Read authentic reviews from real students and make informed decisions about your next course"
                className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto"
                delay={30}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,20px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                as="p"
                display="block"
              />
            </div>
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

      {/* Partner Section */}
      <PartnerSection />

      {/* Top Rated Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-4">
              <SplitText
                text="Top Rated Courses"
                className="text-3xl md:text-4xl font-bold text-gray-900"
                delay={40}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,30px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                as="h2"
                display="block"
              />
            </div>
            <div>
              <SplitText
                text="Discover the highest-rated courses based on authentic student reviews"
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                delay={25}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,20px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                as="p"
                display="block"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
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
            <div className="mb-4">
              <SplitText
                text="Why Choose Course Critique?"
                className="text-3xl md:text-4xl font-bold text-gray-900"
                delay={45}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,35px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                as="h2"
                display="block"
              />
            </div>
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
              <div className="mb-4">
                <SplitText
                  text="Authentic Reviews"
                  className="text-xl font-bold text-gray-900"
                  delay={35}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,25px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  as="h3"
                  display="block"
                />
              </div>
              <div>
                <SplitText
                  text="Real feedback from verified students who completed the courses"
                  className="text-gray-600"
                  delay={20}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,15px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  as="p"
                  display="block"
                />
              </div>
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
              <div className="mb-4">
                <SplitText
                  text="Verified Ratings"
                  className="text-xl font-bold text-gray-900"
                  delay={35}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,25px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  as="h3"
                  display="block"
                />
              </div>
              <div>
                <SplitText
                  text="Transparent rating system to help you make the right choice"
                  className="text-gray-600"
                  delay={20}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,15px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  as="p"
                  display="block"
                />
              </div>
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
              <div className="mb-4">
                <SplitText
                  text="Community Driven"
                  className="text-xl font-bold text-gray-900"
                  delay={35}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,25px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  as="h3"
                  display="block"
                />
              </div>
              <div>
                <SplitText
                  text="Built by learners, for learners to share knowledge and experiences"
                  className="text-gray-600"
                  delay={20}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,15px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  as="p"
                  display="block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
