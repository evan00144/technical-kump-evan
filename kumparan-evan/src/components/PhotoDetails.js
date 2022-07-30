import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PhotoDetails = (props) => {
    const [photo, setPhoto] = useState([]);

    useEffect(() => {
        async function apiFetch() {
            const photos = await fetch('https://jsonplaceholder.typicode.com/photos')
            const photoRes = await photos.json();
            console.log(photoRes)
            setPhoto(photoRes.find(photo => photo.id == props.photoId));
        }
        apiFetch();
    }, [props.photoId])
    console.log(photo)
    console.log(props.photoId)
    return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{photo.length == 0 ? <div></div> : photo.title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <img className="img-fluid" src={photo.length == 0 ? '' : photo.url} alt="image" />
                </div>
            </div>
        </div>
    );
}

export default PhotoDetails;