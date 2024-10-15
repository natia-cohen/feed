const { DEV, VITE_LOCAL } = import.meta.env;

import { getRandomIntInclusive, makeId } from '../util.service';

import { commentService as local } from './comment.service.local';
import { commentService as remote } from './comment.service.remote';

function getEmptyComment() {
	return {
        email:'',
		message: '',
	}
}

function getDefaultFilter() {
    return {
        email: '',
        message: '',
        sortField: '',
        sortDir: '',
    };
}

const service = VITE_LOCAL === 'true' ? local : remote;
export const commentService = { getEmptyComment, getDefaultFilter, ...service };

// Easy access to this service from the dev tools console
if (DEV) window.commentService = commentService;


// const { DEV, VITE_LOCAL } = import.meta.env

// import { getRandomIntInclusive, makeId } from '../util.service'

// import { commentService as local } from './comment.service.local'
// import { commentService as remote } from './comment.service.remote'

// function getEmptycomment() {
// 	return {
// 		email: makeId(), 
// 		message: getRandomIntInclusive(80, 240),

// 	}
// }

// function getDefaultFilter() {
//     return {
//         email: '',
//         message: '',
//         sortField: '',
//         sortDir: '',
//     }
// }

// const service = VITE_LOCAL === 'true' ? local : remote
// export const commentService = { getEmptycomment, getDefaultFilter, ...service }

// // Easy access to this service from the dev tools console
// // when using script - dev / dev:local

// if (DEV) window.commentService = commentService  // שונה מ-carService ל-commentService
