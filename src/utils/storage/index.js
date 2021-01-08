import { Alert, PermissionsAndroid } from "react-native";

import RNFetchBlob from "rn-fetch-blob";

export async function requestImageStoragePermission(showImage) {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "ReactNativeCode Storage Permission",
        message:
          "ReactNativeCode App needs access to your storage to download Photos.",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let PICTURE_DIR = RNFetchBlob.fs.dirs.DCIMDir;

      RNFetchBlob.config({
        path: `${PICTURE_DIR}/Graminno/Images/${Date.now()}.jpg`,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mime: "image/jpeg",
          description: "Image Downloaded",
        },
      })
        .fetch("GET", showImage, {
          //some headers ...
        })
        .then((res) => {
          let status = res.info().status;
          if (status == 200) {
            Alert.alert("Image Downloaded Successfully.", res.path());
          }
        })
        .catch((err) => {});
    } else {
      Alert.alert("Storage Permission Not Granted");
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function requestVideoStoragePermission(showImage) {
  try {
    const storagePermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "ReactNativeCode Storage Permission",
        message: "Graminno needs access to your storage to download photos.",
      }
    );

    const cameraPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "ReactNativeCode Camera Permission",
        message: "Graminno needs access to your camera to capture video.",
      }
    );

    console.log("Cam Permission::", cameraPermission);
    if (
      storagePermission === PermissionsAndroid.RESULTS.GRANTED &&
      cameraPermission === PermissionsAndroid.RESULTS.GRANTED
    ) {
      let PICTURE_DIR = RNFetchBlob.fs.dirs.DCIMDir;

      RNFetchBlob.config({
        path: `${PICTURE_DIR}/Graminno/Images/${Date.now()}.mp4`,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mime: "video/mp4",
          description: "Video Downloaded",
        },
      })
        .fetch("GET", showImage, {
          //some headers ..
        })
        .then((res) => {
          Alert.alert("Video Downloaded Successfully.");
        });
    } else {
      if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED)
        Alert.alert("Camera Permission Not Granted");
      if (storagePermission !== PermissionsAndroid.RESULTS.GRANTED)
        Alert.alert("Storage Permission Not Granted");
    }
  } catch (err) {
    console.warn(err);
  }
}
