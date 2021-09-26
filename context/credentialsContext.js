import React from 'react';
import AuthService from "../services/auth.service";

export const CredentialsContext = React.createContext();
export const PicturesContext = React.createContext();
export const VoteContext = React.createContext();

//custom use Context
export const useCredentials =()=>{
    return React.useContext(CredentialsContext);
}
export const usePictures =()=>{
    return React.useContext(PicturesContext);
}
export const useVotes =()=>{
    return React.useContext(VoteContext);
}

export const CredentialsProvider = ({children}) =>{
    //splashScreen
    const [splashScreenLoader, setSplashScreenLoader] = React.useState(true);

    //handle account
    const [userCredentials, setUserCredentials] = React.useState(null);
    const [authenticated, setAuthenticated] = React.useState(null);

    //handle pictures
    const [randomPictureToVote, setRandomPictureToVote] = React.useState(null);
    const [pictures, setPictures] = React.useState([]);
    const [comments, setComments] = React.useState([]);

    //handle votes
    const [voteOne, setVoteOne] = React.useState(0);
    const [voteTow, setVoteTow] = React.useState(0);
    const [voteThree, setVoteThree] = React.useState(0);

    //navigation state
    const [navigationState, setNavigationState] = React.useState(null); 

    React.useEffect(()=>{
        checkUserCredentials();
    },[authenticated])
    const checkUserCredentials = async ()=>{
        const user = await AuthService.getCurrentUser();
        if(user){
            setAuthenticated(true);
            setUserCredentials(user);
        }else{
            setAuthenticated(false)
        }       
    }
    const handleStateSplashScreen = () =>{
        setSplashScreenLoader(false);
    }
    const handleStates = (user, auth) =>{
        setUserCredentials(user);
        setAuthenticated(auth);
    }
    const fillPictures = (pictures) =>{
        setPictures(pictures);
    }
    const clearPictures = () =>{
        setPictures([])
    }
    const setUpNavigation = (obj) =>{
        setNavigationState(obj)
    }
    const pickOneRandomPicture = (picture) => {
        setRandomPictureToVote(picture)
    }
    const loadCommentsOfPicture = (comments) =>{
        if(!comments)return;
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
            navigationState : navigationState,
            splashScreenLoader : splashScreenLoader,
            handleStates : handleStates,
            handleStateSplashScreen:handleStateSplashScreen,
            setUpNavigation : setUpNavigation,
        }}>
            <PicturesContext.Provider value={{
                pictures : pictures,
                randomPictureToVote : randomPictureToVote,
                comments : comments,
                fillPictures : fillPictures,
                clearPictures : clearPictures,
                loadCommentsOfPicture : loadCommentsOfPicture,
                pickOneRandomPicture : pickOneRandomPicture,
            }}>
                <VoteContext.Provider value={{
                    voteOne :voteOne,
                    voteTow:voteTow,
                    voteThree:voteThree,
                    choseVoteOne:choseVoteOne,
                    choseVoteTwo:choseVoteTwo,
                    choseVoteThree:choseVoteThree,
                }}>
                    {children}
                </VoteContext.Provider>
            </PicturesContext.Provider>
        </CredentialsContext.Provider>
    )
}