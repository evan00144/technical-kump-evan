import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './ListPosts.css';
const ListsPosts = (props) => {
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() => {
        async function apiFetch() {
            const [users, posts] = await Promise.all([
                fetch('https://jsonplaceholder.typicode.com/users'),
                fetch('https://jsonplaceholder.typicode.com/posts'),
            ])
            const usersRes = await users.json();
            setUser(usersRes);
            const postsRes = await posts.json();
            setPost(postsRes);
        }
        apiFetch();
    }, [])
    console.log(user)
    return (
        <div className="container listPost">
            <h1 className="text-center mt-4">List Post</h1>
            {post.map(post => (
                <Link to="/details" state={{ userId: post.userId, postId: post.id }} className="cardLink" key={post.id}>
                    <div className="card mb-2">
                        <div className="card-body">
                            {user.map(user => (post.userId == user.id ? <div key={user.id} className="d-flex align-items-center mb-3"><img width={60} className="rounded-circle me-3" src="https://dummyimage.com/100x100/000/a4a5ab" alt="userPhoto" /><div className="user"><h5 className="card-title">{user.name}</h5><h6 className="card-subtitle mb-2 text-muted">{user.company.name}</h6></div></div> : null))}
                            <h6 className="card-text mb-2">{post.title}</h6>
                            <p className="card-text border-bottom border-dark mb-0 pb-2">{post.body}</p>
                            <p className="pt-2 m-0">View all comments</p>

                        </div>
                    </div>
                </Link>
            ))}
        </div>);
}

export default ListsPosts;