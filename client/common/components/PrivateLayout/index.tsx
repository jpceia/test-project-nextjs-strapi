import { Fragment } from "react";
import { PropsWithChildren } from "../../types";
import Navbar from "../Navbar";

const PrivateLayout = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      <Navbar />
      <main>{children}</main>
    </Fragment>
  );
}

export default PrivateLayout;
