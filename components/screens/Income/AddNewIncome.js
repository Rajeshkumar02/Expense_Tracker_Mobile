import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View, Text } from "react-native";
import IdientifyIcon from '../../otherComponents/Icon';
import { Button, Appbar } from 'react-native-paper';

//toast
import Toast from 'react-native-toast-message'

//Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function AddNewIncome({ navigation, route }) {

    const [amount, setamount] = useState("");
    const [note, setnote] = useState("");

    const sendData = () => {
        if (amount !== "") {
            if (note !== "") {
                var date = new Date().getDate();
                var month = new Date().getMonth() + 1;
                var year = new Date().getFullYear();
                let res = year + '-' + month + '-' + date;

                var hours = new Date().getHours();
                var min = new Date().getMinutes();
                var sec = new Date().getSeconds();
                let time = hours + ":" + min + ":" + sec;
                let resvalues = { "Note": note, "Date": res, "Amount": amount, "Time": time }
                let dictkey = date + '-' + month + '-' + year + "-" + hours + "-" + min + "-" + sec;

                let info = { "Icon": route.params.Icon, "Date": res, "Amount": amount, "IconFamily": route.params.Iconfamily, "Id": route.params.Id, "Time": time }


                firestore()
                    .collection((auth()._user.email.split("@")[0] + "-Income").toString())
                    .doc(route.params.Id)
                    .update({
                        [dictkey]: resvalues
                    })
                    .then(() => {
                        firestore()
                            .collection((auth()._user.email.split("@")[0] + "-Income").toString())
                            .doc(route.params.Id)
                            .update({
                                "Info": info
                            })
                            .then(() => {
                                Toast.show({
                                    type: 'success',
                                    text1: 'Success',
                                    text2: 'Amount Added Successfully'
                                });
                                setamount("");
                                setnote("");
                            });
                    });
            } else {
                console.log("Enter Note");
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Please Enter the Note'
                });
            }
        } else {
            console.log("Enter Amount");
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please Enter the Amount'
            });
        }
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
            <View>
                <Toast />
            </View>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ top: 100 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <IdientifyIcon family={route.params.Iconfamily} icon={route.params.Icon} size="50" color="white" />
                        <Text style={{ color: "white", fontSize: 25, paddingTop: 20, fontWeight: "bold" }}>{route.params.Id}</Text>
                    </View>
                    <TextInput style={styles.amount} textAlign={'center'} onChangeText={setamount}
                        value={amount} keyboardType="numeric" placeholder="₹" placeholderTextColor="#BEBEBE" />
                    <TextInput style={styles.note} onChangeText={setnote} maxLength={11}
                        value={note} placeholder="Enter note" placeholderTextColor="#BEBEBE" />
                    <View style={styles.Finalbtn}>
                        <Button buttonColor="#34B27B" mode="contained" onPress={sendData} >
                            Send
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    amount: {
        height: 100,
        width: 90 + "%",
        borderWidth: 1,
        borderColor: "transparent",
        alignSelf: "center",
        color: "white",
        fontSize: 50,
    },
    note: {
        borderRadius: 50,
        width: 70 + "%",
        borderWidth: 1,
        color: "white",
        borderColor: "white",
        backgroundColor: "#1c1c1c",
        fontSize: 20,
        alignSelf: "center",
        textAlign: "center"
    },
    Finalbtn: {
        width: 80 + "%",
        alignSelf: "center",
        paddingTop: 100,
    }
});

export default AddNewIncome;
