import React, { useContext } from 'react'

export default function Comment({ comment })
{
    return (
        <div>
            <h2>{comment.user.username}</h2>
            <p>{comment.content}</p>
        </div>
    )
}
