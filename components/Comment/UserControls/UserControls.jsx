import React, { useState } from 'react'

import Modal from 'react-modal'

import styles from './UserControls.module.css'

export default function UserControls({ isPoster, commentId, deleteComment, setEditing, setReplying })
{
    Modal.setAppElement('#__next')
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModal()
    {
        setModalIsOpen(true)
    }

    function closeModal()
    {
        setModalIsOpen(false)
    }

    async function handleDelete()
    {
        deleteComment(commentId)
        closeModal()
    }
    return (
        <div className={styles.controls}>
            {
                isPoster &&
                <>
                    <button
                        className={`${styles.delete} ${styles.warningBtn}`}
                        onClick={openModal}>
                        Delete
                    </button>
                    <button
                        className={`${styles.edit} ${styles.defaultBtn}`}
                        onClick={() => setEditing(true)}>
                        Edit
                    </button>
                </>
            }
            {
                !isPoster &&
                <button
                    className={`${styles.reply} ${styles.defaultBtn}`}
                    onClick={() => setReplying(true)}>
                    Reply
                </button>
            }

            <Modal
                isOpen={modalIsOpen}
                className={styles.modal}
                overlayClassName={styles.overlay}>
                <h2 className={styles.modalHeading}>Delete comment</h2>
                <p className={styles.modalText}>
                    Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone.
                </p>
                <div className={styles.btnContainer}>
                    <button
                        className={`${styles.modalCancelBtn} ${styles.modalBtn}`}
                        onClick={closeModal}>
                        No, Cancel
                    </button>
                    <button
                        className={`${styles.modalDeleteBtn} ${styles.modalBtn}`}
                        onClick={handleDelete}>
                        Yes, Delete
                    </button>
                </div>
            </Modal>
        </div>
    )
}
