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
    const isLiked = currentUser.data.user.likedPosts.includes(commentId)
    const isDisliked = currentUser.data.user.dislikedPosts.includes(commentId)
    return (
        <div className={styles.container}>
            <span className={`${styles.upvote} ${isLiked ? styles.voted : ''}`} onClick={handleUpvote}>+</span>
            <span className={styles.likes}>{likes}</span>
            <span className={`${styles.downvote} ${isDisliked ? styles.voted : ''}`} onClick={handleDownvote}>-</span>
        </div>
    )
}
