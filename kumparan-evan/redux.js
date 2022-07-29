const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    value: 0
}

async function apiFetch(createStore) {
    const [users, posts, comments, albums, photos] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/comments'),
        fetch('https://jsonplaceholder.typicode.com/albums'),
        fetch('https://jsonplaceholder.typicode.com/photos'),
    ])
    const usersRes = await users.json();
    // setUsersRes(usersRes);
    const postsRes = await posts.json();
    // setPostsRes(postsRes);
    const commentsRes = await comments.json();
    // setCommentsRes(commentsRes);
    const albumsRes = await albums.json();
    // setAlbumsRes(albumsRes);
    const photosRes = await photos.json();
    // setPhotosRes(photosRes);


    //Reducer
    const rootReducer = (state = initialState, action) => {
        state=photosRes;
        return state;
    }

    //Store
    const store = createStore(rootReducer);
    console.log(store.getState());
}
apiFetch(createStore);
