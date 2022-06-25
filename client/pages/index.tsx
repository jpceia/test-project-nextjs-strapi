import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import LoginBox from '../common/components/LoginBox'
import RegisterBox from '../common/components/RegisterBox'
import { useAuth } from '../common/auth'
import PrivateLayout from '../common/components/PrivateLayout'
import { useState } from 'react'


interface PublicHomeBoxProps {
  state: null | "login" | "register"
}

const PublicHomeBox = ({ state }: PublicHomeBoxProps) => {
  if (state === "register")
    return <RegisterBox />

  if (state === "login")
    return <LoginBox />

  return ;
}

const PublicHome = () => {
  const [state, setState] = useState<null | "login" | "register">(null);

  return (
    <div>
      <h1 className={styles.title}>
        Test Project
      </h1>
      <h2 className={styles.subtitle}>
        @ Workmedia
      </h2>
      <h3 onClick={() => setState("login")}>Login</h3>
      <h3 onClick={() => setState("register")}>Register</h3>
      <div className={styles.nonAuthGrid}>
        { (state === "login") && <LoginBox />}
        { (state === "register") && <RegisterBox />}
      </div>
    </div>
  );
}


const Home: NextPage = () => {
  const { user } = useAuth();

  console.log(user);

  if (user)
    return (
      <PrivateLayout>
        Home
      </PrivateLayout>
    );

  // Public
  return <PublicHome />;
}

export default Home
