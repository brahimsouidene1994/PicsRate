import axios from "axios";
import authHeader from "./auth-header";
import {
    API_GET_ALL_PICTURES_CURRENT_USER,
    API_PATCH_PICTURE_STATUS,
    API_SAVE_NEW_PICTURE,
    API_GET_ONE_PICTURE,
    API_DELETE_PICTURE,
    API_GET_RANDOM_PICTURE
}from "@env";

const getPicturesByCurrentUser = async (idUser) => {
    let headers = await authHeader();
    let picturesOfCurrentUser = [];
    try {
        await axios.post(`${API_GET_ALL_PICTURES_CURRENT_USER}`,
            {
                headers: headers,
                data: { idUser: idUser }
            },
        )
            .then(response => {
                if(response.data)
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
        await axios.patch(`${API_PATCH_PICTURE_STATUS}` + `${idPicture}`,
            {
                headers : headers,
                data: { status: status },
            },
        )
            .then(response => {
                // console.log('picture updated')
            });
    } catch (error) {
        console.warn(error);
    };
}

const saveNewPicture = async (pictureData) => {
    let newPicture ;
    let headers = await authHeader("multipart/form-data");
    try {
        await axios.post(API_SAVE_NEW_PICTURE, pictureData,
            {
                headers: headers
            },
        )
            .then(response => {
                newPicture = response.data.object
            });
    } catch (error) {
        console.warn(error);
    };
    return newPicture
}

const getOnePicture = async(id)=>{
    let picture;
    let headers = await authHeader();
    try{
        await axios.get(`${API_GET_ONE_PICTURE}` + `${id}`,
        {
            headers : headers
        },
        )
        .then(response =>{
            picture = response.data
        });
    }catch (error) {
        console.warn(error);
        if (axios.isCancel(err)) {
            return "axios request cancelled";
        }
        return error;
    };
    return picture;
}

const deletePicture = async (id)=>{
    let headers = await authHeader();
    try{
        await axios.delete(`${API_DELETE_PICTURE}` + `${id}`,
        {
            headers : headers
        },
        )
        .then(response=>{
            //console.log(response.data)
        })
    }catch(error){
        console.log(error)
    }
}

const getRandomPictureOfOthers = async (idUser) => {
    let headers = await authHeader();
    let randomPicture;
    try {
        await axios.post(`${API_GET_RANDOM_PICTURE}`,
            {
                headers: headers,
                data: { idUser: idUser }
            },
        )
            .then(response => {
                randomPicture = response.data;
            });
    } catch (error) {
        console.warn(error);
    };
    return randomPicture;
}

export default {
    getPicturesByCurrentUser,
    patchPictureStatus,
    getOnePicture,
    saveNewPicture,
    deletePicture,
    getRandomPictureOfOthers
};
