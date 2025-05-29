"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
  ];

  return (
    <nav className="bg-white border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 mr-12">
            <Image
              src="/logo.png"
              alt="Course Critique Logo"
              width={120}
              height={120}
              className="rounded-lg filter"
              style={{
                filter:
                  "invert(27%) sepia(51%) saturate(2878%) hue-rotate(216deg) brightness(97%) contrast(97%)",
              }}
            />
            <span className="font-bold text-2xl gradient-text">
              Course Critique
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 lg:space-x-12 ml-auto mr-8 lg:mr-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 lg:px-6 lg:py-3 rounded-lg text-base lg:text-lg font-semibold transition-colors duration-200 ${
                  pathname === item.href
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-indigo-600 p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
