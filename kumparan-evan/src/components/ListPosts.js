import { Link } from "react-router-dom";
import './ListPosts.css';
import { getPost, getUser } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";

const ListsPosts = (props) => {
    const { post, user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPost());
        dispatch(getUser());
    }, [])

    // console.log(post);
    // console.log(user);
    return (

        <div className="container">
            {post.map(post => (
                <Link to="/details" state={{ userId: post.userId, postId: post.id }} className="cardLink" key={post.id}>
                    <div className="card">
                        <div className="card-body">
                            {user.map(user => (post.userId == user.id ? <div key={user.id} className="d-flex align-items-center"><img width={60} className="rounded-circle me-2" src="https://dummyimage.com/100x100/000/a4a5ab" alt="userPhoto" /><div className="user"><h5 className="card-title">{user.name}</h5><h6 className="card-subtitle mb-2 text-muted">{user.company.name}</h6></div></div> : null))}

                            <p className="card-text">{post.body}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>);
}

export default ListsPosts;