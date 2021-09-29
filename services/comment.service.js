import axios from "axios";
import authHeader from "./auth-header";
import {API_SAVE_COMMENT, API_GET_ALL_COMMENT} from "@env";

const saveNewComment = async (commentData) => {
    let headers = await authHeader();
    try {
        await axios.post(`${API_SAVE_COMMENT}`, commentData,
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
    let commentsOfCurrentPicture= [];
    try {
        await axios.post(`${API_GET_ALL_COMMENT}`,
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