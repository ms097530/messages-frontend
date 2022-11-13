import React, { useContext } from 'react'
import { UserContext } from '../../UserContext/UserContext'
import styles from './LikeCounter.module.css'

export default function LikeCounter({ commentId, likes, upvote, downvote })
{
    async function handleUpvote()
    {
        await upvote(commentId)
    }
    async function handleDownvote()
    {
        await downvote(commentId)
    }
    const currentUser = useContext(UserContext)
    return (
        <div className={styles.container}>
            <span className={styles.upvote} onClick={handleUpvote}>+</span>
            <span className={styles.likes}>{likes}</span>
            <span className={styles.downvote} onClick={handleDownvote}>-</span>
        </div>
    )
}
