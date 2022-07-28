import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from 'react-router-dom';
import ListPosts from './components/ListPosts';
import DetailPosts from './components/DetailPosts';

function App() {
    const [postsRes, setPostsRes] = useState([]);
    const [usersRes, setUsersRes] = useState([]);
    const [commentsRes, setCommentsRes] = useState([]);
    useEffect(() => {
        async function apiFetch() {
            // const [users, posts, comments, albums, photos] = await Promise.all([
            //     fetch('https://jsonplaceholder.typicode.com/users'),
            //     fetch('https://jsonplaceholder.typicode.com/posts'),
            //     fetch('https://jsonplaceholder.typicode.com/comments'),
            //     fetch('https://jsonplaceholder.typicode.com/albums'),
            //     fetch('https://jsonplaceholder.typicode.com/photos'),
            // ])
            // const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
            // let postsRest =await posts.json()
            // setUsersRes(await users.json());
            // setPostsRest(postsRest);
            // const commentsRes = await comments.json();
            // const albumsRes = await albums.json();
            // const photosRes = await photos.json();

            // console.log(postsRes);
            // console.log(commentsRes);
            // console.log(albumsRes);
            // console.log(photosRes);
            const [users, posts, comments, albums, photos] = await Promise.all([
                fetch('https://jsonplaceholder.typicode.com/users'),
                fetch('https://jsonplaceholder.typicode.com/posts'),
                fetch('https://jsonplaceholder.typicode.com/comments'),
                fetch('https://jsonplaceholder.typicode.com/albums'),
                fetch('https://jsonplaceholder.typicode.com/photos'),
            ])
            const usersRes = await users.json();
            setUsersRes(usersRes);
            const postsRes = await posts.json();
            setPostsRes(postsRes);
            const commentsRes = await comments.json();
            setCommentsRes(commentsRes);
            const albumsRes = await albums.json();
            const photosRes = await photos.json();
            console.log(postsRes);
            console.log(usersRes);
            console.log(commentsRes);
        }
        apiFetch();
        console.log(postsRes)
    }, [])

    return (
            <Routes>
                <Route path="/" element={<ListPosts usersRes={usersRes} postsRes={postsRes} />} />
                <Route path="/details" element={<DetailPosts usersRes={usersRes} postsRes={postsRes} commentsRes={commentsRes} />} />
            </Routes>
    );
}

export default App;
