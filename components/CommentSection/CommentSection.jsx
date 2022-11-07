import React, { useState, useEffect, useContext } from 'react'
import AddCommentSection from '../AddCommentSection/AddCommentSection'
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

    }, [allCommentsUrl, setUser]);
    return (
        <>
            <h1 style={currentUser.isLoading ? { visibility: 'hidden' } : {}}>{!currentUser.isLoading ? currentUser.data.user.username : 'PLACEHOLDER'}</h1>
            <div>{!currentUser.isLoading && <Image width={64} height={64} src={'http://localhost:8000/' + currentUser.data.user.imageUrl} alt="user avatar" />}</div>

            {
                comments.map(comment =>
                {
                    return (
                        <Comment key={comment._id} comment={comment} />
                    )
                })
            }
            <button onClick={(e) =>
            {
                e.preventDefault()
                setComments(prevComments => prevComments)
            }}>Click me</button>
            {/* render AddComment section */}
            <AddCommentSection replyingUserId={null} />
        </>
    )
}
