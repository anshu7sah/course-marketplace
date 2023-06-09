import { Message, Modal } from "@/components/UI/common";
import { CourseHero, Curriculum, Keypoints } from "@/components/UI/course";
import { BaseLayout } from "@/components/UI/layout";
import { useAccount, useOwnedCourse } from "@/components/hooks/web3";
import { useWeb3 } from "@/components/providers";
import VideoPlayer from "@/components/watch/VideoPlayer";
import { getAllCourses } from "@/content/courses/fetcher";
import { useState } from "react";

export default function Course({ course }) {
  const { account } = useAccount();
  const { isLoading } = useWeb3();
  const { ownedCourse } = useOwnedCourse(course, account.data);
  const courseState = ownedCourse.data?.state;
  const isLocked = !courseState || "purchased" || courseState === "deactivated";
  const [player, setPlayer] = useState(false);
  const playerChange = () => {
    console.log(player);
    setPlayer((p) => !p);
  };
  return (
    <BaseLayout>
      <div className="py-6">
        <CourseHero
          hasOwner={!!ownedCourse.data}
          title={course.title}
          description={course.description}
          image={course.coverImage}
          onChange={playerChange}
        />
      </div>
      <Keypoints points={course.wsl} />
      {courseState && (
        <div className="max-w-5xl mx-auto">
          {courseState === "purchased" && (
            <Message type="warning">
              Course is purchased and waiting for the activation. Process can
              take up to 24 hours.
              <i className="block font-normal">
                In case of any questions, please contact info@eincode.com
              </i>
            </Message>
          )}
          {courseState === "activated" && (
            <Message type="success">
              Eincode wishes you happy watching of the course.
            </Message>
          )}
          {courseState === "deactivated" && (
            <Message type="danger">
              Course has been deactivated, due the incorrect purchase data. The
              functionality to watch the course has been temporaly disabled.
              <i className="block font-normal">
                Please contact info@eincode.com
              </i>
            </Message>
          )}
        </div>
      )}
      <Curriculum
        isLoading={isLoading}
        locked={isLocked}
        courseState={courseState}
        onChange={playerChange}
      />
      <Modal />
      <div style={{ display: `${player ? "block" : "none"}` }}>
        <VideoPlayer onChange={playerChange} />
      </div>
    </BaseLayout>
  );
}

export function getStaticPaths() {
  const { data } = getAllCourses();
  return {
    paths: data.map((c) => ({
      params: {
        slug: c.slug,
      },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses();

  const course = data.filter((c) => c.slug === params.slug)[0];

  return {
    props: {
      course,
    },
  };
}
