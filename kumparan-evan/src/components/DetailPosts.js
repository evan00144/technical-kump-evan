import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getAlbum, getComment, getPhotos, getPost, getUser } from "../redux/action";

const DetailPosts = () => {
    const location = useLocation()
    const { userId, postId } = location.state;
    const { post, user, comment } = useSelector(state => state.userReducer);
    const [postRes, setPostRes] = useState([]);
    const [userRes, setUserRes] = useState([]);
    const [commentRes, setCommentRes] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem("post") === null) {
            dispatch(getPost());
            localStorage.setItem("post", JSON.stringify(post));
        }
        if (localStorage.getItem("comment") === null ||localStorage.getItem("comment") == []) {
            dispatch(getComment());
            localStorage.setItem("comment", JSON.stringify(comment));
        }
        if (localStorage.getItem("user") === null) {
            dispatch(getUser());
            localStorage.setItem("user", JSON.stringify(user));
        }

        // dispatch(getAlbum());
        // localStorage.setItem("album", JSON.stringify(album));
        // dispatch(getPhotos());
        // localStorage.setItem("photo", JSON.stringify(photos));
        console.log(comment)
        console.log(localStorage.getItem("comment"))

        filterData();
    }, [])
    //getComment()

    const filterData = () => {
        let posts = JSON.parse(localStorage.getItem('post'));
        let users = JSON.parse(localStorage.getItem('user'));
        let comments = JSON.parse(localStorage.getItem('comment'));

        setPostRes(posts.find(posts => posts.id == postId));
        setUserRes(users.find(users => users.id == userId));
        setCommentRes(comments.filter(comments => comments.postId == postId))
    }

    //comment post id



    return (
        <div className="container">
            <Link to='/userDetails' state={{ userId: userRes.id }}>Username: {userRes.name}</Link>
            <div>Post Title: {postRes.title}</div>
            <div>Post Body: {postRes.body}</div>
            <div>Comment: {commentRes.map(comment => <div key={comment.id}>{comment.body}</div>)}</div>
            <div>Comment Name: {commentRes.map(comment => <div key={comment.id}>{comment.name}</div>)}</div>
        </div>
    );
}

export default DetailPosts;