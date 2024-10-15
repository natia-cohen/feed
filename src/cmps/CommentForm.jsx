import { useState } from "react";

export function CommentForm() {


// const [comment, setComment] = useState()

function handleSubmit(){
    
}
  function handleChange({ target }) {
    const { name, value } = target;

    if (name === "email") {
      console.log(value);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={handleChange} required/>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
