import { useRouter } from "next/router";
import { Fragment, PropsWithChildren } from "react";
import { useGlobalCtx } from "../context"

const PrivateGuard = ({ children }: PropsWithChildren) => {
  const { user } = useGlobalCtx();
  const router = useRouter();

  if (!user)
    router.push("/");
  
  return <Fragment>{children}</Fragment>;
}

export default PrivateGuard;