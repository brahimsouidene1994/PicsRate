import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL_SIGNUP, API_URL_SIGNIN} from "@env";

const register = (email, password, sexe) => {
  return axios.post(`${API_URL_SIGNUP}`, {
    email,
    password,
    sexe
  })
  .then((response) => {
    if (response.data.accessToken) {
      AsyncStorage.setItem("userLoggedIn", JSON.stringify(response.data))
      .then(()=>{    
          console.log('user logged in')
      })
      .catch(error=>{
          console.log(error)
      })
      return response.data;
    }
    else{
      console.log('user existed already')
    }
  })
};

const login = (email, password) => {
  return axios
    .post(`${API_URL_SIGNIN}`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        AsyncStorage.setItem("userLoggedIn", JSON.stringify(response.data))
        .then(()=>{    
            // console.log('user logged in')
        })
        .catch(error=>{
            console.log(error)
        })
      }
      return response.data;
    });
    
};

const logout = () => {
   AsyncStorage.removeItem('userLoggedIn')
    .then(()=>{
        // console.log('user logged out')
    })
    .catch(error=>console.log(error))
};

const getCurrentUser = async () => {
    let user ;
    await AsyncStorage.getItem('userLoggedIn')
        .then((result)=>{
            if(result) {
              user = JSON.parse(result); 
                //  console.log('there is data stored', user);
            }     
        })
        .catch((error)=>{
            console.log('there is no data stored', error);
        });
        return user;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};