import Head from 'next/head'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Layout>
        <main className={styles.main}>
          <section className={styles.description}>
            Project detailed page
          </section>
        </main>
      </Layout>
    </>
  )
}

