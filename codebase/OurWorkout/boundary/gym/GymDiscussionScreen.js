import { StyleSheet, Text, View } from 'react-native'
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


const GymDiscussionScreen = (props) => {
  const {gymInfo, user} = props.route.params;

  const [msg, setMsg] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [allChat, setAllChat] = React.useState([]);

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

  useEffect(() => {
    setAllChat([]);
    startup();
      const onChildAdd = 
          firebase.database().ref('/discussion/' + gymInfo.id)
              .on('child_added', snapshot => {
                  setAllChat((state) => [snapshot.val(), ...state]);
                  console.log(allChat);
              })
      return () => firebase.database().ref('/discussion/' + gymInfo.id).off('child_added', onChildAdd);
      
  }, [gymInfo.id])

  const msgvalid = txt => txt && txt.replace(/\s/g, '').length;

  // const image = () => {
  //   launchImageLibraryAsync('photo', response => {
  //     Imgto
  //   })
  // }

  const sendImg = async() => {
    const pickedImage = await pickImage();
    if (pickedImage != null) {
      // ImgToBase64.getBase64String(pickedImage)
      // .then(base64String => {
      //   let source = 'data:image/jpeg;base64,' + base64String;
      //   sendMsg(source, 'picture');
      // })
      // .catch(err => {alert(err)});
      const base64 = await FileSystem.readAsStringAsync(pickedImage, { encoding: 'base64' });
      // console.log(base64);
      let source = 'data:image/jpeg;base64,' + base64;
      sendMsg(source, 'picture')
    }
    else {
      alert('Did not choose a picture');
      return
    }

    // sendImg(img, 'picture')
    // await pickChatImage.then(res => {
    //   var img = ''
    //   if (res != null) {
    //     img = res;
    //   }
    //   sendMsg(img, 'picture');
    // })
  }

  const sendMsg = (img, type) => {
    console.log(allChat);
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
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon
            name="arrow-back-circle-outline"
            color="#72777A"
            size={30}
          />
        </TouchableOpacity>
        <Text>{gymInfo.name}</Text>
      </View>
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

    </SafeAreaView>
  )
}

export default GymDiscussionScreen

const styles = StyleSheet.create({})