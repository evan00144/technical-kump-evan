import { Link } from "react-router-dom";

const ListsPosts = (props) => {
    return (
        <div className="test">
            {props.postsRes.map(post => (
                <Link to="/details" state={{ userId:post.userId, postId:post.id }} className="card" key={post.id}>
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.body}</p>
                        {props.usersRes.map(user => (post.userId == user.id ? <p key={user.id} style={{ fontWeight: "bold" }}>{user.name} - {user.company.name}</p> : null))}
                    </div>
                </Link>
            ))}
        </div>);
}

export default ListsPosts;