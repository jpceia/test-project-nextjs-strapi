import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useGlobalCtx } from "../context";
import styles from "./Navbar.module.css"

interface IPublicRoute {
  path: string,
  display: string
}

const publicRoutes: IPublicRoute[] = [
  {
    path: "/login",
    display: "Login"
  },
  {
    path: "/register",
    display: "Registrar"
  }
]

const privateRoutes: IPublicRoute[] = [
  {
    path: "/",
    display: "Home"
  },
  {
    path: "/available-courses",
    display: "Cursos",
  },
  {
    path: "/my-courses",
    display: "Meus Cursos"
  },
  {
    path: "/profile",
    display: "Perfil"
  },
  {
    path: "/logout",
    display: "Sair"
  }
]

const Navbar = () => {
  const { user } = useGlobalCtx();
  const router = useRouter();
  const routes = user ? privateRoutes : publicRoutes;

  return (
    <ul className={styles.nav}>
    {
      routes.map((entry, index) => {
        const { path, display} = entry;
        return (
          <li key={index} className={styles.item}>
            <span style={{fontWeight: router.pathname === path ? 'bold' : ''}}>
              <Link href={path}>{display}</Link>
            </span>
          </li>
        );
      })
    }
    </ul>
  );
}

export default Navbar;
