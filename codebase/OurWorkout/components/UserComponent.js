import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user', jsonValue)
    } catch (e) {
      alert(e)
    }
  }

  export const GetUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')
      // console.log(JSON.parse(jsonValue))
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      alert(e)
    }
  }