import { userService } from '../services/user'
import { CommentPreview } from './CommentPreview'  // שונה מ-CarPreview ל-CommentPreview

export function CommentList({ comments, onRemoveComment, onUpdateComment }) {
    console.log(comments)
    
    function shouldShowActionBtns(comment) {
        const user = userService.getLoggedinUser()
        
        if (!user) return false
        if (user.isAdmin) return true
        return comment.owner?._id === user._id
    }

    return (
        <section>
            <ul className="list">
                {comments.map(comment => (
                    <li key={comment._id}>
                        <CommentPreview comment={comment}/> 
                        {shouldShowActionBtns(comment) && (
                            <div className="actions">
                                <button onClick={() => onUpdateComment(comment)}>Edit</button>
                                <button onClick={() => onRemoveComment(comment._id)}>x</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}
