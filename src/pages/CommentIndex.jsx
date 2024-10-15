import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  loadComments,
  addComment,
  updateComment,
  removeComment,
  addCommentMsg,
} from "../store/actions/comment.actions";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import { commentService } from "../services/comment";
import { userService } from "../services/user";

import { CommentList } from "../cmps/CommentList";
import { CommentFilter } from "../cmps/CommentFilter";
import { CommentForm } from "../cmps/CommentForm";

export function CommentIndex() {
  const comments = useSelector(
    (storeState) => storeState.commentModule.comments
  );

  const [filterBy, setFilterBy] = useState(commentService.getDefaultFilter());
  const [newComment, setNewComment] = useState(
    commentService.getEmptyComment()
  );
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    loadComments(filterBy);
  }, [filterBy]);

  useEffect(() => {
    if (isSubmitted) {
        onAddComment();
    
    }

  }, [isSubmitted,setNewComment]);

  async function onRemoveComment(commentId) {
    try {
      await removeComment(commentId);
      showSuccessMsg("Comment removed");
    } catch (err) {
      showErrorMsg("Cannot remove Comment");
    }
  }

  async function onAddComment() {
    try {
  
      const savedComment = await addComment(newComment);

      showSuccessMsg(`Comment added (id: ${savedComment.email})`);
      setNewComment(commentService.getEmptyComment())
      setIsSubmitted(false)
    } catch (err) {
      showErrorMsg("Cannot add comment");
    }
  }

  //   async function onUpdateComment(comment) {
  //     const speed = +prompt("New speed?", comment.speed);
  //     if (speed === 0 || speed === comment.speed) return;

  //     const commentToSave = { ...comment, speed };
  //     try {
  //       const savedComment = await updateComment(commentToSave);
  //       showSuccessMsg(`Comment updated, new speed: ${savedComment.speed}`)
  //     } catch (err) {
  //       showErrorMsg("Cannot update comment");
  //     }
  //   }
  function handleSubmit(ev) {
    ev.preventDefault();
    setIsSubmitted(true);

    console.log("Submitted", newComment);
  }

  return (
    <main className="comment-index">
      <header>
        <h2>Comments</h2>
        {userService.getLoggedinUser() && (
          <button onClick={onAddComment}>Add an Comment</button>
        )}
      </header>
      <CommentFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      <CommentForm newComment={newComment} setNewComment={setNewComment} handleSubmit={handleSubmit} />
      <CommentList
        comments={comments}
        onRemoveComment={onRemoveComment}
        // onUpdateComment={onUpdateComment}
      />
    </main>
  );
}
