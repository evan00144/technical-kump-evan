import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useLocation } from "react-router-dom";
import './UserDetails.css'

const UserDetails = (props) => {
    const location = useLocation()
    const { userId } = location.state;
    const [album, setAlbum] = useState([]);
    const [user, setUser] = useState([]);
    const [photo, setPhoto] = useState([]);

    const [page, setPage] = useState(1);


    useEffect(() => {
        async function apiFetch() {
            const [users, albums, photos] = await Promise.all([
                fetch('https://jsonplaceholder.typicode.com/users'),
                fetch('https://jsonplaceholder.typicode.com/albums'),
                fetch('https://jsonplaceholder.typicode.com/photos'),
            ])
            const usersRes = await users.json();
            setUser(usersRes.find(user => user.id == userId));
            const albumsRes = await albums.json();
            setAlbum(albumsRes.filter(album => album.userId == userId));
            const photoRes = await photos.json();
            setPhoto(albumsRes.filter(album => album.userId == userId).map(album => photoRes.filter(photo => photo.albumId == album.id)));
        }
        if (photo.length == 0 || user.length == 0 || album.length == 0) {
            apiFetch();
        }

    }, [])

    return (
        <div className="container userDetails">
            <h1 className="text-center mt-4">User Details</h1>
            <div className="userProfile card position-relative overflow-hidden">
                <div className="upper position-relative">
                    <div className="userImage position-absolute bottom-0">
                        <img width={120} className="rounded-circle me-3" src="https://dummyimage.com/100x100/000/a4a5ab" alt="userPhoto" />
                    </div>
                </div>
                <div className="pt-5 mt-4 px-5 mx-5">
                    <div className="userName">
                        <h4>{user.name}</h4>
                    </div>
                    <div className="userInformation d-flex">
                        <p className="me-5">{user.email}</p>
                        <p className="me-5">{user ? user.address && user.address.city : "Loading"}</p>
                        <p className="me-5">{user ? user.company && user.company.name : "Loading"}</p>
                    </div>
                    <h5>Albums</h5>
                    {album.map(album => (<div key={album.id} className="album">
                        <div className="albumList card">
                            <h6>{album.title}</h6>
                            <p>Photos</p>
                            <div className="albumImage d-flex flex-wrap">
                                {photo.length == 0 ? <div>Loading Photo</div> : photo.map(photo => photo.map(photo => <div className="photo" key={photo.id}><Link to="/photoDetails" state={{ photoId: photo.id }}><img src={photo.thumbnailUrl} alt="image" /></Link></div>))}
                            </div>
                        </div>
                    </div>))}
                </div>

            </div>
            <div>Username: {user.name}</div>
            <div>Email: {user.email}</div>
            <div>Address: {user ? user.address && user.address.city : "Loading"}</div>
            <div>Company: {user ? user.company && user.company.name : "Loading"}</div>
            <div>Albums:
                -
                <div className="d-flex flex-wrap">
                </div>

            </div>
        </div>
    );
}

export default UserDetails;