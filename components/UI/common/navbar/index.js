import { useWeb3 } from "@/components/providers";
import { ActiveLink, Button } from "@/components/UI/common";
import { useAccount } from "@/components/hooks/web3";
import { useRouter } from "next/router";

export default function Navbar() {
  const { isLoading, connect, web3 } = useWeb3();
  const { pathname } = useRouter();
  const { account } = useAccount();

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <ActiveLink
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Home
              </ActiveLink>
              <ActiveLink
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Blogs
              </ActiveLink>
              <ActiveLink
                href="/marketplace"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Marketplace
              </ActiveLink>
            </div>
            <div className="text-center">
              <ActiveLink
                href="/wishlist"
                className="font-medium sm:mr-8 mr-1 text-gray-500 hover:text-gray-900 md:w-full"
              >
                Wishlist
              </ActiveLink>
            </div>
            <div>
              {isLoading ? (
                <Button disabled={true}>Loading...</Button>
              ) : web3 != null ? (
                account.data ? (
                  <Button hovarable="false" className="cursor-default ">
                    Hi, there {account.isAdmin && "Admin"}
                  </Button>
                ) : (
                  <Button onClick={connect}>Connect</Button>
                )
              ) : (
                <Button
                  onClick={() =>
                    window.open("https://metamask.io/download/", "_blank")
                  }
                >
                  Install
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {account.data && !pathname.includes("/marketplace") && (
        <div className="flex justify-end pt-2 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {account.data}
          </div>
        </div>
      )}
    </section>
  );
}
