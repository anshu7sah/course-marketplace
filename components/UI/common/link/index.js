import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

export default function ActiveLink({ children, activeLinkClass, ...props }) {
  const { pathname } = useRouter();
  let className = props.className || "";

  if (pathname === props.href) {
    className = `${className}  ${
      activeLinkClass ? activeLinkClass : "text-black"
    }`;
  }

  return (
    <Link {...props} className={className}>
      {children}
    </Link>
  );
}
