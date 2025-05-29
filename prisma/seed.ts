import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.review.deleteMany()
  await prisma.course.deleteMany()
  await prisma.user.deleteMany()

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alice@example.com',
        name: 'Alice Johnson',
        password: await bcrypt.hash('password123', 12)
      }
    }),
    prisma.user.create({
      data: {
        email: 'bob@example.com',
        name: 'Bob Smith',
        password: await bcrypt.hash('password123', 12)
      }
    }),
    prisma.user.create({
      data: {
        email: 'carol@example.com',
        name: 'Carol Davis',
        password: await bcrypt.hash('password123', 12)
      }
    }),
    prisma.user.create({
      data: {
        email: 'david@example.com',
        name: 'David Wilson',
        password: await bcrypt.hash('password123', 12)
      }
    }),
    prisma.user.create({
      data: {
        email: 'eva@example.com',
        name: 'Eva Martinez',
        password: await bcrypt.hash('password123', 12)
      }
    })
  ])

  console.log(`✅ Created ${users.length} users`)

  // Create courses
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: 'Complete Python Programming',
        instructor: 'Dr. Sarah Johnson',
        description: 'Master Python from beginner to advanced level with hands-on projects and real-world applications.',
        category: 'Programming',
        level: 'Beginner',
        duration: '12 hours',
        price: '$89.99',
        students: 15420,
        thumbnail: '/course-thumbnails/python.jpg'
      }
    }),
    prisma.course.create({
      data: {
        title: 'Advanced React & Next.js',
        instructor: 'Mike Chen',
        description: 'Build modern web applications with React, Next.js, and TypeScript. Includes hooks, context, and server-side rendering.',
        category: 'Web Development',
        level: 'Intermediate',
        duration: '18 hours',
        price: '$129.99',
        students: 8750,
        thumbnail: '/course-thumbnails/react.jpg'
      }
    }),
    prisma.course.create({
      data: {
        title: 'Data Science with Machine Learning',
        instructor: 'Dr. Emily Rodriguez',
        description: 'Learn data analysis, visualization, and machine learning using Python, pandas, and scikit-learn.',
        category: 'Data Science',
        level: 'Intermediate',
        duration: '25 hours',
        price: '$159.99',
        students: 12340,
        thumbnail: '/course-thumbnails/data-science.jpg'
      }
    }),
    prisma.course.create({
      data: {
        title: 'JavaScript Fundamentals',
        instructor: 'Alex Thompson',
        description: 'Master the fundamentals of JavaScript including ES6+, DOM manipulation, and asynchronous programming.',
        category: 'Programming',
        level: 'Beginner',
        duration: '14 hours',
        price: '$79.99',
        students: 22100,
        thumbnail: '/course-thumbnails/javascript.jpg'
      }
    }),
    prisma.course.create({
      data: {
        title: 'UI/UX Design Masterclass',
        instructor: 'Jessica Park',
        description: 'Learn user interface and user experience design principles, prototyping, and modern design tools.',
        category: 'Design',
        level: 'Beginner',
        duration: '16 hours',
        price: '$99.99',
        students: 9870,
        thumbnail: '/course-thumbnails/uiux.jpg'
      }
    }),
    prisma.course.create({
      data: {
        title: 'Advanced Node.js Development',
        instructor: 'Michael Foster',
        description: 'Build scalable backend applications with Node.js, Express, MongoDB, and modern deployment practices.',
        category: 'Backend Development',
        level: 'Advanced',
        duration: '22 hours',
        price: '$149.99',
        students: 5890,
        thumbnail: '/course-thumbnails/nodejs.jpg'
      }
    }),
    prisma.course.create({
      data: {
        title: 'Mobile App Development with React Native',
        instructor: 'Lisa Chang',
        description: 'Create cross-platform mobile applications using React Native, Redux, and native device features.',
        category: 'Mobile Development',
        level: 'Intermediate',
        duration: '20 hours',
        price: '$139.99',
        students: 7650,
        thumbnail: '/course-thumbnails/react-native.jpg'
      }
    }),
    prisma.course.create({
      data: {
        title: 'DevOps and Cloud Computing',
        instructor: 'Ryan Kumar',
        description: 'Master DevOps practices, Docker, Kubernetes, AWS, and CI/CD pipelines for modern software deployment.',
        category: 'DevOps',
        level: 'Advanced',
        duration: '28 hours',
        price: '$179.99',
        students: 4320,
        thumbnail: '/course-thumbnails/devops.jpg'
      }
    })
  ])

  console.log(`✅ Created ${courses.length} courses`)

  // Create reviews
  const reviews = [
    // Python course reviews
    {
      title: 'Excellent Introduction to Python',
      content: 'This course exceeded my expectations! Dr. Johnson explains everything clearly and the projects are very practical. I went from knowing nothing about Python to feeling confident writing my own scripts.',
      rating: 5,
      pros: 'Clear explanations, practical projects, great instructor support',
      cons: 'Could use more advanced topics',
      wouldRecommend: true,
      userId: users[0].id,
      courseId: courses[0].id
    },
    {
      title: 'Great for Beginners',
      content: 'Perfect course for anyone starting with Python. The pace is just right and the examples are relevant to real-world scenarios.',
      rating: 4,
      pros: 'Beginner-friendly, good examples',
      cons: 'Sometimes moves a bit slowly',
      wouldRecommend: true,
      userId: users[1].id,
      courseId: courses[0].id
    },
    {
      title: 'Comprehensive and Well-Structured',
      content: 'The course covers all the essential Python concepts with hands-on exercises. The instructor is knowledgeable and responsive to questions.',
      rating: 5,
      pros: 'Comprehensive coverage, responsive instructor',
      cons: 'None really',
      wouldRecommend: true,
      userId: users[2].id,
      courseId: courses[0].id
    },
    // React course reviews
    {
      title: 'Advanced React Concepts Made Easy',
      content: 'Mike Chen does an amazing job breaking down complex React concepts. The Next.js integration is particularly well explained.',
      rating: 5,
      pros: 'Expert instructor, modern concepts, practical examples',
      cons: 'Requires some prior React knowledge',
      wouldRecommend: true,
      userId: users[0].id,
      courseId: courses[1].id
    },
    {
      title: 'Solid Intermediate Course',
      content: 'Good course for developers who already know React basics. Learned a lot about Next.js and modern React patterns.',
      rating: 4,
      pros: 'Up-to-date content, good project structure',
      cons: 'Could use more TypeScript examples',
      wouldRecommend: true,
      userId: users[3].id,
      courseId: courses[1].id
    },
    // Data Science course reviews
    {
      title: 'Comprehensive Data Science Journey',
      content: 'Dr. Rodriguez covers everything from basic statistics to machine learning. The hands-on approach with real datasets is fantastic.',
      rating: 5,
      pros: 'Real datasets, practical approach, excellent instructor',
      cons: 'Quite intensive, need time to practice',
      wouldRecommend: true,
      userId: users[1].id,
      courseId: courses[2].id
    },
    {
      title: 'Great Introduction to ML',
      content: 'Perfect balance of theory and practice. The machine learning section really helped me understand the concepts.',
      rating: 4,
      pros: 'Good theory-practice balance, clear explanations',
      cons: 'Some sections could be more detailed',
      wouldRecommend: true,
      userId: users[4].id,
      courseId: courses[2].id
    },
    // JavaScript course reviews
    {
      title: 'JavaScript Fundamentals Done Right',
      content: 'Alex Thompson makes JavaScript concepts crystal clear. The progression from basics to advanced topics is perfect.',
      rating: 5,
      pros: 'Clear progression, excellent examples, modern JavaScript',
      cons: 'Could include more ES2022+ features',
      wouldRecommend: true,
      userId: users[2].id,
      courseId: courses[3].id
    },
    {
      title: 'Solid Foundation',
      content: 'Great course for building a strong JavaScript foundation. The async programming section was particularly helpful.',
      rating: 4,
      pros: 'Strong foundation, good async coverage',
      cons: 'Some examples could be more modern',
      wouldRecommend: true,
      userId: users[4].id,
      courseId: courses[3].id
    },
    // UI/UX course reviews
    {
      title: 'Design Thinking Transformed',
      content: 'Jessica Park opened my eyes to user-centered design. The practical exercises and feedback sessions were invaluable.',
      rating: 5,
      pros: 'User-centered approach, practical exercises, great feedback',
      cons: 'None',
      wouldRecommend: true,
      userId: users[3].id,
      courseId: courses[4].id
    },
    // Node.js course reviews
    {
      title: 'Advanced Backend Development',
      content: 'Michael Foster knows his stuff. This course took my backend skills to the next level with modern practices and deployment strategies.',
      rating: 5,
      pros: 'Expert level content, modern practices, deployment focus',
      cons: 'Requires solid JavaScript foundation',
      wouldRecommend: true,
      userId: users[0].id,
      courseId: courses[5].id
    },
    // React Native course reviews
    {
      title: 'Cross-Platform Mobile Made Simple',
      content: 'Lisa Chang makes mobile development accessible. The course covers both iOS and Android considerations thoroughly.',
      rating: 4,
      pros: 'Cross-platform coverage, practical projects',
      cons: 'Some platform-specific details could be deeper',
      wouldRecommend: true,
      userId: users[1].id,
      courseId: courses[6].id
    },
    // DevOps course reviews
    {
      title: 'Complete DevOps Transformation',
      content: 'Ryan Kumar covers the entire DevOps pipeline. The hands-on labs with AWS were particularly valuable for real-world application.',
      rating: 5,
      pros: 'Complete pipeline coverage, hands-on AWS labs, practical focus',
      cons: 'Very intensive, need dedicated time',
      wouldRecommend: true,
      userId: users[2].id,
      courseId: courses[7].id
    },
    {
      title: 'DevOps Fundamentals',
      content: 'Great introduction to DevOps concepts and tools. The Kubernetes section was especially well done.',
      rating: 4,
      pros: 'Good fundamentals, excellent Kubernetes section',
      cons: 'Could use more CI/CD examples',
      wouldRecommend: true,
      userId: users[4].id,
      courseId: courses[7].id
    }
  ]

  for (const review of reviews) {
    await prisma.review.create({
      data: review
    })
  }

  console.log(`✅ Created ${reviews.length} reviews`)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
