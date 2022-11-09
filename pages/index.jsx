import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { UserWrapper } from '../components/UserContext/UserContext'
import CommentSection from '../components/CommentSection/CommentSection'

const getUserUrl = 'http://localhost:8000/user'
const getCommentsUrl = 'http://localhost:8000/messages'
const domain = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'http://localhost:8000'

export default function Home()
{
  return (
    <UserWrapper>
      <div className={styles.container}>
        <Head>
          <title>Interactive Comments Section - Frontend Mentor</title>
          <meta name="description" content="Interactive Comments Section by Michael Schultz" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <CommentSection
            allCommentsUrl={getCommentsUrl}
            getUserUrl={getUserUrl}
            editCommentUrl={''}
            domain={domain} />
        </main>
        <footer className={styles.footer}>
          <p>Created by <a className="link-visible" href="https://mschultz-portfolio.herokuapp.com/">Michael Schultz</a></p>
        </footer>
      </div>
    </UserWrapper>
  )
}
