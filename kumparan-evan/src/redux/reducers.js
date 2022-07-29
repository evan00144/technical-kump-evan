import { GET_ALBUM, GET_COMMENT, GET_PHOTOS, GET_POST, GET_USER } from './action';

const initialState = {
    photos: [],
    post: [],
    user: [],
    comment: [],
    album: []
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PHOTOS:
            return {
                ...state,
                photos: action.payload
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload
            };
        case GET_ALBUM:
            return {
                ...state,
                album: action.payload
            };
        case GET_COMMENT:
            return {
                ...state,
                comment: action.payload
            };
        default:
            return state;
    }
}

export default userReducer;