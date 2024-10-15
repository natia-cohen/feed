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


async function query(filterBy = {email:'', message: ''}) {
    try {
        var comments = await storageService.query(STORAGE_KEY);
        console.log('Loaded comments:', comments);
        
        const { email, message } = filterBy;
        if (message) {
            const regex = new RegExp(filterBy.message, 'i');
            comments = comments.filter(comment => regex.test(comment.email) || regex.test(comment.message));
        }

        comments = comments.map(({ _id, email, message, gravatarUrl, createdAt }) => ({ _id, email, message, gravatarUrl, createdAt }));
        return comments;
    } catch (err) {
        console.error('Error in query:', err);
        throw err; // זריקת השגיאה כך שהקריאה תיכנס ל-catch ב-loadComments
    }
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
            _id: makeId(),
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

const demoData = [
    {
      _id: "IWO2eCev",
      email: "alice.jones@example.com",
      message: "Hey, I just wanted to say how much I enjoyed this article!",
      gravatarUrl: "https://www.gravatar.com/avatar/52e4ce24a915fb5ae2a6b6d67e709ff6",
      createdAt: "2024-10-12T15:32:10"
    },
    {
      _id: "73O0rMai",
      email: "bob.smith@example.com",
      message: "Thanks for the detailed explanation, really helped!",
      gravatarUrl: "https://www.gravatar.com/avatar/111d68d06e2d318d6fb87c2e7f0b1093",
      createdAt: "2024-10-13T09:21:45"
    },
    {
      _id: "4pExG6hB",
      email: "carol.wilson@example.com",
      message: "Is there any chance for a follow-up on this topic?",
      gravatarUrl: "https://www.gravatar.com/avatar/ab53a2911ddf9baf1c84834b29185af2",
      createdAt: "2024-10-14T08:14:30"
    },
    {
      _id: "5PgoN17S",
      email: "david.jones@example.com",
      message: "Great content, learned a lot today. Keep up the good work!",
      gravatarUrl: "https://www.gravatar.com/avatar/97d6d9441ff85f53c407944feab456c9",
      createdAt: "2024-10-15T11:30:05"
    },
    {
      _id: "TvFV2ODW",
      email: "emily.brown@example.com",
      message: "I have a question about one of the points mentioned here...",
      gravatarUrl: "https://www.gravatar.com/avatar/7e65550957227bbf47fd64f75f7a57f2",
      createdAt: "2024-10-15T12:05:12"
    },
    {
      _id: "gQvEy8oP",
      email: "frank.green@example.com",
      message: "This is exactly what I was looking for, thank you!",
      gravatarUrl: "https://www.gravatar.com/avatar/8fd9099b0c1b3f8fc654ac1567e0bfa6",
      createdAt: "2024-10-15T13:00:45"
    },
    {
      _id: "8sjgF3KU",
      email: "grace.white@example.com",
      message: "Can you provide more examples for better clarity?",
      gravatarUrl: "https://www.gravatar.com/avatar/c04cf64d9bbedf418bcaee6633a6e9bc",
      createdAt: "2024-10-15T13:50:32"
    },
    {
      _id: "rF7D1s4p",
      email: "henry.martin@example.com",
      message: "Fantastic explanation, thanks a lot!",
      gravatarUrl: "https://www.gravatar.com/avatar/98b12c34fddc97d6b65abcf8db82b48e",
      createdAt: "2024-10-15T14:22:17"
    },
    {
      _id: "lOv5F3Jz",
      email: "isabella.moore@example.com",
      message: "I shared this with my team, really helpful resource.",
      gravatarUrl: "https://www.gravatar.com/avatar/23e384da7d4c0174d32d2e0bb2ff8502",
      createdAt: "2024-10-15T14:55:50"
    },
    {
      _id: "3pMxF7Wk",
      email: "jackson.miller@example.com",
      message: "Looking forward to more articles like this!",
      gravatarUrl: "https://www.gravatar.com/avatar/89a8fd1c5eaa91e6b5a6ad3c9f3a8d5d",
      createdAt: "2024-10-15T15:20:30"
    }
  ];
  


localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData));