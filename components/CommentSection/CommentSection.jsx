import React, { useState, useEffect, useContext, useCallback } from 'react'
import { io } from 'socket.io-client'

import AddCommentForm from '../AddCommentForm/AddCommentForm'
import Comment from '../Comment/Comment'
import { UserContext, UserDispatchContext } from '../UserContext/UserContext'
import Image from 'next/image'
import { DomainContext } from '../DomainContext/DomainContext'

export default function CommentSection({ })
{
    const [comments, setComments] = useState([])
    const currentUser = useContext(UserContext)
    const setUser = useContext(UserDispatchContext)
    const domain = useContext(DomainContext)

    useEffect(() =>
    {
        fetch(domain + '/user')
            .then(res =>
            {
                return res.json()
            })
            .then(data =>
            {
                setUser({ data: data, isLoading: false })
            })
        fetch(domain + '/messages')
            .then(res =>
            {
                return res.json()
            })
            .then(data =>
            {
                // comments will be in order of oldest to newest
                // extract top level comments, splice replies after respective comment, move onto next response (possibly a reply) and continuously extract replies
                const sortedComments = data.messages.filter(comment =>
                {
                    return comment.repliedTo === undefined || comment.repliedTo === null
                })
                for (let i = 0; i < sortedComments.length; ++i)
                {
                    let numReplies = sortedComments[i].replies.length
                    let replies = []
                    for (let j = 0; j < numReplies; ++j)
                    {
                        replies.push(data.messages.find(comment => comment._id === sortedComments[i].replies[j]))
                    }
                    sortedComments.splice(i + 1, 0, ...replies)
                }
                setComments(sortedComments)
                // initialize socket.io in the component that manages the state you are watching for changes in
                const socket = io('http://localhost:8000')
                socket.on('message', (data) =>
                {
                    if (data.action === 'create')
                    {

                    }
                    if (data.action === 'update')
                    {

                    }
                    if (data.action === 'delete')
                    {

                    }

                })
            })
            .catch(err =>
            {
                console.log(err)
                setComments([])
            })

    }, [domain, setUser])

    const upvote = useCallback(async (messageId) =>
    {
        console.log(messageId)
        let res = await fetch(domain + '/messages/likes/' + messageId,
            {
                method: 'PUT',
                body: JSON.stringify({
                    userId: currentUser?.data?.user?._id,
                    method: 'up'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        let parsedRes = await res.json()
        console.log(parsedRes.message)
    }, [currentUser?.data?.user?._id, domain])

    const downvote = useCallback(async (messageId) =>
    {
        let res = await fetch(domain + '/messages/likes/' + messageId,
            {
                method: 'PUT',
                body: JSON.stringify({
                    userId: currentUser?.data?.user?._id,
                    method: 'down'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        let parsedRes = await res.json()
        console.log(parsedRes.message)
    }, [currentUser?.data?.user?._id, domain])

    const deleteComment = useCallback(async (messageId) =>
    {
        let res = await fetch(domain + '/messages/' + messageId,
            {
                method: 'DELETE',
                body: JSON.stringify({
                    userId: currentUser?.data?.user?._id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        let parsedRes = await res.json()
        console.log(parsedRes.message)
    }, [currentUser?.data?.user?._id, domain])

    return (
        <>
            {/* make sure able to load user data */}
            <h1 style={currentUser.isLoading ? { visibility: 'hidden' } : {}}>
                {!currentUser.isLoading ? currentUser.data.user.username : 'PLACEHOLDER'}
            </h1>
            {/* make sure getting image from assigned user works */}
            <div>
                {!currentUser.isLoading && <Image width={64} height={64} src={'http://localhost:8000/' + currentUser.data.user.imageUrl} alt="user avatar" />}
            </div>
            {/* render fetched comments */}
            {
                comments.length === 0 ? 'No comments found' :
                    comments.map(comment =>
                    {
                        return (
                            <Comment
                                key={comment._id}
                                comment={comment}
                                upvote={upvote}
                                downvote={downvote}
                                deleteComment={deleteComment} />
                        )
                    })
            }
            {/* render AddComment section */}
            <AddCommentForm replyingUserId={null} />
        </>
    )
}
