import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import LoginBox from '../common/components/LoginBox'
import RegisterBox from '../common/components/RegisterBox'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Workmedia @ Test project</title>
        <meta name="description" content="test-project-nextjs-strapi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Test Project
        </h1>
        <h2 className={styles.subtitle}>
          @ Workmedia
        </h2>

        <div className={styles.nonAuthGrid}>
          <LoginBox />
          <RegisterBox />
        </div>

        <Link href="/available-courses">Available Courses</Link>
        <Link href="/my-courses">My Courses</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/logout">Logout</Link>

      </main>
    </div>
  )
}

export default Home
