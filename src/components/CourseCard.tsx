import Link from "next/link";

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  reviewCount?: number;
  students: number;
  price: string;
  category: string;
  level?: string;
  duration?: string;
  description?: string;
}

interface CourseCardProps {
  course: Course;
  className?: string;
}

export default function CourseCard({
  course,
  className = "",
}: CourseCardProps) {
  return (
    <div
      className={`bg-white rounded-xl card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden group ${className}`}
    >
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center">
          <span className="text-indigo-600 font-semibold text-center px-4">
            {course.title}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
            ⭐ {course.rating}
          </span>
        </div>

        {course.level && (
          <div className="absolute top-4 left-4">
            <span className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
              {course.level}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
            {course.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-gray-600 mb-2">By {course.instructor}</p>

        {course.description && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>
        )}

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-4">👥 {course.students.toLocaleString()}</span>
          {course.duration && (
            <span className="mr-4">⏱️ {course.duration}</span>
          )}
          {course.reviewCount && <span>💬 {course.reviewCount}</span>}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            {course.price}
          </span>
          <Link
            href={`/courses/${course.id}`}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}
