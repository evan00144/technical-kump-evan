// const [users, posts, comments, albums, photos] = await Promise.all([
//     fetch('https://jsonplaceholder.typicode.com/users'),
//     fetch('https://jsonplaceholder.typicode.com/posts'),
//     fetch('https://jsonplaceholder.typicode.com/comments'),
//     fetch('https://jsonplaceholder.typicode.com/albums'),
//     fetch('https://jsonplaceholder.typicode.com/photos'),
// ])

export const GET_USER = 'GET_USER';
export const GET_POST = 'GET_POST';
export const GET_COMMENT = 'GET_COMMENT';
export const GET_ALBUM = 'GET_ALBUM';
export const GET_PHOTOS = 'GET_PHOTOS';



export const getUser = () => {
    try{
        return async dispatch =>{
            const result = await fetch('https://jsonplaceholder.typicode.com/users',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await result.json();

            if(json){
                dispatch({
                    type: GET_USER,
                    payload: json
                })
            }else{
                console.log('error');
            }
        }
    }catch(error){
        console.log(error);
    }
}

export const getPost = () => {
    try{
        return async dispatch =>{
            const result = await fetch('https://jsonplaceholder.typicode.com/posts',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await result.json();

            if(json){
                dispatch({
                    type: GET_POST,
                    payload: json
                })
            }else{
                console.log('error');
            }
        }
    }catch(error){
        console.log(error);
    }
}

export const getComment = () => {
    try{
        return async dispatch =>{
            const result = await fetch('https://jsonplaceholder.typicode.com/comments',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await result.json();
            console.log("comment");
            console.log(json);
            if(json){
                dispatch({
                    type: GET_COMMENT,
                    payload: json.slice(0,10)
                })
            }else{
                console.log('error');
            }
        }
    }catch(error){
        console.log(error);
    }
}

export const getAlbum = () => {
    try{
        return async dispatch =>{
            const result = await fetch('https://jsonplaceholder.typicode.com/albums',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await result.json();
            console.log(json);
            if(json){
                dispatch({
                    type: GET_ALBUM,
                    payload: json
                })
            }else{
                console.log('error');
            }
        }
    }catch(error){
        console.log(error);
    }
}



export const getPhotos = () => {
    try{
        return async dispatch =>{
            const result = await fetch('https://jsonplaceholder.typicode.com/photos',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await result.json();
            console.log(json.slice(0,10));
            if(json){
                dispatch({
                    type: GET_PHOTOS,
                    payload: json
                })
            }else{
                console.log('error');
            }
        }
    }catch(error){
        console.log(error);
    }
}