import { TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Appbar } from 'react-native-paper';

//Firebase
import auth from '@react-native-firebase/auth';

//toast
import Toast from 'react-native-toast-message'

function Changepassword({ navigation }) {

    const [email, setEmail] = useState(auth()._user.email);

    const Changepasswordfun = (val) => {
        auth().sendPasswordResetEmail(val)
            .then((user) => {
                console.log("success");
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Please check your email '
                });
            }).catch(error => {
                if (error.code === 'auth/user-not-found') {
                    console.log('No user Found');
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'No user Found'
                    });
                } else {
                    console.log(error, "Error has occured");
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Error has occured'
                    });
                }
                console.error(error);
            })
    }

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header mode="small" elevated="false" style={[
                {
                    backgroundColor: "#1C1C1C"
                },
            ]}>
                <Appbar.BackAction color="white" onPress={() => { navigation.goBack() }} />
            </Appbar.Header>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <Toast />
                <View style={styles.container}>
                    <Text style={styles.headingtext}>Change Your Password</Text>
                    <Text style={styles.subtext}>We'll send you a link to Change your password to your email id</Text>
                    <View>
                        <View>
                            <Text style={styles.labletext}>Email</Text>
                            <TextInput
                                defaultValue={email}
                                style={styles.input}
                                editable={false}
                                placeholder="you@example.com"
                                placeholderTextColor="#707070" />
                        </View>
                        <View style={{ paddingTop: 30 }}>
                            <TouchableOpacity style={styles.button} onPress={() => { Changepasswordfun(email) }}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>Send Reset Email</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        height: 40,
        backgroundColor: "#FFFFFF07",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: "#707070",
        color: "#EDEDED",
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 16,
    },
    button: {
        borderRadius: 10,
        width: 300,
        height: 40,
        backgroundColor: "#34B27B",
        alignItems: "center",
        justifyContent: "center"
    },
    headingtext: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    },
    subtext: {
        color: "#BBBBBB",
        fontSize: 15,
        paddingTop: 3,
        width: "85%"
    },
    labletext: {
        color: "#BBBBBB",
        fontSize: 15,
        paddingTop: 25,
        paddingBottom: 5
    },
    container: {
        paddingLeft: "12%",
        top: "25%"
    }
});

export default Changepassword;