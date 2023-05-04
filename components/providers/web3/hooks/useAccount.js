import { useEffect } from "react";
import useSWR from "swr";
export const handler = (web3, provider) => () => {
  const adminAddresses = {
    "0xf67a7356361ca07efab61494d935c3df9e933187b5ded92069d7bd706b3e2668": true,
  };
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/account" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      if (!account) {
        throw new Error(
          "Cannot retreive an account. Please refresh the browser."
        );
      }

      return account;
    }
  );

  useEffect(() => {
    const mutator = (accounts) => mutate(accounts[0] ?? null);
    provider?.on("accountsChanged", mutator);

    return () => {
      provider?.removeListener("accountsChanged", mutator);
    };
  }, [provider]);
  return {
    data,
    isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest,
  };
};
