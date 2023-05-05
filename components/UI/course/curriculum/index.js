import Link from "next/link";
import { Button, Loader } from "../../common";
import { useAccount } from "@/components/hooks/web3";
import { useWeb3 } from "@/components/providers";
import { useState } from "react";
export default function Curriculum({
  locked,
  courseState,
  isLoading,
  onChange,
}) {
  const statusClass =
    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
  const lectures = ["Frontend Completed"];
  const { account } = useAccount();
  const { web3, contract } = useWeb3();
  const [point, setPoint] = useState(0);
  const checkboxChangeHandler = async (e) => {
    if (e.target.checked) {
      try {
        if (
          await contract.methods
            .setPoints(account.data, 200)
            .send({ from: account.data })
        ) {
          let p = await contract.methods.getPoints(account.data).call();
          setPoint(p);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section className="max-w-5xl mx-auto">
      <Button>Points: {point}</Button>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Section 1
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lectures.map((lec) => (
                    <tr key={lec}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {lec}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={
                            !locked
                              ? `bg-red-100 text-red-800 ${statusClass}`
                              : `bg-green-100 text-green-800 ${statusClass}`
                          }
                        >
                          {!locked ? "Locked" : "Unlocked"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {isLoading ? (
                          <Loader />
                        ) : !locked ? (
                          <>
                            {courseState === "deactivated" && (
                              <Link
                                href="/marketplace"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Get Access
                              </Link>
                            )}
                            {courseState === "purchased" && (
                              <Link
                                href="/faq"
                                className="text-yellow-500 hover:text-yellow-900"
                              >
                                Waiting for activation...
                              </Link>
                            )}
                          </>
                        ) : (
                          <>
                            <input
                              type="checkbox"
                              onChange={checkboxChangeHandler}
                              style={{}}
                            />
                            <Button
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={onChange}
                            >
                              Watch
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
