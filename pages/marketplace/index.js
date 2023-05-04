import { CourseCard, CourseList } from "@/components/UI/course";
import { BaseLayout } from "@/components/UI/layout";
import { useWalletInfo } from "@/components/hooks/web3";
import { getAllCourses } from "@/content/courses/fetcher";
import { Button } from "@/components/UI/common";
import { OrderModal } from "@/components/UI/order";
import { useState } from "react";
import { MarketHeader } from "@/components/UI/marketplace";
import { useWeb3 } from "@/components/providers";

export default function Marketplace({ courses }) {
  const { web3, contract } = useWeb3();
  const { canPurchaseCourse, account } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const purchaseCourse = async (order) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
    console.log(hexCourseId);

    // hex course ID:
    // 0x31343130343734000000000000000000

    // address
    // 0xf8929048D74164582E5FA0897fC654CbF0c096C6

    // 31343130343734000000000000000000f8929048D74164582E5FA0897fC654CbF0c096C6
    // Order Hash
    // 2e0b409e2bf77ce6466df3990199f3a7377f305fef2c55556a8cae5decbdd0e5
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    );

    // test@gmail.com
    // af257bcc3cf653863a77012256c927f26d8ab55c5bea3751063d049d0538b902
    const emailHash = web3.utils.sha3(order.email);

    // af257bcc3cf653863a77012256c927f26d8ab55c5bea3751063d049d0538b9022e0b409e2bf77ce6466df3990199f3a7377f305fef2c55556a8cae5decbdd0e5

    // proof:
    // b13bdad9cb08b53405c63b05f052a842ec6ab91f6f4239355ff359eb5532b29f
    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    );

    const value = web3.utils.toWei(String(order.price));

    try {
      const result = await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({ from: account.data, value });
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
            disabled={!canPurchaseCourse}
            Footer={() => (
              <div className="mt-4">
                <Button
                  variant="lightPurple"
                  disabled={!canPurchaseCourse}
                  onClick={() => setSelectedCourse(course)}
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      <OrderModal
        course={selectedCourse}
        onSubmit={purchaseCourse}
        onClose={() => setSelectedCourse(null)}
      />
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
