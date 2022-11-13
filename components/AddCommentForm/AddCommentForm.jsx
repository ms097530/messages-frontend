import React, { useContext, useEffect } from 'react'
import Image from 'next/image'

import { useMediaQuery } from 'react-responsive'
import { useForm } from 'react-hook-form'
import { DomainContext } from '../DomainContext/DomainContext'
import { UserContext } from '../UserContext/UserContext'
import styles from './AddCommentForm.module.css'

export default function AddCommentForm({ parentCommentId, currCommentId, content, isEditing, endEditing, isReplying, endReplying })
{
    const { register, handleSubmit, reset, formState, formState: { isSubmitSuccessful } } = useForm()
    const currentUser = useContext(UserContext)
    const domain = useContext(DomainContext)
    const isLarge = useMediaQuery(
        { minWidth: 600 }
    )

    useEffect(() =>
    {
        if (formState.isSubmitSuccessful)
        {
            reset()
        }
    }, [formState, reset])

    const submitHandler = async (data) =>
    {
        // send POST request with userId from context, the userId, and the parent comment (if there is one)
        // console.log(data)
        const url = isEditing ? domain + '/messages/' + currCommentId : domain + '/messages'
        const method = isEditing ? 'PUT' : 'POST'
        const res = await fetch(url, {
            method: method,
            body: JSON.stringify({
                content: data.comment,
                repliedTo: parentCommentId,
                userId: currentUser.data.user._id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const parsedRes = await res.json()
        console.log(parsedRes)
        if (isEditing)
            endEditing()
        if (isReplying)
            endReplying()
    }
    return (
        <form className={styles.commentForm} onSubmit={handleSubmit(submitHandler)}>

            {/* avatar, textarea, and button are all in one line on large screens */}
            {
                isLarge && !currentUser.isLoading &&
                <div className={styles.avatarContainer}>
                    <Image layout={'fixed'} src={domain + '/' + currentUser.data.user.imageUrl} height={32} width={32} alt={currentUser.data.user.username + ' avatar'} />
                </div>
            }

            <textarea
                className={styles.input}
                rows={5}
                placeholder={`Add a ${isReplying ? 'reply' : 'comment'}...`}
                draggable='false'
                {...register('comment')} defaultValue={content ? content : ''} />

            {
                isLarge &&
                <button className={styles.submitBtn}>
                    {
                        isEditing ? 'Update' :
                            parentCommentId ? 'Reply' :
                                'Send'
                    }
                </button>
            }

            {/* display underneath textarea on small screens */}
            {
                !isLarge &&
                <div className={styles.container}>
                    {
                        !currentUser.isLoading &&
                        <div className={styles.avatarContainer}>
                            <Image layout={'fixed'} src={domain + '/' + currentUser.data.user.imageUrl} height={32} width={32} alt={currentUser.data.user.username + ' avatar'} />
                        </div>
                    }
                    <button className={styles.submitBtn}>
                        {
                            isEditing ? 'Update' :
                                parentCommentId ? 'Reply' :
                                    'Send'
                        }
                    </button>
                </div>
            }
        </form>
    )
}
