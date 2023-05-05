import { CourseCard, CourseList } from "@/components/UI/course";
import { BaseLayout } from "@/components/UI/layout";
import { useOwnedCourses, useWalletInfo } from "@/components/hooks/web3";
import { getAllCourses } from "@/content/courses/fetcher";
import { Button, Loader, Message } from "@/components/UI/common";
import { OrderModal } from "@/components/UI/order";
import { useState } from "react";
import { MarketHeader } from "@/components/UI/marketplace";
// const owned = ownedCourses.data?.find((c) => c.id == course.id);
import { useWeb3 } from "@/components/providers";

export default function Marketplace({ courses }) {
  const { web3, contract, requireInstall } = useWeb3();
  const { hasConnectedWallet, account, isConnecting } = useWalletInfo();
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isNewPurchase, setIsNewPurchase] = useState(true);
  const purchaseCourse = async (order) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    );

    const value = web3.utils.toWei(String(order.price));

    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email);
      const proof = web3.utils.soliditySha3(
        { type: "bytes32", value: emailHash },
        { type: "bytes32", value: orderHash }
      );

      _purchaseCourse(hexCourseId, proof, value);
    } else {
      _repurchaseCourse(orderHash, value);
    }
  };

  const _purchaseCourse = async (hexCourseId, proof, value) => {
    try {
      const result = await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({ from: account.data, value });
      console.log(result);
    } catch {
      console.error("Purchase course: Operation has failed.");
    }
  };

  const _repurchaseCourse = async (courseHash, value) => {
    try {
      const result = await contract.methods
        .repurchaseCourse(courseHash)
        .send({ from: account.data, value });
      console.log(result);
    } catch {
      console.error("Purchase course: Operation has failed.");
    }
  };

  return (
    <BaseLayout>
      <MarketHeader />
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!hasConnectedWallet}
            Footer={() => {
              if (requireInstall) {
                return (
                  <Button disabled={true} variant="lightPurple">
                    Install
                  </Button>
                );
              }

              if (isConnecting) {
                return (
                  <Button disabled={true} variant="lightPurple">
                    <Loader size="sm" />
                  </Button>
                );
              }

              if (!ownedCourses.hasInitialResponse) {
                return <div style={{ height: "50px" }}></div>;
              }
              const owned = ownedCourses.data?.find((c) => c.id == course.id);
              if (owned) {
                return (
                  <>
                    <div>
                      <Button disabled={false} variant="white">
                        Owned &#10003;
                      </Button>
                      {owned.state === "deactivated" && (
                        <Button
                          disabled={false}
                          onClick={() => {
                            setIsNewPurchase(false);
                            setSelectedCourse(course);
                          }}
                          variant="purple"
                        >
                          Fund to Activate
                        </Button>
                      )}
                    </div>
                    <div className="mt-1">
                      {owned.state === "activated" && (
                        <Message type="success" size="sm">
                          Activated
                        </Message>
                      )}
                      {owned.state === "deactivated" && (
                        <Message type="danger" size="sm">
                          Deactivated
                        </Message>
                      )}
                      {owned.state === "purchased" && (
                        <Message type="warning" size="sm">
                          Waiting for Activation
                        </Message>
                      )}
                    </div>
                  </>
                );
              }

              return (
                <Button
                  onClick={() => setSelectedCourse(course)}
                  disabled={!hasConnectedWallet}
                  variant="lightPurple"
                >
                  Purchase
                </Button>
              );
            }}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onSubmit={purchaseCourse}
          onClose={() => {
            setSelectedCourse(null);
            setIsNewPurchase(true);
          }}
        />
      )}
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
