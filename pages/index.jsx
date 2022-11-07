import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { UserWrapper, UserDispatchContext } from '../components/UserContext/UserContext'
import { useContext, useEffect } from 'react'
import CommentSection from '../components/CommentSection/CommentSection'

const getCommentsUrl = 'http://localhost:8000/messages'

export default function Home()
{
  // const setUser = useContext(UserDispatchContext);
  // console.log(setUser)
  // useEffect(() =>
  // {
  //   fetch('http://localhost:8000/user')
  //     .then((res) => res.json())
  //     .then((data) => setUser(data))
  // }, [setUser]);
  // console.log('HOME')
  return (
    <UserWrapper>
      <div className={styles.container}>
        <Head>
          <title>Interactive Comments Section - Frontend Mentor</title>
          <meta name="description" content="Interactive Comments Section by Michael Schultz" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <CommentSection allCommentsUrl={getCommentsUrl} />
        </main>
        <footer className={styles.footer}>
          <p>Created by <a className="link-visible" href="https://mschultz-portfolio.herokuapp.com/">Michael Schultz</a></p>
        </footer>
      </div>
    </UserWrapper>
  )
}
