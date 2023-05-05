import { Hero } from "@/components/UI/common";
import { CourseList } from "@/components/UI/course";
import { CourseCard } from "@/components/UI/course";
import { BaseLayout } from "@/components/UI/layout";
import { getAllCourses } from "@/content/courses/fetcher";
export default function Home({ courses }) {
  return (
    <div className="bg-gray-900">
      <BaseLayout>
        <Hero />
        <CourseList courses={courses}>
          {(course) => <CourseCard key={course.id} course={course} />}
        </CourseList>
      </BaseLayout>
    </div>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}
