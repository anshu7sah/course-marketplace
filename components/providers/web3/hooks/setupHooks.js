import { useOwnedCourses } from "@/components/hooks/web3";
import { handler as useAccountHooks } from "./useAccount";
import { handler as useNetworkHooks } from "./useNetwork";
import { handler as createOwnedCoursesHook } from "./useOwnedCourses";
import { handler as createOwnedCourseHook } from "./useOwnedCourse";
import { handler as createManagedCoursesHook } from "./useManagedCourses";

const DEFAULT_HOOKS = {
  useAccount: () => ({ account: "null" }),
};

export const setupHooks = ({ web3, provider, contract }) => {
  return {
    useAccount: useAccountHooks(web3, provider),
    useNetwork: useNetworkHooks(web3, provider),
    useOwnedCourses: createOwnedCoursesHook(web3, contract),
    useOwnedCourse: createOwnedCourseHook(web3, contract),
    useManagedCourses: createManagedCoursesHook(web3, contract),
  };
};
