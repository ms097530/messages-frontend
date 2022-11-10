import React from 'react'

export default function UserControls({ isPoster, commentId, deleteComment, setEditing, setReplying })
{
    async function handleDelete()
    {
        // console.log('clicking this will delete a comment later')
        deleteComment(commentId)
    }
    return (
        <div>
            {
                isPoster &&
                <>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={() => setEditing(true)}>Edit</button>
                </>
            }
            {
                !isPoster &&
                <button onClick={() => setReplying(true)}>Reply</button>
            }
        </div>
    )
}
