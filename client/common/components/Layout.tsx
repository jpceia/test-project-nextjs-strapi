import { Fragment } from "react";
import { PropsWithChildren } from "../types";
import Header from "./Header";
import Navbar from "./Navbar";


/*
  Generic Layout component, will wrap all the pages
 */
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
