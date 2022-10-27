import * as ImagePicker from 'expo-image-picker';
import ImgToBase64 from 'react-native-image-base64';

export default pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.0001,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        return result.uri
      }
      else {
        return null
      }
}

const pickChatImage = async () => {
  await ImagePicker.launchImageLibraryAsync('photo', response => {
    ImgToBase64.getBase64String(response.uri).then((base64string) => {
      let source = 'data:image/jpeg;base64,' + base64string;
      return source;
    }).catch((err) => {return null})

    if (response.cancelled) return null;
  })
}

export {pickChatImage};