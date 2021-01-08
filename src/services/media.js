//Contains image and video picker services
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const imageOptions = {
  quality: 0.2,
  maxWidth: 500,
  maxHeight: 500,
};

const videoOptions = {
  mediaType: "video",
  videoQuality: "medium",
};

export const pickImage = () => {
  return new Promise((resolve, reject) => {
    launchImageLibrary(imageOptions, (res) => {
      if (res.didCancel) {
        console.log("User cancelled photo picker");
        reject({ error: false, code: "Cancelled" });
      } else if (res.errorCode) {
        console.log("ImagePicker Error: ", res.errorCode);
        reject({ error: true, code: res.errorCode });
      } else {
        console.log("Image Picker res:", res);
        resolve(res);
      }
    });
  });
};

export const pickVideo = () => {
  return new Promise((resolve, reject) => {
    launchImageLibrary(videoOptions, (res) => {
      if (res.didCancel) {
        console.log("User cancelled video picker");
        reject({ error: false, code: "Cancelled" });
      } else if (res.errorCode) {
        console.log("VideoPicker Error: ", res.errorCode, res.errorMessage);
        reject({ error: true, code: res.errorCode });
      } else {
        console.log("Video Picker res:", res);
        resolve(res);
      }
    });
  });
};
