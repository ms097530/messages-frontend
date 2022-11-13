import React, { useContext } from 'react'
import Image from 'next/image'

import { useForm } from 'react-hook-form'
import { DomainContext } from '../DomainContext/DomainContext'
import { UserContext } from '../UserContext/UserContext'
import styles from './AddCommentForm.module.css'

export default function AddCommentForm({ parentCommentId, currCommentId,/* replyingUserId, */ content, isEditing })
{
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const currentUser = useContext(UserContext)
    const domain = useContext(DomainContext)
    return (
        <form className={styles.commentForm} onSubmit={handleSubmit(async (data) =>
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

        })}>

            <textarea
                className={styles.input}
                rows={5}
                placeholder='Add a comment...'
                draggable='false'
                {...register('comment')} defaultValue={content ? content : ''} />
            <div>
                {
                    !currentUser.isLoading &&
                    <Image layout={'fixed'} src={domain + '/' + currentUser.data.user.imageUrl} height={32} width={32} alt={currentUser.data.user.username + ' avatar'} />
                }
                <button>
                    {
                        isEditing ? 'Update' :
                            parentCommentId ? 'Reply' :
                                'Send'
                    }
                </button>
            </div>
        </form>
    )
}
