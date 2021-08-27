import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.1.15:3000/api/picture/";

const getPicturesByCurrentUser = async (idUser) => {
    let headers = await authHeader();
    let picturesOfCurrentUser;
    try {
        await axios.post(API_URL + "getAllByUser",
            {
                headers: headers,
                data: { idUser: idUser },
            },
        )
            .then(response => {
                picturesOfCurrentUser = response.data;
            });
    } catch (error) {
        console.warn(error);
    };
    return picturesOfCurrentUser;
}
const patchPictureStatus = async (idPicture, status) => {
    let headers = await authHeader();
    try {
        await axios.patch(API_URL + `updatestatus/${idPicture}`,
            {
                headers : headers,
                data: { status: status },
            },
        )
            .then(response => {
                console.log('picture updated')
            });
    } catch (error) {
        console.warn(error);
    };
}

const getOnePicture = async(id)=>{
    let picture;
    let headers = await authHeader();
    try{
        await axios.get(API_URL + `getOnePicture/${id}`,
        {
            headers : headers
        },
        )
        .then(response =>{
            picture = response.data
        });
    }catch (error) {
        console.warn(error);
    };
    return picture;
}
export default {
    getPicturesByCurrentUser,
    patchPictureStatus,
    getOnePicture
};
