import { useContext } from 'react'

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { UserWrapper } from '../components/UserContext/UserContext'
import CommentSection from '../components/CommentSection/CommentSection'
import { DomainContext } from '../components/DomainContext/DomainContext'


export default function Home()
{
  const domain = useContext(DomainContext);
  return (
    <UserWrapper>
      <div className={styles.container}>
        <Head>
          <title>Interactive Comments Section - Frontend Mentor</title>
          <meta name="description" content="Fullstack Interactive Comments Section by Michael Schultz" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <CommentSection
            domain={domain} />
        </main>
        <footer className={styles.footer}>
          <p>Created by <a className="link-visible" href="https://mschultz-portfolio.herokuapp.com/">Michael Schultz</a></p>
        </footer>
      </div>
    </UserWrapper>
  )
}
