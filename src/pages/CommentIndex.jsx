import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadComments, addComment, updateComment, removeComment, addCommentMsg } from '../store/actions/comment.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { commentService } from '../services/comment'
import { userService } from '../services/user'

import { CommentList } from '../cmps/CommentList'
import { CommentFilter } from '../cmps/CommentFilter'
import { CommentForm } from '../cmps/CommentForm'

export function CommentIndex() {

    const [ filterBy, setFilterBy ] = useState(commentService.getDefaultFilter())
    const comments = useSelector(storeState => storeState.commentModule.comments)

    useEffect(() => {
        loadComments(filterBy)
    }, [filterBy])
  


    async function onRemoveComment(commentId) {
        try {
            await removeComment(commentId)
            showSuccessMsg('Comment removed')            
        } catch (err) {
            showErrorMsg('Cannot remove Comment')
        }
    }

    async function onAddComment() {
        const comment = commentService.getEmptyComment()
        comment.name = prompt('Comment name?')
        try {
            const savedComment = await addComment(comment)
            showSuccessMsg(`Comment added (id: ${savedComment._id})`)
        } catch (err) {
            showErrorMsg('Cannot add comment')
        }        
    }

    async function onUpdateComment(comment) {
        const speed = +prompt('New speed?', comment.speed)
        if(speed === 0 || speed === comment.speed) return

        const commentToSave = { ...comment, speed }
        try {
            const savedComment = await updateComment(commentToSave)
            showSuccessMsg(`Comment updated, new speed: ${savedComment.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update comment')
        }        
    }

    return (
        <main className="comment-index">
            <header>
                <h2>Comments</h2>
                {userService.getLoggedinUser() && <button onClick={onAddComment}>Add an Comment</button>}
            </header>
            <CommentFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <CommentForm />
            <CommentList 
                comments={comments}
                onRemoveComment={onRemoveComment} 
                onUpdateComment={onUpdateComment}/>
        </main>
    )
}
