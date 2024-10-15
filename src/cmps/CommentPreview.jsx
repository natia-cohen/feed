import { Link } from "react-router-dom";
import md5 from "md5";

export function CommentPreview({ comment }) {
    const gravatarHash = md5(comment.email.trim().toLowerCase());
  return (
    <article className="preview">
      <header>
        <Link to={`/comment/${comment._id}`}>{comment.email}</Link>{" "}
        {/* שונה מ-car.vendor ל-comment.name */}
      </header>

      <p>
        email: <span>{comment.email.toLocaleString()}</span>
      </p>
      {comment.message && (
        <p>
          message: <span>{comment.message}</span>
        </p>
      )}
      <img
        src={`https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`}
        alt={`${comment.email}'s avatar`}
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
    </article>
  );
}
