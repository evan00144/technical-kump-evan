import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './DetailPosts.css'


const DetailPosts = (props) => {
    const location = useLocation()
    const { userId, postId } = location.state
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {
        async function apiFetch() {
            const [users, posts, comments] = await Promise.all([
                fetch('https://jsonplaceholder.typicode.com/users'),
                fetch('https://jsonplaceholder.typicode.com/posts'),
                fetch('https://jsonplaceholder.typicode.com/comments'),
            ])
            const usersRes = await users.json();
            setUser(usersRes.find(user => user.id == userId));
            const postsRes = await posts.json();
            setPost(postsRes.find(post => post.id == postId));
            const commentsRes = await comments.json();
            setComment(commentsRes.filter(comment => comment.postId == postId));
        }
        apiFetch();
    }, [])
    console.log(comment)
    return (
        <div className="container ">
            <h1 className="text-center mt-4">Detail Post</h1>
            <div className="card mb-2">
                <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                        <img width={60} className="rounded-circle me-3" src="https://dummyimage.com/100x100/000/a4a5ab" alt="userPhoto" />
                        <div className="user">
                            <h5 className="card-title">
                            <Link to='/userDetails' state={{ userId: user.id }}>{user.name}</Link>
                            </h5>
                        </div>
                    </div>
                    <h6 className="card-text mb-2">{post.title}</h6>
                    <p className="card-text mb-0 pb-2">{post.body}</p>
                </div>
                <div className="card-body comments">
                    <div className="text-center border-bottom border-secondary py-3">{comment.length} comments</div>
                    <div className="d-flex justify-content-center flex-wrap mt-3">
                        {comment.map(comment => (
                            <div className="comment mb-3 col-sm-8 d-flex align-items-center">
                                <img width={60} className="rounded-circle me-3" src="https://dummyimage.com/100x100/000/a4a5ab" alt="userPhoto" />
                                <div className="userComment">
                                    <p className="m-0"><span style={{fontWeight:"bold"}}>{comment.name}</span> {comment.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <Link to='/userDetails' state={{ userId: user.id }}>Username: {user.name}</Link>
            <div>Post Title: {post.title}</div>
            <div>Post Body: {post.body}</div>
            <div>Comment: {comment.map(comment => <div key={comment.id}>{comment.body}</div>)}</div>
            <div>Comment Name: {comment.map(comment => <div key={comment.id}>{comment.name}</div>)}</div> */}
        </div>
    );
}

export default DetailPosts;