import React from 'react'
import Image from 'next/image'

export default function CommentHeadline({ username, timeSince, avatar, isPoster })
{
    return (
        <div>
            <Image width={64} height={64} src={avatar} alt={username + ' avatar'} />
            <h2>{username}</h2>
            {
                isPoster &&
                <h2>you</h2>
            }
            <h3>{timeSince}</h3>
        </div>
    )
}
