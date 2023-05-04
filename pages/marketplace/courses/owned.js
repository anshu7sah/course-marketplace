import { Button, Message } from "@/components/UI/common";
import { OwnedCourseCard } from "@/components/UI/course";
import { BaseLayout } from "@/components/UI/layout";
import { MarketHeader } from "@/components/UI/marketplace";
import { useAccount, useOwnedCourses } from "@/components/hooks/web3";
import { getAllCourses } from "@/content/courses/fetcher";
import { useRouter } from "next/router";
import Link from "next/link";
import { useWeb3 } from "@/components/providers";

export default function OwnedCourses({ courses }) {
  const router = useRouter();
  const { requireInstall } = useWeb3();
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  return (
    <BaseLayout>
      <MarketHeader />
      <section className="grid grid-cols-1">
        {ownedCourses.isEmpty && (
          <div className="w-1/2">
            <Message type="warning">
              <div>You don't own any courses</div>
              <Link href="/marketplace" className="font-normal hover:underline">
                <i>Purchase Course</i>
              </Link>
            </Message>
          </div>
        )}
        {account.isEmpty && (
          <div className="w-1/2">
            <Message type="warning">
              <div>Please connect to Metamask</div>
            </Message>
          </div>
        )}
        {requireInstall && (
          <div className="w-1/2">
            <Message type="warning">
              <div>Please install Metamask</div>
            </Message>
          </div>
        )}
        {ownedCourses.data?.map((course) => (
          <OwnedCourseCard key={course.id} course={course}>
            <Button onClick={() => router.push(`/courses/${course.slug}`)}>
              Watch the course
            </Button>
          </OwnedCourseCard>
        ))}
      </section>
    </BaseLayout>
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
