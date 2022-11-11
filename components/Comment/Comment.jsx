import React, { useContext, useReducer, useState } from 'react'
import CommentHeadline from './CommentHeadline/CommentHeadline'
import { UserContext } from '../UserContext/UserContext';
import LikeCounter from './LikeCounter/LikeCounter';
import UserControls from './UserControls/UserControls';
import DateDiff from 'date-diff';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import { DomainContext } from '../DomainContext/DomainContext';

export default React.memo(function Comment({ comment, upvote, downvote, deleteComment })
{
    const [isReplying, setIsReplying] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const currentUser = useContext(UserContext)
    const domain = useContext(DomainContext)
    let isPoster = currentUser.data.user._id === comment.user._id

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
    // console.log(timeSince)

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

    return (
        <div>
            <LikeCounter
                commentId={comment._id}
                likes={comment.likes}
                upvote={upvote}
                downvote={downvote} />
            <CommentHeadline
                username={comment.user.username}
                timeSince={timeString}
                avatar={parsedUrl}
                isPoster={isPoster} />

            <p>
                {/* add @user where user is the one the comment is in reply to */}
                {
                    comment.repliedTo &&
                    <span>@{comment.repliedTo.username} </span>
                }
                {comment.content}
            </p>
            <UserControls
                isPoster={isPoster}
                commentId={comment._id}
                deleteComment={deleteComment}
                setEditing={setIsEditing}
                setReplying={setIsReplying} />
            {
                isReplying &&
                <AddCommentForm
                    // user is replying to THIS comment
                    parentCommentId={comment._id}
                    isEditing={false} />
            }
            {
                isEditing &&
                <AddCommentForm
                    // when editing, maintain same repliedTo info from original post
                    parentCommentId={comment.repliedTo?.messageId}
                    currCommentId={comment._id}
                    content={comment.content}
                    // replyingUserId={comment.repliedTo}
                    isEditing={true}
                    cancelEditing={cancelEditing} />
            }
        </div>
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
