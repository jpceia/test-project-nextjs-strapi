import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import LoginBox from '../common/components/LoginBox'
import RegisterBox from '../common/components/RegisterBox'
import { useGlobalCtx } from '../common/context'
import Layout from '../common/components/Layout'
import { useState } from 'react'
import Header from '../common/components/Header'


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
      <Header />
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
  const { user } = useGlobalCtx();

  console.log(user);

  if (user)
    return (
      <Layout>
        Home
      </Layout>
    );

  // Public
  return <PublicHome />;
}

export default Home
