import { useLocation } from "react-router-dom";

const PhotoDetails = (props) => {
    const location = useLocation()
    const { photoId } = location.state
    const photo = props.photosRes.find(photo => photo.id == photoId);
    return (
        <div>
            <div>Photo Title: {photo.title}</div>
            <div><img src={photo.url} alt="image"/></div>
        </div>
    );
}

export default PhotoDetails;