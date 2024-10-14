import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'comment'  

export const commentService = {
    query,
    getById,
    save,
    remove,
    addcommentMsg
}
window.is = commentService 


async function query(filterBy = { message: ''}) {
    var comments = await storageService.query(STORAGE_KEY)
    const { message, sortField, sortDir } = filterBy

    if (message) {
        const regex = new RegExp(filterBy.message, 'i')
        comments = comments.filter(comment => regex.test(comment.email) || regex.test(comment.message))  
    }

    
    comments = comments.map(({ _id, email, message, gravatarUrl, createdAt }) => ({ _id, email, message, gravatarUrl, createdAt })) 
    return comments
}

function getById(commentId) {
    return storageService.get(STORAGE_KEY, commentId) 
}

async function remove(commentId) {
    await storageService.remove(STORAGE_KEY, commentId)  
}

async function save(comment) {
    var savedcomment
    if (comment._id) {
        const commentToSave = {
            _id: comment._id,
            email: comment.email,
            message: comment.message,
        }
        savedcomment = await storageService.put(STORAGE_KEY, commentToSave)
    } else {
        const commentToSave = {
            email: comment.email, 
            message: comment.message,
            gravatarUrl: "https://www.gravatar.com/avatar/hash",
            createdAt: "2024-10-14T12:00:00Z",
        }
        savedcomment = await storageService.post(STORAGE_KEY, commentToSave)
    }
    return savedcomment
}

async function addcommentMsg(commentId, txt) {
    const comment = await getById(commentId)  

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    item.msgs.push(msg)
    await storageService.put(STORAGE_KEY, item)

    return msg
}
