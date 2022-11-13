import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebase } from '../../config'
import uuid from 'react-native-uuid';
import moment from 'moment';
import GymDiscussionMsgComponent from './GymDiscussionMsgComponent';
import { launchImageLibraryAsync } from 'expo-image-picker';
import pickImage from '../../controller/ImagePicker'
import ImgToBase64 from 'react-native-image-base64';
import * as FileSystem from 'expo-file-system';

/**
 * @typedef { Object } GymInfo The non-array data corresponding to a Gym.
 * @property { string } name The name of the Gym
 * @property { string } desc The description of the Gym
 */

/**
 * Displays the Gym discussion page and all messages contained within it.
 * 
 * Assumption: The user viewing this UI component has been logged in.
 * @param { Object } props - The navigation route parameters.
 * @param { Object } props.route
 * @param { Object } props.route.params
 * @param { GymInfo } props.route.params.gymInfo - Some data regarding the Gym.
 * @param { Object } props.route.params.user - Some data regarding the user viewing the GymDiscussionScreen.
 * @param { string } props.route.params.user.firstName - The first name of the corresponding User.
 * @param { string } props.route.params.user.lastName - The last name of the corresponding User.
 * @param { string } props.route.params.user.photoURL - The URL of the profile image of the corresponding User.
 * @returns { SafeAreaView } The UI displayed by React for this GymScreen.
 */

const GymDiscussionScreen = (props) => {
  const {gymInfo, user} = props.route.params;

  const [msg, setMsg] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [allChat, setAllChat] = React.useState([]);

  /**
   * runs as the first function
   */
  const startup = () => {
    firebase.database().ref('/discussion/' + gymInfo.id)
    .once('value')
    .then(snapshot => {
      // console.log('user data: ', snapshot.val());

      if (snapshot.val() == null) {
        firebase.database().ref('/messages/' + gymInfo.id).push();
      }
    })
  }

  /**
   * Runs when the component is loaded
   */
  useEffect(() => {
    setAllChat([]);
    startup();
      const onChildAdd = 
          firebase.database().ref('/discussion/' + gymInfo.id)
              .on('child_added', snapshot => {
                  setAllChat((state) => [snapshot.val(), ...state]);
                  // console.log(allChat);
              })
      return () => firebase.database().ref('/discussion/' + gymInfo.id).off('child_added', onChildAdd);
      
  }, [gymInfo.id])

  const msgvalid = txt => txt && txt.replace(/\s/g, '').length;

  /**
   * calls the image picker function and encode it to base64
   * @returns selected image
   */
  const sendImg = async() => {
    const pickedImage = await pickImage();
    if (pickedImage != null) {
      const base64 = await FileSystem.readAsStringAsync(pickedImage, { encoding: 'base64' });
      let source = 'data:image/jpeg;base64,' + base64;
      sendMsg(source, 'picture')
    }
    else {
      alert('Did not choose a picture');
      return
    }
  }

  /**
   * 
   * @param {*} img - image that will be sent
   * @param {*} type - type of the message(image or text)
   * @returns 
   */
  const sendMsg = (img, type) => {
    // console.log(allChat);
    if ((msg == '' || msgvalid(msg) == 0) && (type == 'text')) {
        alert('Enter something');
        return false
    }
    setDisabled(true);
    let msgData = {
        user: user,
        message: msg,
        sendTime: moment().format(''),
        from: user.uid,
        img: img,
        msgType: type
    };

    const newReference = firebase.database().ref('/discussion/' + gymInfo.id).push();
    msgData.id = newReference.key;
    newReference.set(msgData).then(() => {
        setMsg('');
        setDisabled(false);
    })
  }

  const renderItem = ({item}) => (
    <GymDiscussionMsgComponent
      sender={item.from == firebase.auth().currentUser.uid}
      item={item}
    />
  )
  
  return (
    <SafeAreaView style={{backgroundColor: '#fff', padding: 10, paddingBottom: 0}}>
      <View style={{display: 'flex',flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10, justifyContent: 'center', height: 50}}>
          <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}} onPress={() => props.navigation.goBack()}>
              <Icon
                  name="arrow-back-circle-outline"
                  color="#72777A"
                  size={40}
              />
          </TouchableOpacity>
          <View style={{flex: 2,flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 20, paddingLeft: 10, marginRight: '17%'}}>{gymInfo.name}</Text>
          </View>
      </View>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? -200 : -240} >
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        data={allChat}
        renderItem={renderItem}
        inverted
        style={{height: '90%'}}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
        <TextInput
          style={{
            backgroundColor: '#F2F4F5',
            width: '80%',
            minHeight: 30,
            maxHeight: 60,
            borderRadius: 25,
            borderWidth: 0.5,
            borderColor: '#fff',
            paddingHorizontal: 15,
            color: '#000',
          }}
          placeholder="Type a message"
          placeholderTextColor='#000'
          multiline={true}
          value={msg}
          onChangeText={val => setMsg(val)}
        />
        <TouchableOpacity disabled={disabled} onPress={() => {sendImg();}}>
          <Icon
            name='ios-camera'
            color="#72777A"
            size={20}
          />
        </TouchableOpacity>

        <TouchableOpacity disabled={disabled} onPress={() => {sendMsg('','text');}}>
          <Icon
            name='paper-plane-sharp'
            color="#72777A"
            size={20}
          />
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default GymDiscussionScreen

const styles = StyleSheet.create({})