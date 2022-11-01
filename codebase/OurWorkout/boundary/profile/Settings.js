import { StyleSheet, Text, View, Switch } from 'react-native'
import { useState, useEffect, React } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getSettingsForUser, setSettingsForUser } from '../../controller/UserComponent'
import { Button } from 'react-native-elements'

const Settings = ({ user }) => {
    alert(JSON.stringify(user));

    const [allowNotifications, setAllowNotifications] =
        useState(getSettingsForUser(user).allowNotifications);
    
    const toggleNotifsSwitch = () =>{
        setAllowNotifications(!allowNotifications);
    }

    useEffect(() => {
        const settings = getSettingsForUser(user);
        settings.allowNotifications = !settings.allowNotifications;
        setSettingsForUser(user.uid, settings).catch(e => alert(e));
    }, [allowNotifications]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Send Notifications</Text>
                <Switch
                    onValueChange={toggleNotifsSwitch}
                    value={allowNotifications}>
                </Switch>
            </View>

            <View style={styles.inputContainer}>
                <Button>Change Password</Button>
            </View>

        </SafeAreaView>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        
        // alignItems: 'center',
        
    },

    inputContainer: {
        alignSelf:'center',
        width: '90%',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#CFD3D4"
    },
    inputTitle: {
        color: "#5E6366",
        marginBottom: 5
    },

    name: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: 'bold'
    },
})