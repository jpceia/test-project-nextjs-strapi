import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { GuardProps } from "../types";

/*
  Generic Guard to protect pages from being accessed if a given condition is
  not respected.

  In those cases, there is a redirection to the home page (/)
 */
const Guard = ({ children, condition }: GuardProps) => {
  const router = useRouter();

  useEffect(() => {
    if (condition)
      router.push("/");
  }, [condition, router]);

  return (condition ? 
    <div>Redirecting...</div> :
    <Fragment>{children}</Fragment>
  );
}

export default Guard;
