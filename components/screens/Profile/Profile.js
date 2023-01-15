import React from "react";
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Text } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import Ant from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

//Firebase
import auth from '@react-native-firebase/auth';

function Profile() {

    const navigation = useNavigation();

    const SignOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    return (
        <View>
            <SafeAreaView style={{ backgroundColor: "#1C1C1C" }} width="100%" height="100%">
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ width: "90%", paddingTop: "10%", paddingBottom: "8%" }}>
                        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white", paddingLeft: 15 }}>Profile</Text>
                    </View>
                    <Icon name="user" size={100} color="white" style={{ alignSelf: "center" }} />
                    <Text style={{ textAlign: "center", color: "white", paddingTop: 20, fontSize: 15 }}>Email : {auth()._user.email}</Text>
                    <View style={{ paddingTop: 50, width: 90 + "%", left: 15 }}>

                        {/* Change Password */}
                        <TouchableWithoutFeedback onPress={() => { navigation.navigate("Changepassword") }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ color: "white", fontSize: 20 }}>Change Password</Text>
                                <Text><Ant name="right" size={20} color="white" /></Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{
                            paddingTop: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: '#707070',
                            width: 100 + "%",
                            alignSelf: "center",
                        }} />

                        {/* Expense Data */}
                        <TouchableWithoutFeedback onPress={() => { navigation.navigate("ExpenseData") }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 20 }}>
                                <Text style={{ color: "white", fontSize: 20 }}>Expense Data</Text>
                                <Text><Ant name="right" size={20} color="white" /></Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{
                            paddingTop: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: '#707070',
                            width: 100 + "%",
                            alignSelf: "center",
                        }} />



                        {/* Income Data */}
                        <TouchableWithoutFeedback onPress={() => { navigation.navigate("IncomeData") }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 20 }}>
                                <Text style={{ color: "white", fontSize: 20 }}>Income Data</Text>
                                <Text><Ant name="right" size={20} color="white" /></Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{
                            paddingTop: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: '#707070',
                            width: 100 + "%",
                            alignSelf: "center",
                        }} />

                        {/* SignOut */}
                        <TouchableWithoutFeedback onPress={() => { SignOut() }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 15 }}>
                                <Text style={{ color: "red", fontSize: 20 }}>Sign Out</Text>
                                <Text><Ant name="right" size={20} color="red" /></Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default Profile;