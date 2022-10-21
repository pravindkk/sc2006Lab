import { StyleSheet, Text, View, TextInput } from 'react-native'
import { React, useEffect, useState } from 'react'
import { searchUsers } from '../../controller/Search';

const SearchUsersScreen = () => {
  const [nameFrag, setNameFrag] = useState("");
  const [emailFrag, setEmailFrag] = useState("");
  const [searchData, setSearchData] = useState(undefined);

  const changeHandler = _1 => {
    return _2 => {
      //alert(_2);
      _1(_2);
    };
  };

  useEffect(() => {
    searchUsers({ nameStart: nameFrag, emailStart: emailFrag })
      .then(_ => {
        //alert(JSON.stringify(_));
        setSearchData(_);
       })
      .catch(_ => alert(_));
  }, [nameFrag, emailFrag]);

  return (
    <View>
      <Text>SearchUsersScreen</Text>
      <TextInput name="nameFrag" placeholder="Name" value={nameFrag}
        onChangeText={changeHandler(setNameFrag)} />
      <TextInput name="emailFrag" placeholder="email" value={emailFrag}
        onChangeText={changeHandler(setEmailFrag)} />
      <Text>{JSON.stringify(searchData)}</Text>
    </View>
  )
}

export default SearchUsersScreen;

const styles = StyleSheet.create({})