import React from 'react'

import styles from './UserControls.module.css'

export default function UserControls({ isPoster, commentId, deleteComment, setEditing, setReplying })
{
    async function handleDelete()
    {
        // console.log('clicking this will delete a comment later')
        deleteComment(commentId)
    }
    return (
        <div className={styles.controls}>
            {
                isPoster &&
                <>
                    <button className={`${styles.delete} ${styles.warningBtn}`}
                        onClick={handleDelete}>Delete</button>
                    <button className={`${styles.edit} ${styles.defaultBtn}`} onClick={() => setEditing(true)}>Edit</button>
                </>
            }
            {
                !isPoster &&
                <button className={`${styles.reply} ${styles.defaultBtn}`}
                    onClick={() => setReplying(true)}>Reply</button>
            }
        </div>
    )
}
