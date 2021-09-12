import {request, check, RESULTS, Rationale, PERMISSIONS} from 'react-native-permissions';

const requestCameraPermission = async () => {
    try {
      const granted = await request(
        PERMISSIONS.ANDROID.CAMERA,
        {
          title: "Camera Permission",
          message:
            "This app needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  const requestGalleryPermission = async () => {
    try {
      const granted = await request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        {
          title: "Gallery Permission",
          message:
            "This app needs access to your gallery " +
            "so you can take pick pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === RESULTS.GRANTED) {
        console.log("You can use the gallery");
      } else {
        console.log("Gallery permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

export default {
    requestCameraPermission,
    requestGalleryPermission,
}