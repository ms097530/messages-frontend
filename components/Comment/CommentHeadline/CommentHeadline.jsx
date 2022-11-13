import React from 'react'
import Image from 'next/image'

import styles from './CommentHeadline.module.css'

export default function CommentHeadline({ username, timeSince, avatar, isPoster })
{
    return (
        <div className={styles.headline}>
            <div className={styles.avatarContainer}>
                <Image className={styles.avatar} layout={'fixed'} width={32} height={32} src={avatar} alt={username + ' avatar'} />
            </div>
            <h2 className={styles.username}>{username}</h2>
            {
                isPoster &&
                <h2 className={styles.selfTag}>you</h2>
            }
            <h3 className={styles.timestamp}>{timeSince ? timeSince : 'Just now'}</h3>
        </div>
    )
}
