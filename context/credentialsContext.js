import React from 'react';

import AuthService from "../services/auth.service";
import PictureService from '../services/picture.service';
export const CredentialsContext = React.createContext();

export const CredentialsProvider = (props) =>{
    const [userCredentials, setUserCredentials] = React.useState(null);
    const [authenticated, setAuthenticated] = React.useState(false);
    const [randomPictureToVote, setRandomPictureToVote] = React.useState(null);
    const [pictures, setPictures] = React.useState([]);
    const [comments, setComments] = React.useState([]);

    const [voteOne, setVoteOne] = React.useState(0);
    const [voteTow, setVoteTow] = React.useState(0);
    const [voteThree, setVoteThree] = React.useState(0);
    const [navigationState, setNavigationState] = React.useState(null); 

    React.useEffect(()=>{
        checkUserCredentials();
    },[])

    const checkUserCredentials = async ()=>{
        const user = await AuthService.getCurrentUser();
        if(user){
            setAuthenticated(true);
            setUserCredentials(user);
        }       
    }

    const handleStates = (user, auth) =>{
        setUserCredentials(user);
        setAuthenticated(auth);
    }

    const fillPictures = (pictures) =>{
        setPictures(pictures);
    }

    const clearPictures = () =>{
        setPictures(null)
    }

    const setUpNavigation = (obj) =>{
        setNavigationState(obj)
    }

    const pickOneRandomPicture = (picture) => {
        setRandomPictureToVote(picture)
    }

    const loadCommentsOfPicture = (comments) =>{
        setComments(comments)
    }

    const choseVoteOne = (nbr) =>{
        setVoteOne(nbr)
    }
    const choseVoteTwo = (nbr) =>{
        setVoteTow(nbr)
    }
    const choseVoteThree = (nbr) =>{
        setVoteThree(nbr)
    }
    return (
        <CredentialsContext.Provider value={{
            userCredentials : userCredentials,
            authenticated : authenticated,
            pictures : pictures,
            navigationState : navigationState,
            randomPictureToVote : randomPictureToVote,
            comments : comments,
            voteOne :voteOne,
            voteTow:voteTow,
            voteThree:voteThree,
            handleStates : handleStates,
            fillPictures : fillPictures,
            clearPictures : clearPictures,
            setUpNavigation : setUpNavigation,
            pickOneRandomPicture : pickOneRandomPicture,
            loadCommentsOfPicture : loadCommentsOfPicture,
            choseVoteOne:choseVoteOne,
            choseVoteTwo:choseVoteTwo,
            choseVoteThree:choseVoteThree
        }}>
            {props.children}
        </CredentialsContext.Provider>
    )
}