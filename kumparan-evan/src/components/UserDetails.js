import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getAlbum, getPost, getUser } from "../redux/action";
import './UserDetails.css'

const UserDetails = (props) => {
    const location = useLocation()
    const { userId } = location.state;
    const { photos, user, album } = useSelector(state => state.userReducer);
    const [albumRes, setAlbumRes] = useState([]);
    const [userRes, setUserRes] = useState([]);
    const [photoRes, setPhotoRes] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem("photos") === null) {
            dispatch(getPost());
            localStorage.setItem("photos", JSON.stringify(photos));
        }

        if (localStorage.getItem("user") === null) {
            dispatch(getUser());
            localStorage.setItem("user", JSON.stringify(user));
        }
        if (localStorage.getItem("album") === null) {
            dispatch(getAlbum());
            localStorage.setItem("album", JSON.stringify(album));
        }
        // dispatch(getAlbum());
        // localStorage.setItem("album", JSON.stringify(album));
        // dispatch(getPhotos());
        // localStorage.setItem("photo", JSON.stringify(photos));
        filterData();
    }, [photos])
    //getComment()

    const filterData = () => {
        let albums = JSON.parse(localStorage.getItem('album'));
        let users = JSON.parse(localStorage.getItem('user'));
        let photos = JSON.parse(localStorage.getItem('photos'));
        console.log(users)

        setAlbumRes(albums.find(album => album.userId == userId));
        setUserRes(users.find(users => users.id == userId));
        setPhotoRes(album.map(album => photos.filter(photo => photo.albumId == album.id)));
        console.log(photoRes)
    }


    return (
        <div className="container">
            <div>Username: {userRes.name}</div>
            <div>Email: {userRes.email}</div>
            {/* <div>Address: {(userRes.address).city}</div> */}
            {/* <div>Company: {(userRes.company).name}</div> */}
            <div>Albums:
                {albumRes.map(album => (<div key={album.id}>
                    - {album.title}
                    <div className="d-flex flex-wrap">
                        {photoRes.map(photo => photo.map(photo => <div className="photo" key={photo.id}><Link to="/photoDetails" state={{photoId: photo.id}}><img src={photo.thumbnailUrl} alt="image" /></Link></div>))}
                    </div>
                </div>))}
            </div>

        </div>
    );
}

export default UserDetails;