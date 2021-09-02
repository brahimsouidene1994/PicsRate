import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.1.15:3000/api/comment/";

const saveNewComment = async (commentData) => {
    let headers = await authHeader();
    try {
        await axios.post(API_URL + `add`, commentData,
            {
                headers: headers
            },
        )
            .then(() => {
                 console.log('comment saved')
            });
    } catch (error) {
        console.warn(error);
    };
}

const getAllCommentOfPicture= async (idPicture) => {
    let headers = await authHeader();
    let commentsOfCurrentPicture;
    try {
        await axios.post(API_URL + "getAllCommentByPicture",
            {
                headers: headers,
                data: { idPicture: idPicture }
            },
        )
            .then(response => {
                if(response.data)
                    commentsOfCurrentPicture = response.data;
                else
                commentsOfCurrentPicture = null;
            });
    } catch (error) {
        console.warn(error);
    };
    return commentsOfCurrentPicture;
}
export default {
    saveNewComment,
    getAllCommentOfPicture
};