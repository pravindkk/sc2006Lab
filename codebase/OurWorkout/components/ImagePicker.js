import * as ImagePicker from 'expo-image-picker';

export default pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.005,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        return result.uri
      }
      else {
        return null
      }
}