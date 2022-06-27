import { Fragment } from "react";
import { PropsWithChildren } from "../types";
import Header from "./Header";
import Navbar from "./Navbar";


const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      <Header />
      <Navbar />
      <main>{children}</main>
    </Fragment>
  );
}

export default Layout;
