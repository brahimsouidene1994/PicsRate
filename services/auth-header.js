import AsyncStorage from "@react-native-async-storage/async-storage";
export default async  function authHeader(content_type) {
    let user ; 
    await AsyncStorage.getItem('userLoggedIn')
    .then((value) => {
       user = JSON.parse(value); 
    });;
    if (user && user.accessToken) {
      return { 
        "Content-type":  content_type === undefined?"application/json" : content_type,
        'x-access-token': user.accessToken  
      };
      // console.log('test access token', user.accessToken);
      // return user.accessToken

    } else {
      return {};
    }
  }