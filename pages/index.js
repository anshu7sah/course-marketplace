import { Hero } from "@/components/UI/common"
import { CourseList } from "@/components/UI/course"
import { CourseCard } from "@/components/UI/course"
import { BaseLayout } from "@/components/UI/layout"
import { getAllCourses } from "@/content/courses/fetcher"
export default function Home({courses}) {
  return (
    <BaseLayout>
      <Hero />
      <CourseList
        courses={courses}
      >
      {course =>
        <CourseCard
          key={course.id}
          course={course}
        />
      }
      </CourseList>
    </BaseLayout>
  )
}

export function getStaticProps() {
  const { data } = getAllCourses()
  return {
    props: {
      courses: data
    }
  }
}

