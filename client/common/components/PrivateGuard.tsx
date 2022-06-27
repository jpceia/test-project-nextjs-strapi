import { useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect } from "react";
import { useGlobalCtx } from "../context"

const PrivateGuard = ({ children }: PropsWithChildren) => {
  const { user } = useGlobalCtx();
  const router = useRouter();

  useEffect(() => {
    if (!user)
      router.push("/");
  }, [user, router]);

  return <Fragment>{children}</Fragment>;
}

export default PrivateGuard;
