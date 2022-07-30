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
import UserDetails from './components/UserDetails';
import PhotoDetails from './components/PhotoDetails';
import { Store } from './redux/store';

function App() {
    const [postRes, setPostsRes] = useState([]);
    const [userRes, setUsersRes] = useState([]);
    const [commentRes, setCommentsRes] = useState([]);
    const [albumRes, setAlbumsRes] = useState([]);
    const [photoRes, setPhotosRes] = useState([]);

    return (
        <Routes>
            <Route path="/" element={<ListPosts usersRes={userRes} postsRes={postRes} />} />
            <Route path="/details" element={<DetailPosts usersRes={userRes} postsRes={postRes} commentsRes={commentRes} />} />
            <Route path="/userDetails" element={<UserDetails usersRes={userRes} albumsRes={albumRes} photosRes={photoRes} />} />
            <Route path="/photoDetails" element={<PhotoDetails photosRes={photoRes} />} />
        </Routes>
    );
}

export default App;

