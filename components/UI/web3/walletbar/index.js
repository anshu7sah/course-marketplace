import { useWeb3 } from "@/components/providers";
import { useWalletInfo } from "@/components/hooks/web3";
import { Button } from "../../common";
export default function WalletBar() {
  const { requireInstall } = useWeb3();
  const { account, network } = useWalletInfo();
  return (
    <section className="text-white bg-gray-700">
      <section className="text-white bg-indigo-600 rounded-lg"></section>
      <div className="p-8">
        <h1 className="text-base sm:text-xl break-words">
          Hello, {account.data}
        </h1>
        <h2 className="subtitle mb-5  text-sm sm:text-base">
          I hope you are having a great day!
        </h2>
        <div className="flex justify-between items-center">
          <Button className="mr-2 text-sm sm:text-lg p-2" variant="white">
            Learn how to purchase
          </Button>

          <div>
            {!network.isSupported && network.hasFinishedFirstFetch && (
              <div className="bg-red-400 p-4 rounded-lg">
                <div>Connected to wrong network</div>
                <div>
                  Connect to <strong>{network.target}</strong>
                </div>
              </div>
            )}

            {requireInstall && (
              <div className="bg-yellow-500 p-4 rounded-lg">
                Cannot connect to network. Please install Metamask
              </div>
            )}

            {network.data && (
              <div>
                <span>Currently on </span>
                <strong className="text-2xl">{network.data}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
