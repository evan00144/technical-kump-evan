import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from 'react-router-dom';
import { useSelector, useDispatch, Provider } from 'react-redux';
import ListPosts from './components/ListPosts';
import DetailPosts from './components/DetailPosts';
import UserDetails from './components/UserDetails';
import PhotoDetails from './components/PhotoDetails';
import { getPhotos, getUser } from './redux/action';
import { Store } from './redux/store';

const AppWrapper = () => {

    return (
        <Provider store={Store}> 
            <App />
        </Provider>
    )
}
function App() {
    const [postsRes, setPostsRes] = useState([]);
    const [usersRes, setUsersRes] = useState([]);
    const [commentsRes, setCommentsRes] = useState([]);
    const [albumsRes, setAlbumsRes] = useState([]);
    const [photosRes, setPhotosRes] = useState([]);
    // const { photo } = useSelector(state => state.userReducer);
    // const dispatch = useDispatch();
    // console.log(dispatch(getPhotos()))
    // useEffect(() => {
        // async function apiFetch() {
        //     const [users, posts, comments, albums, photos] = await Promise.all([
        //         fetch('https://jsonplaceholder.typicode.com/users'),
        //         fetch('https://jsonplaceholder.typicode.com/posts'),
        //         fetch('https://jsonplaceholder.typicode.com/comments'),
        //         fetch('https://jsonplaceholder.typicode.com/albums'),
        //         fetch('https://jsonplaceholder.typicode.com/photos'),
        //     ])
        //     const usersRes = await users.json();
        //     setUsersRes(usersRes);
        //     const postsRes = await posts.json();
        //     setPostsRes(postsRes);
        //     const commentsRes = await comments.json();
        //     setCommentsRes(commentsRes);
        //     const albumsRes = await albums.json();
        //     setAlbumsRes(albumsRes);
        //     const photosRes = await photos.json();
        //     setPhotosRes(photosRes);
        //     console.log(postsRes);
        //     console.log(usersRes);
        //     console.log(commentsRes);
        //     console.log(albumsRes)
        //     console.log(photosRes)
        //     window.localStorage.setItem('photo', JSON.stringify(photosRes));
        // }
        // apiFetch();
        // console.log(postsRes)
    // }, [])

    return (
        <Routes>
            <Route path="/" element={<ListPosts usersRes={usersRes} postsRes={postsRes} />} />
            <Route path="/details" element={<DetailPosts usersRes={usersRes} postsRes={postsRes} commentsRes={commentsRes} />} />
            <Route path="/userDetails" element={<UserDetails usersRes={usersRes} albumsRes={albumsRes} photosRes={photosRes} />} />
            <Route path="/photoDetails" element={<PhotoDetails photosRes={photosRes} />} />
        </Routes>
    );
}

export default AppWrapper;

