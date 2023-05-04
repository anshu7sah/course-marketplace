import { Breadcrumbs } from "../../common";
import { EthRates, WalletBar } from "../../web3";

const LINKS = [
  {
    href: "/marketplace",
    value: "Buy",
  },
  {
    href: "/marketplace/courses/owned",
    value: "My Courses",
  },
  {
    href: "/marketplace/courses/managed",
    value: "Manage Courses",
  },
];

export default function Header() {
  return (
    <>
      <div className="pt-4">
        <WalletBar />
      </div>

      <EthRates />

      <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={LINKS} />
      </div>
    </>
  );
}
