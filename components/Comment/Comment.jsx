import React, { useContext, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import CommentHeadline from './CommentHeadline/CommentHeadline'
import { UserContext } from '../UserContext/UserContext';
import LikeCounter from './LikeCounter/LikeCounter';
import UserControls from './UserControls/UserControls';
import DateDiff from 'date-diff';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import { DomainContext } from '../DomainContext/DomainContext';
import styles from './Comment.module.css';

export default React.memo(function Comment({ comment, upvote, downvote, deleteComment })
{
    const [isReplying, setIsReplying] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const isLarge = useMediaQuery(
        { minWidth: 600 }
    )

    const currentUser = useContext(UserContext)
    const domain = useContext(DomainContext)

    let isPoster = currentUser.data.user._id === comment.user._id
    // if (currentUser.data)
    //     isPoster = currentUser.data.user._id === comment.user._id

    let lengthSince = new DateDiff(new Date(), new Date(comment.createdAt))
    let timeSince =
    {
        year: lengthSince.years(),
        month: lengthSince.months(),
        week: lengthSince.weeks(),
        day: lengthSince.days(),
        hour: lengthSince.hours(),
        minute: lengthSince.minutes(),
        second: lengthSince.seconds()
    }

    let timeString
    for (const [key, value] of Object.entries(timeSince))
    {
        if (value >= 1)
        {
            const flooredVal = Math.floor(value)
            timeString = flooredVal.toString() + ' ' + key + (flooredVal === 1 ? '' : 's') + ' ago'
            break
        }
    }
    const parsedUrl = domain + '/' + comment.user.imageUrl.replace(/\\/g, '/')

    function cancelEditing()
    {
        setIsEditing(false)
    }

    const isReply = comment.repliedTo
    return (
        <>
            {/* Mobile version of comment body */}
            {
                !isLarge &&
                <div className={`${styles.comment} ${isReply ? styles.reply : ''}`}>

                    <CommentHeadline
                        username={comment.user.username}
                        timeSince={timeString}
                        avatar={parsedUrl}
                        isPoster={isPoster} />


                    <p className={styles.content}>
                        {/* add @user where user is the one the comment is in reply to */}
                        {
                            comment.repliedTo &&
                            <span className={styles.replyTag}>@{comment.repliedTo.username} </span>
                        }
                        {comment.content}
                    </p>
                    <div className={styles.controlsContainer}>
                        <LikeCounter
                            commentId={comment._id}
                            likes={comment.likes}
                            upvote={upvote}
                            downvote={downvote} />
                        <UserControls
                            isPoster={isPoster}
                            commentId={comment._id}
                            deleteComment={deleteComment}
                            setEditing={setIsEditing}
                            setReplying={setIsReplying} />
                    </div>
                </div>
            }

            {/* Large version of comment body */}
            {
                isLarge &&
                <div className={`${styles.comment} ${isReply ? styles.reply : ''}`}>
                    <LikeCounter
                        commentId={comment._id}
                        likes={comment.likes}
                        upvote={upvote}
                        downvote={downvote} />
                    <div className={styles.innerContainer}>
                        <div style={{ display: 'flex', rowGap: '0.5rem', justifyContent: 'space-between' }}>
                            <CommentHeadline
                                username={comment.user.username}
                                timeSince={timeString}
                                avatar={parsedUrl}
                                isPoster={isPoster} />
                            <UserControls
                                isPoster={isPoster}
                                commentId={comment._id}
                                deleteComment={deleteComment}
                                setEditing={setIsEditing}
                                setReplying={setIsReplying} />
                        </div>
                        <p className={styles.content}>
                            {/* add @user where user is the one the comment is in reply to */}
                            {
                                comment.repliedTo &&
                                <span className={styles.replyTag}>@{comment.repliedTo.username} </span>
                            }
                            {comment.content}
                        </p>
                    </div>
                </div>
            }

            {/* Comment forms */}
            {
                isReplying &&
                <div className={`${styles.form} ${isReply ? styles.reply : ''}`}>
                    <AddCommentForm
                        // user is replying to THIS comment
                        parentCommentId={comment._id}
                        isReplying={true}
                        isEditing={false}
                        endReplying={() => setIsReplying(false)} />
                </div>
            }
            {
                isEditing &&
                <div className={`${styles.form} ${isReply ? styles.reply : ''}`}>
                    <AddCommentForm
                        // when editing, maintain same repliedTo info from original post
                        parentCommentId={comment.repliedTo?.messageId}
                        currCommentId={comment._id}
                        content={comment.content}
                        // replyingUserId={comment.repliedTo}
                        isReplying={false}
                        isEditing={true}
                        cancelEditing={cancelEditing}
                        endEditing={() => setIsEditing(false)} />
                </div>
            }
        </>

    )
}, (prevProps, currProps) =>
{
    // console.log('prevProps ', prevProps)
    // console.log('currProps ', currProps)
    if (
        prevProps.comment._id === currProps.comment._id &&
        prevProps.comment.content === currProps.comment.content &&
        prevProps.likes === currProps.comment.likes
    )
        return true
    else
        return false
})
