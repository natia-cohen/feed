import { httpService } from '../http.service'

export const commentService = {
    query,
    getById,
    save,
    remove,
    addCommentMsg
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`comment`, filterBy)  // שונה מ-'car' ל-'comment'
}

function getById(commentId) {
    return httpService.get(`comment/${commentId}`)  // שונה מ-'carId' ל-'commentId'
}

async function remove(commentId) {
    return httpService.delete(`comment/${commentId}`)  
}

async function save(comment) {
    var savedComment
    if (comment._id) {
        savedComment = await httpService.put(`comment/${comment._id}`, comment)  // שונה מ-'car' ל-'comment'
    } else {
        savedComment = await httpService.post('comment', comment)  // שונה מ-'car' ל-'comment'
    }
    return savedComment
}

async function addCommentMsg(commentId, txt) {
    const savedMsg = await httpService.post(`comment/${commentId}/msg`, {txt})  // שונה מ-'carId' ל-'commentId'
    return savedMsg
}
