import { useLocation } from "react-router-dom";

const DetailPosts = (props) => {
    const location = useLocation()
    const { userId, postId } = location.state
    const user = props.usersRes.find(user => user.id == userId)
    const post = props.postsRes.find(post => post.id == postId)
    const comments = props.commentsRes.filter(comment => comment.postId == postId)
    console.log(user, post, comments)
    return (
        <div className="container">
            <div>Username: {user.name}</div>
            <div>Post Title: {post.title}</div>
            <div>Post Body: {post.body}</div>
            <div>Comment: {comments.map(comment => <div key={comment.id}>{comment.body}</div>)}</div>
            <div>Comment Name: {comments.map(comment => <div key={comment.id}>{comment.name}</div>)}</div>
        </div>
    );
}

export default DetailPosts;