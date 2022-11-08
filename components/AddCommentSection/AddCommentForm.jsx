import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../UserContext/UserContext'
import styles from './AddCommentForm.module.css'

export default function AddCommentForm({ replyingUserId, content })
{
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const currentUser = useContext(UserContext)
    return (
        <form onSubmit={handleSubmit(async (data) =>
        {
            // send POST request with userId from context, the userId, and the parent comment (if there is one)
            // console.log(data)
            const res = await fetch('http://localhost:8000/messages', {
                method: 'POST',
                body: JSON.stringify({
                    message: data.comment,
                    repliedTo: replyingUserId,
                    userId: currentUser.data.user._id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const parsedRes = await res.json()
            console.log(parsedRes)
        })}>
            <textarea className={styles.input} placeholder='Add a comment...' draggable='false'
                {...register('comment')} defaultValue={content ? content : ''} />
            <button>Send</button>
        </form>
    )
}
