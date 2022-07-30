import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useLocation } from "react-router-dom";
import './UserDetails.css'
import $ from 'jquery';
import arrowUp from '../icon/arrowUp.svg'
import PhotoDetails from "./PhotoDetails";

const UserDetails = (props) => {
    const location = useLocation()
    const { userId } = location.state;
    const [album, setAlbum] = useState([]);
    const [user, setUser] = useState([]);
    const [photo, setPhoto] = useState([]);

    const [photoId, setPhotoId] = useState(1);


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
    $('.viewMore').on('click', function () {
        $(this).parent().addClass('click');
    })
    $('.closeView').on('click', function () {
        $(this).parent().parent().parent().removeClass('click');
    })
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
                        <p className="me-5"><i className="fa-solid fa-envelope me-2"></i>{user.email}</p>
                        <p className="me-5"><i className="fa-solid fa-location-dot me-2"></i>{user ? user.address && user.address.city : "Loading"}</p>
                        <p className="me-5"><i className="fa-solid fa-briefcase me-2"></i>{user ? user.company && user.company.name : "Loading"}</p>
                    </div>
                    <h5>Albums</h5>
                    {album.length == 0 ? <div className="d-flex"><div class="loader"></div></div> : album.map(album => (
                        <div key={album.id} className="album mb-3 card position-relative overflow-hidden">
                            <div className="albumList">
                                <div className="albumTitle mb-3 row mx-0 justify-content-between align-items-center">
                                    <div className="col-8">
                                        <h6 className="m-0">{album.title}</h6>
                                        <p className="m-0">Photos</p>
                                    </div>
                                    <img className="closeView col-1" src={arrowUp} alt="icon" />
                                </div>
                                <div className="albumImage row mx-0 flex-wrap">
                                    {photo.length == 0 ? <div className="d-flex justify-content-center"><div class="loader"></div></div>: photo.map(photo => photo.map(photo =>
                                        <div className="photo col-sm-2" key={photo.id}>
                                            {/* <Link to="/photoDetails" state={{ photoId: photo.id }}> */}
                                            {/* <button type="button" className="btn btn-primary" > */}
                                            <img onClick={() => setPhotoId(photo.id)} data-bs-toggle="modal" data-bs-target="#exampleModal" src={photo.thumbnailUrl} alt="image" />
                                            {/* </button> */}
                                            {/* </Link> */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="viewMore py-3 position-absolute bottom-0 w-100 text-center">
                                View More
                            </div>
                        </div>))}
                </div>

            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <PhotoDetails photoId={photoId} />
            </div>
        </div>
    );
}

export default UserDetails;