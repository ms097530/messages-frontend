import React, { useState, useEffect, useContext, useCallback } from 'react'
import AddCommentSection from '../AddCommentSection/AddCommentForm'
import Comment from '../Comment/Comment'
import { UserContext, UserDispatchContext } from '../UserContext/UserContext'
import Image from 'next/image'

export default function CommentSection({ allCommentsUrl, removeCommentUrl, editCommentUrl, addCommentUrl })
{
    const [comments, setComments] = useState([])
    const currentUser = useContext(UserContext)
    const setUser = useContext(UserDispatchContext)
    // console.log(currentUser)
    // console.log(setUser)
    // console.log(setUser)
    // console.log('COMMENT SECTION')   

    useEffect(() =>
    {
        fetch('http://localhost:8000/user')
            .then(res =>
            {
                return res.json()
            })
            .then(data =>
            {
                // _id automatically converted to string?
                // console.log(typeof data.user._id)
                // console.log('likedPosts type: ', typeof data.user.likedPosts)
                setUser({ data: data, isLoading: false })
            })
        fetch(allCommentsUrl)
            .then(res =>
            {
                return res.json()
            })
            .then(data =>
            {
                setComments([...data.messages])
            })
            .catch(err =>
            {
                console.log(err)
                setComments([])
            })

    }, [allCommentsUrl, setUser])

    const upvote = useCallback(async (messageId) =>
    {
        console.log(messageId)
        let res = await fetch('http://localhost:8000/messages/likes',
            {
                method: 'PUT',
                body: JSON.stringify({
                    messageId: messageId,
                    userId: currentUser?.data.user._id,
                    method: 'up'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        let parsedRes = await res.json()
        console.log(parsedRes.message)
    }, [currentUser?.data?.user?._id])

    const downvote = useCallback(async (messageId) =>
    {
        let res = await fetch('http://localhost:8000/messages/likes',
            {
                method: 'PUT',
                body: JSON.stringify({
                    messageId: messageId,
                    userId: currentUser?.data.user._id,
                    method: 'down'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        let parsedRes = await res.json()
        console.log(parsedRes.message)
    }, [currentUser?.data?.user?._id])

    const deleteComment = useCallback(async (messageId) =>
    {

    }, [])

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
                comments.map(comment =>
                {
                    return (
                        <Comment key={comment._id} comment={comment} upvote={upvote} downvote={downvote} />
                    )
                })
            }
            {/* render AddComment section */}
            <AddCommentSection replyingUserId={null} />
        </>
    )
}
