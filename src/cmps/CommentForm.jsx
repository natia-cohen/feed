import { useState } from "react";

export function CommentForm({ newComment, setNewComment,handleSubmit }) {
 


  function handleChange({ target }) {
    const { name, value } = target
    
    if (name === "email" || name === "message") {
      console.log(value);
      setNewComment((prevComment) => ({
        ...prevComment,
        [name]: value,
      }));
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={newComment.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="message">Message:</label>
       <textarea
       id="message"
       name="message"
       value={newComment.message}
       onChange={handleChange}
       required
       rows="4"
       cols="50"
       />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
