import React from 'react'

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
    return (
        <div>
            <span onClick={handleUpvote}>+</span>
            <span>{likes}</span>
            <span onClick={handleDownvote}>-</span>
        </div>
    )
}
